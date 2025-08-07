/*
  Gemini API helper for evaluating spoken flashcard answers.
  This uses the Google AI Studio Gemini API (client-side safe keys when domain-restricted).
*/

export interface EvaluationResult {
  isCorrect: boolean;
  score: number; // 0.0 - 1.0
  analysis: string; // one concise sentence
  rawText?: string; // raw model text for debugging
}

function getApiKey(): string {
  const key = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
  if (!key) {
    throw new Error(
      "Missing VITE_GEMINI_API_KEY. Set it in your environment (restrict to your domain in Google AI Studio)."
    );
  }
  return key;
}

const DEBUG = !!(import.meta.env.DEV || import.meta.env.VITE_DEBUG_LOGS === "true");
function logDebug(label: string, data: any) {
  if (DEBUG) {
    // eslint-disable-next-line no-console
    console.info(`[GeminiDebug] ${label}:`, data);
  }
}
if (DEBUG) {
  // eslint-disable-next-line no-console
  console.info("[GeminiDebug] logging enabled");
}

const GEMINI_MODEL_ID = "gemini-2.5-flash-lite";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL_ID}:generateContent`;
// Upload endpoint candidates (varies by rollout). We'll try in order.
const GEMINI_FILE_UPLOAD_ENDPOINTS = [
  "https://generativelanguage.googleapis.com/upload/v1beta/files",
  "https://generativelanguage.googleapis.com/v1beta/files:upload",
];

// Single implementation
export async function uploadAudioToGemini(blob: Blob, fileName: string): Promise<string> {
  const apiKey = getApiKey();
  for (const base of GEMINI_FILE_UPLOAD_ENDPOINTS) {
    try {
      const url = `${base}?key=${encodeURIComponent(apiKey)}`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "X-Goog-Upload-File-Name": fileName,
          "X-Goog-Upload-Protocol": "raw",
          "Content-Type": blob.type || "application/octet-stream",
        },
        body: blob,
      });
      logDebug("fileUpload http", { url: base, status: res.status, statusText: res.statusText });
      const data = await res.json().catch(async () => ({ error: await res.text().catch(() => "") }));
      logDebug("fileUpload response", data);
      const uri = data?.file?.uri || data?.fileUri || data?.uri;
      if (res.ok && uri) return uri;
    } catch (e) {
      logDebug("fileUpload error", String(e));
    }
  }
  throw new Error("Audio upload failed: no file URI returned");
}

export async function evaluateAudioAnswerByFileUri(params: {
  term: string;
  correctDefinition: string;
  fileUri: string;
}): Promise<EvaluationResult> {
  const { term, correctDefinition, fileUri } = params;
  const apiKey = getApiKey();

  const prompt = `Grade this audio answer for flashcard:
Term: ${term}
Definition: ${correctDefinition}

If the spoken answer captures the core meaning (score ≥0.7), mark as correct.
Return JSON: {"is_correct": boolean, "score": 0.0-1.0, "analysis": "brief reason"}`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [
          { file_data: { file_uri: fileUri } },
          { text: prompt },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.0,
      maxOutputTokens: 1024,
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          is_correct: { type: "boolean" },
          score: { type: "number" },
          analysis: { type: "string" },
        },
        required: ["is_correct", "analysis"],
      },
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_CIVIC_INTEGRITY", threshold: "BLOCK_NONE" },
    ],
  } as const;

  const response = await fetch(`${GEMINI_ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  logDebug("evaluateAudioAnswerByFileUri http", { status: response.status, statusText: response.statusText });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    logDebug("evaluateAudioAnswerByFileUri errorBody", text);
    throw new Error(`Gemini API error: ${response.status} ${response.statusText} ${text}`);
  }
  const data = (await response.json()) as any;
  logDebug("evaluateAudioAnswerByFileUri response", data);
  const direct = findDeepEvaluationObject(data);
  let parsed: any;
  let rawTextLocal = "";
  if (direct) parsed = direct; else {
    let rawText: string | undefined = extractCandidateText(data);
    if (!rawText && data?.candidates?.[0]?.content) rawText = JSON.stringify(data.candidates[0].content);
    if (!rawText) throw new Error("Gemini API returned no text");
    rawTextLocal = rawText;
    parsed = parseEvaluationJson(rawText);
  }
  return {
    isCorrect: Boolean(parsed.is_correct),
    score: typeof parsed.score === "number" ? Math.max(0, Math.min(1, parsed.score)) : parsed.is_correct ? 1 : 0,
    analysis: typeof parsed.analysis === "string" ? parsed.analysis.slice(0, 160) : parsed.is_correct ? "Correct." : "Not quite right.",
    rawText: rawTextLocal || undefined,
  };
}

