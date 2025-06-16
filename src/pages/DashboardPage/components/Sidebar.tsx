import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Library,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Camera,
  FileText,
  Mic,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NavLink = ({ href, icon, text, active = false, isExpanded, tag }: { href: string; icon: React.ReactNode; text: string; active?: boolean; isExpanded: boolean; tag?: string; }) => (
  <Link
    to={href}
    className={cn(
      "flex items-center h-10 w-full rounded-lg transition-colors text-muted-foreground hover:text-foreground hover:bg-accent",
      active && "text-primary bg-primary/10",
    )}
  >
    <div className="w-14 flex-shrink-0 flex items-center justify-center">
        {icon}
    </div>
    <span className={cn("truncate min-w-0 transition-opacity duration-300 ease-in-out", isExpanded ? "opacity-100" : "opacity-0")}>
      {text}
    </span>
    {isExpanded && tag && (
      <span className={cn("ml-auto mr-4 text-xs font-semibold bg-primary/10 text-primary rounded-full px-2 py-0.5 transition-opacity duration-300 ease-in-out whitespace-nowrap", isExpanded ? "opacity-100" : "opacity-0")}>
        {tag}
      </span>
    )}
  </Link>
);

const SectionTitle = ({ text, isExpanded }: { text:string; isExpanded: boolean }) => (
    <h2 className={cn(
        "pl-4 pt-4 pb-1 text-xs font-bold text-muted-foreground uppercase tracking-wider transition-all whitespace-nowrap text-left",
        isExpanded ? "opacity-100" : "opacity-0 h-0 py-0"
    )}>
        {text}
    </h2>
)

interface SidebarProps {
  isPinned: boolean;
  onPinChange: (isPinned: boolean) => void;
}

export function Sidebar({ isPinned, onPinChange }: SidebarProps) {
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();

    const isExpanded = isHovered || isPinned;

    const handlePinClick = () => {
        const newPinState = !isPinned;
        onPinChange(newPinState);
        if (newPinState) { // If we just pinned it
            setIsHovered(false);
        }
    };

  return (
    <div
        className={cn(
            "bg-card border-r border-border flex flex-col py-4 transition-all duration-300 ease-in-out z-20",
            isPinned ? "relative" : "absolute top-0 left-0 h-full",
            isExpanded ? "w-60" : "w-20"
        )}
        onMouseEnter={() => !isPinned && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        {/* Top Logo & Expander */}
        <div className="h-12 px-4 flex items-center justify-between mb-4">
            <div className={cn("flex items-center gap-2 overflow-hidden")}>
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap size={20} className="text-primary-foreground" />
                </div>
                <span className={cn("font-bold text-lg whitespace-nowrap transition-opacity duration-300 ease-in-out", isExpanded ? "opacity-100" : "opacity-0")}>
                    Flashcast
                </span>
            </div>
            {(isHovered || isPinned) && (
                 <button onClick={handlePinClick} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent">
                    {isPinned ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
            )}
        </div>

      {/* Main Navigation */}
      <div className="flex-1 flex flex-col w-full space-y-2 overflow-y-auto overflow-x-hidden">
        <div className="space-y-1 px-2">
            <SectionTitle text="Library" isExpanded={isExpanded} />
            <NavLink href="/dashboard" icon={<Home size={20} />} text="Home" active={location.pathname === '/dashboard'} isExpanded={isExpanded} />
            <NavLink href="/dashboard/decks" icon={<Library size={20} />} text="Decks" active={location.pathname === '/dashboard/decks'} isExpanded={isExpanded} />
            <NavLink href="/dashboard/trash" icon={<Trash2 size={20} />} text="Trash" active={location.pathname === '/dashboard/trash'} isExpanded={isExpanded} />
        </div>
        <div className="mx-4 my-2 border-t border-border"></div>
        <div className="space-y-1 px-2">
            <SectionTitle text="AI Tools" isExpanded={isExpanded} />
            <NavLink href="#" icon={<Camera size={20} />} text="Snap & Solve" isExpanded={isExpanded} tag="Soon" />
            <NavLink href="#" icon={<FileText size={20} />} text="AI PDF Summarizer" isExpanded={isExpanded} tag="Soon" />
            <NavLink href="#" icon={<Mic size={20} />} text="AI Lecture Note Taker" isExpanded={isExpanded} tag="Soon" />
        </div>
      </div>
    </div>
  );
}