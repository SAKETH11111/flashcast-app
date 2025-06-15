import { FileText } from 'lucide-react';

export function RecentSection() {
  const recentFiles = [
    {
      name: "Introduction to Psychology",
      type: "PDF",
      size: "2.3 MB",
    },
    {
      name: "History of Ancient Rome",
      type: "DOCX",
      size: "5.1 MB",
    },
    {
      name: "Calculus I Lecture",
      type: "MP3",
      size: "10.2 MB",
    },
    {
      name: "Biology Chapter 5",
      type: "PPT",
      size: "3.8 MB",
    },
  ];

  return (
    <section>
      <h2 className="text-lg font-bold text-foreground mb-6 text-left">Recent</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {recentFiles.map((file, index) => (
          <div key={index} className="bg-card border border-border/20 rounded-3xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">{file.name}</h3>
              <p className="text-sm text-muted-foreground">{file.type} · {file.size}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}