export async function evaluateAudioTermMatchByFileUri(params: {
  expectedTerm: string;
  fileUri: string;
}): Promise<EvaluationResult> {
  const { expectedTerm, fileUri } = params;
  const apiKey = getApiKey();

  const prompt = `Does this audio say the term "${expectedTerm}"?

Return JSON: {"is_correct": boolean, "score": 0.0-1.0, "analysis": "brief reason"}`;

  const body = {
    contents: [
      { role: "user", parts: [ { file_data: { file_uri: fileUri } }, { text: prompt } ] }
    ],
    generationConfig: {
      temperature: 0.0,
      maxOutputTokens: 256,
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          is_correct: { type: "boolean" },
          score: { type: "number" },
          analysis: { type: "string" },
        },
        required: ["is_correct", "analysis"],
      },
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_CIVIC_INTEGRITY", threshold: "BLOCK_NONE" },
    ],
  } as const;

  const response = await fetch(`${GEMINI_ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  logDebug("evaluateAudioTermMatchByFileUri http", { status: response.status, statusText: response.statusText });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    logDebug("evaluateAudioTermMatchByFileUri errorBody", text);
    throw new Error(`Gemini API error: ${response.status} ${response.statusText} ${text}`);
  }
  const data = (await response.json()) as any;
  logDebug("evaluateAudioTermMatchByFileUri response", data);
  const direct = findDeepEvaluationObject(data);
  let parsed: any;
  let rawTextLocal = "";
  if (direct) parsed = direct; else {
    let rawText: string | undefined = extractCandidateText(data);
    if (!rawText && data?.candidates?.[0]?.content) rawText = JSON.stringify(data.candidates[0].content);
    if (!rawText) throw new Error("Gemini API returned no text");
    rawTextLocal = rawText;
    parsed = parseEvaluationJson(rawText);
  }
  return {
    isCorrect: Boolean(parsed.is_correct),
    score: typeof parsed.score === "number" ? Math.max(0, Math.min(1, parsed.score)) : parsed.is_correct ? 1 : 0,
    analysis: typeof parsed.analysis === "string" ? parsed.analysis.slice(0, 120) : parsed.is_correct ? "Term matched." : "Term did not match.",
    rawText: rawTextLocal || undefined,
  };
}

function extractCandidateText(data: any): string | undefined {
  const parts = data?.candidates?.[0]?.content?.parts;
  if (Array.isArray(parts)) {
    // Prefer text parts
    const texts = parts.map((p: any) => p?.text).filter((t: any) => typeof t === "string" && t.trim());
    if (texts.length > 0) return texts.join("\n");

    // Fallback: inline JSON/text
    for (const p of parts) {
      const inline = p?.inline_data;
      if (inline?.data) {
        try {
          const decoded = atob(String(inline.data));
          if (decoded && decoded.trim()) return decoded;
        } catch {
          // ignore
        }
      }
    }
  }
  const firstText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof firstText === "string" && firstText.trim()) return firstText;
  return undefined;
}

function parseEvaluationJson(raw: string): { is_correct?: boolean; score?: number; analysis?: string } {
  let text = raw
    .trim()
    .replace(/^```(json)?/i, "")
    .replace(/```$/i, "")
    .trim();

  // Extract first JSON-ish object
  const braceMatch = text.match(/\{[\s\S]*\}/);
  if (braceMatch) text = braceMatch[0];

  // First attempt: strict JSON
  try {
    return JSON.parse(text);
  } catch {}

  // Coerce: quote keys, switch single to double quotes, remove trailing commas
  let coerced = text;
  // Quote unquoted keys: { key: value, -> { "key": value,
  coerced = coerced.replace(/([\{,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:/g, '$1"$2":');
  // Replace single-quoted strings with double-quoted
  coerced = coerced.replace(/'([^']*)'/g, '"$1"');
  // Remove trailing commas before } or ]
  coerced = coerced.replace(/,(\s*[}\]])/g, '$1');
  // Collapse newlines
  coerced = coerced.replace(/\r?\n/g, ' ');

  try {
    return JSON.parse(coerced);
  } catch (e) {
    throw new Error(`Failed to parse model JSON: ${String(e)} | text=${text}`);
  }
}

function findDeepEvaluationObject(input: any, depth: number = 0): any | undefined {
  if (!input || depth > 6) return undefined;
  if (typeof input === "object") {
    // If this object already looks like our target, return it
    if (
      Object.prototype.hasOwnProperty.call(input, "is_correct") &&
      Object.prototype.hasOwnProperty.call(input, "analysis")
    ) {
      return input;
    }
    // Walk arrays
    if (Array.isArray(input)) {
      for (const item of input) {
        const found = findDeepEvaluationObject(item, depth + 1);
        if (found) return found;
      }
    } else {
      // Walk object values
      for (const key of Object.keys(input)) {
        const found = findDeepEvaluationObject((input as any)[key], depth + 1);
        if (found) return found;
      }
    }
  }
  return undefined;
}

// (Removed duplicate definition)

export async function evaluateSpokenAnswer(params: {
  term: string;
  correctDefinition: string;
  userAnswer: string;
}): Promise<EvaluationResult> {
  const { term, correctDefinition, userAnswer } = params;
  const apiKey = getApiKey();

  const prompt = [
    "You are grading a student’s spoken answer for a flashcard.",
    `Term: ${term}`,
    `Correct definition: ${correctDefinition}`,
    `Student said: ${userAnswer}`,
    "Evaluate semantic equivalence. Accept paraphrases and partial but essentially correct explanations.",
    "Return ONLY strict JSON with fields: is_correct (boolean), score (number 0..1), analysis (<= 20 words).",
  ].join("\n\n");

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 1024,
    },
  } as const;

  const response = await fetch(`${GEMINI_ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  logDebug("evaluateSpokenAnswer request", { model: GEMINI_MODEL_ID, body });
  logDebug("evaluateSpokenAnswer http", { status: response.status, statusText: response.statusText });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    logDebug("evaluateSpokenAnswer errorBody", text);
    throw new Error(`Gemini API error: ${response.status} ${response.statusText} ${text}`);
  }

  const data = (await response.json()) as any;
  logDebug("evaluateSpokenAnswer response", data);

  const rawText: string | undefined = extractCandidateText(data);
  if (!rawText) {
    throw new Error("Gemini API returned no text");
  }

  // Attempt to parse JSON from the model. Strip possible code fences.
  const cleaned = rawText
    .trim()
    .replace(/^```(json)?/i, "")
    .replace(/```$/i, "")
    .trim();

  let parsed: { is_correct?: boolean; score?: number; analysis?: string } | undefined;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    // Fallback: try to heuristically extract JSON between braces
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      parsed = JSON.parse(match[0]);
    }
  }

  if (!parsed || typeof parsed.is_correct !== "boolean") {
    throw new Error("Unexpected model response. Could not parse grading JSON.");
  }

  return {
    isCorrect: Boolean(parsed.is_correct),
    score: typeof parsed.score === "number" ? Math.max(0, Math.min(1, parsed.score)) : parsed.is_correct ? 1 : 0,
    analysis: typeof parsed.analysis === "string" ? parsed.analysis.slice(0, 160) : parsed.is_correct ? "Correct." : "Not quite right.",
    rawText,
  };
}

