"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { openRouterEvaluateTermMatchText, openRouterEvaluateSpokenAnswerText, transcribeAudioToText, uploadAudioToGemini, evaluateAudioAnswerByFileUri, evaluateAudioTermMatchByFileUri } from "@/lib/gemini";

interface VoiceButtonProps {
  term: string;
  definition: string;
  mode?: "definition" | "term"; // default definition; "term" matches the spoken term to flip
  onEvaluated: (result: { isCorrect: boolean; analysis: string; transcript: string }) => void;
}

const VoiceButton: React.FC<VoiceButtonProps> = ({ term, definition, mode = "definition", onEvaluated }) => {
  const [isListening, setIsListening] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [status, setStatus] = useState<"idle" | "listening" | "uploading" | "evaluating" | "transcribing">("idle");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  // Pre-check mic permission to allow smoother UX (no state needed)
  useEffect(() => {
    navigator.mediaDevices
      ?.getUserMedia({ audio: true })
      .then((stream) => stream.getTracks().forEach((t) => t.stop()))
      .catch(() => {});
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const preferredType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "";
      const recorder = preferredType ? new MediaRecorder(stream, { mimeType: preferredType }) : new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = async () => {
        try {
          const audioBlob = new Blob(chunksRef.current, { type: preferredType || "audio/webm" });
          setIsBusy(true);
          setStatus("uploading");
          const fileUri = await uploadAudioToGemini(audioBlob, `voice-${Date.now()}`);
          const base64Data = await blobToBase64(audioBlob);
          let result;
          try {
            setStatus("evaluating");
            if (mode === "term") {
              const [termRes, defRes] = await Promise.allSettled([
                evaluateAudioTermMatchByFileUri({ expectedTerm: term, fileUri }),
                evaluateAudioAnswerByFileUri({ term, correctDefinition: definition, fileUri })
              ]);
              const termResult = termRes.status === 'fulfilled' ? termRes.value : { isCorrect: false, score: 0, analysis: "", transcript: "" } as any;
              const defResult = defRes.status === 'fulfilled' ? defRes.value : { isCorrect: false, score: 0, analysis: "", transcript: "" } as any;
              let finalResult = termResult;
              if (!termResult.isCorrect || termResult.score < 0.8) {
                if (defResult && (defResult.score >= 0.7 || defResult.score > termResult.score)) {
                  finalResult = { ...defResult, isCorrect: defResult.score >= 0.7 };
                }
                // eslint-disable-next-line no-console
                console.info("[VoiceEval] termResult", termResult, "defResult", defResult);
                try {
                  setStatus("transcribing");
                  const transcript = await transcribeAudioToText({ audio: { mimeType: audioBlob.type || "audio/webm", base64Data } });
                  finalResult = { ...finalResult, analysis: `${finalResult.analysis} (You said: ${transcript.slice(0, 80)}${transcript.length > 80 ? '…' : ''})` };
                } catch {}
              }
              result = finalResult;
            } else {
              result = await evaluateAudioAnswerByFileUri({ term, correctDefinition: definition, fileUri });
              // Override isCorrect based on score threshold
              result = { ...result, isCorrect: result.score >= 0.7 };
              if (!result.isCorrect || result.score < 0.8) {
                try {
                  setStatus("transcribing");
                  const transcript = await transcribeAudioToText({ audio: { mimeType: audioBlob.type || "audio/webm", base64Data } });
                  result = {
                    ...result,
                    analysis: `${result.analysis} (You said: ${transcript.slice(0, 80)}${transcript.length > 80 ? '…' : ''})`
                  };
                } catch {}
              }
            }
          } catch (geminiErr: any) {
            // Fallback: OpenRouter with text-only prompt if configured
            console.warn("Gemini audio path failed, trying OpenRouter fallback", geminiErr);
            const placeholder = "[audio omitted]";
            if (mode === "term") {
              result = await openRouterEvaluateTermMatchText({ expectedTerm: term, userUtterance: placeholder });
            } else {
              result = await openRouterEvaluateSpokenAnswerText({ term, correctDefinition: definition, userAnswer: placeholder });
            }
          }
          onEvaluated({ isCorrect: result.isCorrect, analysis: result.analysis, transcript: "" });
        } catch (err: any) {
          console.error(err);
          // Fallback: treat as not matched/incorrect with concise analysis so the flow continues.
          onEvaluated({ isCorrect: false, analysis: "Couldn’t understand; please repeat clearly.", transcript: "" });
        } finally {
          setIsBusy(false);
          setStatus("idle");
        }
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsListening(true);
      setStatus("listening");
    } catch (error: any) {
      console.error(error);
      toast.error("Microphone permission denied", { description: "Allow mic access to use voice." });
    }
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
      recorder.stream.getTracks().forEach((t) => t.stop());
      setIsListening(false);
    }
  };

  const handleToggle = () => {
    if (isBusy) return;
    if (!isListening) startRecording();
    else stopRecording();
  };

  // Local transcription removed; audio is sent directly to Gemini.

  function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const base64 = result.split(",")[1] || "";
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }


  return (
    <motion.div
      className="relative"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 25,
        delay: 0.2 
      }}
    >
      {/* Subtle pulse ring when listening */}
      {isListening && (
        <motion.div
          className="absolute inset-0 rounded-full border border-primary/30"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 0.2, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Secondary subtle ring */}
      {isListening && (
        <motion.div
          className="absolute inset-0 rounded-full border border-primary/20"
          initial={{ scale: 1, opacity: 0.4 }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      )}

      <Button
        variant={isListening ? "default" : "outline"}
        size="lg"
        onClick={handleToggle}
        className={cn(
          "relative w-16 h-16 rounded-full",
          "transition-all duration-300 ease-out",
          "hover:shadow-lg active:scale-95",
          isBusy ? "opacity-70 pointer-events-none" : "",
          isListening
            ? "bg-primary text-primary-foreground shadow-md"
            : "hover:bg-primary/5 hover:border-primary/50",
        )}
      >
        <motion.div
          animate={{ 
            scale: isListening ? 1.1 : 1,
            rotate: isListening ? [0, 5, -5, 0] : 0
          }}
          transition={{ 
            scale: { duration: 0.2, ease: "easeOut" },
            rotate: { duration: 0.4, ease: "easeInOut" }
          }}
        >
          {isListening ? (
            <Mic className="w-6 h-6" />
          ) : (
            <MicOff className="w-6 h-6" />
          )}
        </motion.div>
      </Button>

      {/* Inline status chip */}
      <motion.div
        className={cn(
          "absolute top-full mt-3 left-1/2 transform -translate-x-1/2",
          "bg-muted text-foreground text-xs px-3 py-1 rounded-full",
          "backdrop-blur-sm border border-white/10",
          "whitespace-nowrap shadow-sm"
        )}
      >
        {status === "listening" && "Listening…"}
        {status === "uploading" && "Uploading…"}
        {status === "evaluating" && "Evaluating…"}
        {status === "transcribing" && "Transcribing…"}
        {status === "idle" && !isListening && !isBusy && "Ready"}
      </motion.div>
    </motion.div>
  );
};

export { VoiceButton };