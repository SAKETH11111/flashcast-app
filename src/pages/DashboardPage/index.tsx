import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const [isSidebarPinned, setIsSidebarPinned] = useState(false);

  return (
    <div className="flex bg-background h-screen font-saira">
      <Sidebar isPinned={isSidebarPinned} onPinChange={setIsSidebarPinned} />
      <div className={cn(
        "flex-1 overflow-auto bg-muted/30 transition-all duration-300 ease-in-out",
        !isSidebarPinned && "pl-20"
      )}>
        <MainContent />
      </div>
    </div>
  );
}