export async function evaluateAudioAnswer(params: {
  term: string;
  correctDefinition: string;
  audio: { mimeType: string; base64Data: string };
}): Promise<EvaluationResult> {
  const { term, correctDefinition, audio } = params;
  const apiKey = getApiKey();

  const prompt = `Grade this audio answer for flashcard:
Term: ${term}
Definition: ${correctDefinition}

If the spoken answer captures the core meaning (score ≥0.7), mark as correct.
Return JSON: {"is_correct": boolean, "score": 0.0-1.0, "analysis": "brief reason"}`;

  // Upload audio, then reference by file_uri
  const binary = Uint8Array.from(atob(audio.base64Data), (c) => c.charCodeAt(0));
  const blob = new Blob([binary], { type: audio.mimeType || "audio/webm" });
  const fileUri = await uploadAudioToGemini(blob, `answer-${Date.now()}`);

  const body = {
    contents: [
      {
        role: "user",
        parts: [
          { file_data: { file_uri: fileUri } },
          { text: prompt },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.0,
      maxOutputTokens: 1024,
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          is_correct: { type: "boolean" },
          score: { type: "number" },
          analysis: { type: "string" },
        },
        required: ["is_correct", "analysis"],
      },
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_CIVIC_INTEGRITY", threshold: "BLOCK_NONE" },
    ],
  } as const;

  const response = await fetch(`${GEMINI_ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  logDebug("evaluateAudioAnswer request", { model: GEMINI_MODEL_ID, fileUri });
  logDebug("evaluateAudioAnswer http", { status: response.status, statusText: response.statusText });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    logDebug("evaluateAudioAnswer errorBody", text);
    throw new Error(`Gemini API error: ${response.status} ${response.statusText} ${text}`);
  }

  const data = (await response.json()) as any;
  logDebug("evaluateAudioAnswer response", data);
  
  // Enhanced debugging to see full structure
  if (data?.candidates?.[0]) {
    logDebug("evaluateAudioAnswer candidate[0]", data.candidates[0]);
    logDebug("evaluateAudioAnswer content", data.candidates[0].content);
    if (data.candidates[0].content?.parts) {
      logDebug("evaluateAudioAnswer parts", data.candidates[0].content.parts);
    }
  }
  
  // Try to find a structured object first
  const direct = findDeepEvaluationObject(data);
  let parsed: any;
  let rawTextLocal = "";
  if (direct) {
    parsed = direct;
  } else {
    let rawText: string | undefined = extractCandidateText(data);
    if (!rawText && data?.candidates?.[0]?.content) {
      rawText = JSON.stringify(data.candidates[0].content);
    }
    if (!rawText) throw new Error("Gemini API returned no text");
    rawTextLocal = rawText;
    parsed = parseEvaluationJson(rawText);
  }
  return {
    isCorrect: Boolean(parsed.is_correct),
    score: typeof parsed.score === "number" ? Math.max(0, Math.min(1, parsed.score)) : parsed.is_correct ? 1 : 0,
    analysis: typeof parsed.analysis === "string" ? parsed.analysis.slice(0, 160) : parsed.is_correct ? "Correct." : "Not quite right.",
    rawText: rawTextLocal || undefined,
  };
}

export async function evaluateTermMatch(params: {
  expectedTerm: string;
  userUtterance: string;
}): Promise<EvaluationResult> {
  const { expectedTerm, userUtterance } = params;
  const apiKey = getApiKey();

  const prompt = [
    "You are verifying if a spoken phrase matches a target term for a flashcard.",
    `Target term: ${expectedTerm}`,
    `Student said: ${userUtterance}`,
    "Accept minor variations, pluralization, or close pronunciation if it clearly names the same concept.",
    "Do not accept vague descriptions; this is name matching, not definition matching.",
    "Return ONLY strict JSON with fields: is_correct (boolean), score (0..1), analysis (<= 15 words).",
  ].join("\n\n");

  const body = {
    contents: [
      { role: "user", parts: [{ text: prompt }] },
    ],
    generationConfig: { temperature: 0.0, maxOutputTokens: 80 },
  } as const;

  const response = await fetch(`${GEMINI_ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  logDebug("evaluateTermMatch request", { model: GEMINI_MODEL_ID, body });
  logDebug("evaluateTermMatch http", { status: response.status, statusText: response.statusText });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    logDebug("evaluateTermMatch errorBody", text);
    throw new Error(`Gemini API error: ${response.status} ${response.statusText} ${text}`);
  }

  const data = (await response.json()) as any;
  logDebug("evaluateTermMatch response", data);
  const rawText: string | undefined = extractCandidateText(data);
  if (!rawText) throw new Error("Gemini API returned no text");

  const cleaned = rawText.trim().replace(/^```(json)?/i, "").replace(/```$/i, "").trim();

  let parsed: { is_correct?: boolean; score?: number; analysis?: string } | undefined;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) parsed = JSON.parse(match[0]);
  }

  if (!parsed || typeof parsed.is_correct !== "boolean") {
    throw new Error("Unexpected model response. Could not parse match JSON.");
  }

  return {
    isCorrect: Boolean(parsed.is_correct),
    score: typeof parsed.score === "number" ? Math.max(0, Math.min(1, parsed.score)) : parsed.is_correct ? 1 : 0,
    analysis: typeof parsed.analysis === "string" ? parsed.analysis.slice(0, 120) : parsed.is_correct ? "Term matched." : "Term did not match.",
    rawText,
  };
}

