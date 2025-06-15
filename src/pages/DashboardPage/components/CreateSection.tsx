import { Upload, Mic, FileText, BookOpen } from 'lucide-react';
import { Meteors } from '@/components/ui/meteors';

interface CreateCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
  onClick?: () => void;
  isSpecial?: boolean;
}

function CreateCard({ icon, title, description, accentColor, onClick, isSpecial = false }: CreateCardProps) {
  if (isSpecial) {
    return (
      <div
        onClick={onClick}
        className="group relative bg-gradient-to-br from-card to-card/80 border border-border/20 rounded-3xl p-6 text-left hover:border-primary/50 transition-all duration-150 w-full h-full flex flex-col cursor-pointer isolate overflow-hidden"
      >
        <Meteors number={20} />
        <div className="relative z-10 flex-1">
          <div className={`w-16 h-16 rounded-full ${accentColor} flex items-center justify-center mb-5`}>
            {icon}
          </div>
          <h3 className="text-base font-bold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={onClick}
      className="group bg-gradient-to-br from-card to-card/80 border border-border/20 rounded-3xl p-6 text-left hover:border-primary/50 transition-all duration-150 w-full h-full flex flex-col cursor-pointer relative isolate overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] to-black/[0.01] dark:from-white/[0.03] dark:to-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"></div>
      <div className="flex-1">
        <div className={`w-16 h-16 rounded-full ${accentColor} flex items-center justify-center mb-5`}>
          {icon}
        </div>
        <h3 className="text-base font-bold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export function CreateSection() {
  const createCards = [
    {
      icon: <Upload size={24} className="text-purple-400" />,
      title: "Upload a PDF, PPT, Video, or Audio",
      description: "Get flashcards or notes instantly.",
      accentColor: "bg-purple-500/10",
      isSpecial: true,
    },
    {
      icon: <Mic size={24} className="text-red-400" />,
      title: "Create from live recording",
      description: "Start a live lecture recording now.",
      accentColor: "bg-red-500/10",
    },
    {
      icon: <FileText size={24} className="text-amber-400" />,
      title: "Create flashcards manually",
      description: "Create flashcards without AI for free.",
      accentColor: "bg-amber-500/10",
    },
    {
      icon: <BookOpen size={24} className="text-blue-400" />,
      title: "Create notes manually",
      description: "Create notes without AI for free.",
      accentColor: "bg-blue-500/10",
    },
  ];

  return (
    <section>
      <h2 className="text-lg font-bold text-foreground mb-6 text-left">Create</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {createCards.map((card, index) => (
          <CreateCard
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
            accentColor={card.accentColor}
            isSpecial={card.isSpecial}
          />
        ))}
      </div>
    </section>
  );
}