export async function evaluateAudioTermMatch(params: {
  expectedTerm: string;
  audio: { mimeType: string; base64Data: string };
}): Promise<EvaluationResult> {
  const { expectedTerm, audio } = params;
  const apiKey = getApiKey();

  const prompt = `Does this audio say the term "${expectedTerm}"?

Return JSON: {"is_correct": boolean, "score": 0.0-1.0, "analysis": "brief reason"}`;

  // Upload audio, then reference by file_uri
  const binary = Uint8Array.from(atob(audio.base64Data), (c) => c.charCodeAt(0));
  const blob = new Blob([binary], { type: audio.mimeType || "audio/webm" });
  const fileUri = await uploadAudioToGemini(blob, `term-${Date.now()}`);

  const body = {
    contents: [
      { role: "user", parts: [ { file_data: { file_uri: fileUri } }, { text: prompt } ] }
    ],
    generationConfig: {
      temperature: 0.0,
      maxOutputTokens: 256,
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          is_correct: { type: "boolean" },
          score: { type: "number" },
          analysis: { type: "string" },
        },
        required: ["is_correct", "analysis"],
      },
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_CIVIC_INTEGRITY", threshold: "BLOCK_NONE" },
    ],
  } as const;

  const response = await fetch(`${GEMINI_ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  logDebug("evaluateAudioTermMatch request", { model: GEMINI_MODEL_ID, fileUri });
  logDebug("evaluateAudioTermMatch http", { status: response.status, statusText: response.statusText });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    logDebug("evaluateAudioTermMatch errorBody", text);
    throw new Error(`Gemini API error: ${response.status} ${response.statusText} ${text}`);
  }

  const data = (await response.json()) as any;
  logDebug("evaluateAudioTermMatch response", data);
  
  // Enhanced debugging to see full structure
  if (data?.candidates?.[0]) {
    logDebug("evaluateAudioTermMatch candidate[0]", data.candidates[0]);
    logDebug("evaluateAudioTermMatch content", data.candidates[0].content);
    if (data.candidates[0].content?.parts) {
      logDebug("evaluateAudioTermMatch parts", data.candidates[0].content.parts);
    }
  }
  
  const direct = findDeepEvaluationObject(data);
  let parsed: any;
  let rawTextLocal2 = "";
  if (direct) {
    parsed = direct;
  } else {
    let rawText: string | undefined = extractCandidateText(data);
    if (!rawText && data?.candidates?.[0]?.content) {
      rawText = JSON.stringify(data.candidates[0].content);
    }
    if (!rawText) throw new Error("Gemini API returned no text");
    rawTextLocal2 = rawText;
    parsed = parseEvaluationJson(rawText);
  }

  return {
    isCorrect: Boolean(parsed.is_correct),
    score: typeof parsed.score === "number" ? Math.max(0, Math.min(1, parsed.score)) : parsed.is_correct ? 1 : 0,
    analysis: typeof parsed.analysis === "string" ? parsed.analysis.slice(0, 120) : parsed.is_correct ? "Term matched." : "Term did not match.",
    rawText: rawTextLocal2 || undefined,
  };
}

export async function transcribeAudioToText(params: {
  audio: { mimeType: string; base64Data: string };
  languageHint?: string;
}): Promise<string> {
  const { audio, languageHint } = params;
  const apiKey = getApiKey();
  const binary = Uint8Array.from(atob(audio.base64Data), (c) => c.charCodeAt(0));
  const blob = new Blob([binary], { type: audio.mimeType || "audio/webm" });
  const fileUri = await uploadAudioToGemini(blob, `transcribe-${Date.now()}`);

  const prompt = [
    languageHint ? `Language hint: ${languageHint}` : undefined,
    "Transcribe the speech accurately.",
    "Return only the transcript text with no extra words.",
  ]
    .filter(Boolean)
    .join("\n");

  const body = {
    contents: [
      { role: "user", parts: [ { file_data: { file_uri: fileUri } }, { text: prompt } ] }
    ],
    generationConfig: { temperature: 0.0, maxOutputTokens: 1024 },
  } as const;

  const response = await fetch(`${GEMINI_ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  logDebug("transcribeAudioToText http", { status: response.status, statusText: response.statusText });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    logDebug("transcribeAudioToText errorBody", text);
    throw new Error(`Gemini API error: ${response.status} ${response.statusText} ${text}`);
  }
  const data = (await response.json()) as any;
  logDebug("transcribeAudioToText response", data);
  const text = extractCandidateText(data);
  if (!text) throw new Error("Transcription returned no text");
  return text.trim();
}

// -------------- OpenRouter fallback (text-only) --------------

const OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

function getOpenRouterKey(): string | undefined {
  return import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined;
}

async function openRouterChatJSON(prompt: string): Promise<string> {
  const key = getOpenRouterKey();
  logDebug("OpenRouter key present", { present: Boolean(key) });
  if (!key) throw new Error("Missing VITE_OPENROUTER_API_KEY");

  const body = {
    model: "google/gemini-2.5-flash-lite",
    messages: [
      { role: "system", content: "Return only compact JSON for tools to parse." },
      { role: "user", content: prompt },
    ],
    temperature: 0.1,
  };

  const res = await fetch(OPENROUTER_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(body),
  });
  logDebug("OpenRouter http", { status: res.status, statusText: res.statusText });
  const data = await res.json().catch(async () => ({ error: await res.text().catch(() => "") }));
  logDebug("OpenRouter response", data);
  const text: string | undefined = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("OpenRouter returned no text");
  return text;
}

export async function openRouterEvaluateTermMatchText(params: {
  expectedTerm: string;
  userUtterance: string;
}): Promise<EvaluationResult> {
  const { expectedTerm, userUtterance } = params;
  const prompt = [
    "You are verifying if a phrase matches a target term.",
    `Target term: ${expectedTerm}`,
    `User said: ${userUtterance}`,
    "Return ONLY JSON: {\"is_correct\": boolean, \"score\": number, \"analysis\": string (<= 15 words)}",
  ].join("\n\n");
  const rawText = await openRouterChatJSON(prompt);
  const cleaned = rawText.trim().replace(/^```(json)?/i, "").replace(/```$/i, "").trim();
  const parsed = JSON.parse(cleaned.match(/\{[\s\S]*\}/)?.[0] || cleaned);
  return {
    isCorrect: Boolean(parsed.is_correct),
    score: typeof parsed.score === "number" ? Math.max(0, Math.min(1, parsed.score)) : parsed.is_correct ? 1 : 0,
    analysis: typeof parsed.analysis === "string" ? parsed.analysis.slice(0, 120) : parsed.is_correct ? "Term matched." : "Term did not match.",
    rawText,
  };
}

export async function openRouterEvaluateSpokenAnswerText(params: {
  term: string;
  correctDefinition: string;
  userAnswer: string;
}): Promise<EvaluationResult> {
  const { term, correctDefinition, userAnswer } = params;
  const prompt = [
    "Grade a student's answer against a correct definition.",
    `Term: ${term}`,
    `Correct definition: ${correctDefinition}`,
    `Student said: ${userAnswer}`,
    "Return ONLY JSON: {\"is_correct\": boolean, \"score\": number, \"analysis\": string (<= 20 words)}",
  ].join("\n\n");
  const rawText = await openRouterChatJSON(prompt);
  const cleaned = rawText.trim().replace(/^```(json)?/i, "").replace(/```$/i, "").trim();
  const parsed = JSON.parse(cleaned.match(/\{[\s\S]*\}/)?.[0] || cleaned);
  return {
    isCorrect: Boolean(parsed.is_correct),
    score: typeof parsed.score === "number" ? Math.max(0, Math.min(1, parsed.score)) : parsed.is_correct ? 1 : 0,
    analysis: typeof parsed.analysis === "string" ? parsed.analysis.slice(0, 160) : parsed.is_correct ? "Correct." : "Not quite right.",
    rawText,
  };
}


