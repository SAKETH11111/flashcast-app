import { BookOpen } from 'lucide-react';
import { useDashboard } from '../DashboardLayout';
import { DeckCard } from './DeckCard';

export function RecentSection() {
  const { decks, handlePinToggle, handleTrash } = useDashboard();
  
  // Get active user-created decks (exclude demo deck), sorted by most recent
  const userCreatedDecks = decks
    .filter(deck => deck.status === 'active' && deck.title !== 'Welcome to Flashcast!')
    .sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())
    .slice(0, 4); // Show only 4 most recent
  
  // If no user-created decks, show demo deck
  const recentDecks = userCreatedDecks.length > 0 
    ? userCreatedDecks 
    : decks.filter(deck => deck.title === 'Welcome to Flashcast!').slice(0, 1);

  if (recentDecks.length === 0) {
    return (
      <section>
        <h2 className="text-lg font-bold text-foreground mb-6 text-left">Recent</h2>
        <div className="bg-card border border-border/20 rounded-3xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <BookOpen size={32} className="text-primary" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">No recent decks</h3>
          <p className="text-sm text-muted-foreground mb-4">Create your first deck to get started!</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-lg font-bold text-foreground mb-6 text-left">Recent</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {recentDecks.map((deck) => (
          <DeckCard
            key={deck.title}
            id={deck.title}
            title={deck.title}
            updated={deck.updated}
            type={deck.type}
            termCount={deck.termCount}
            pinned={deck.pinned}
            onPinToggle={() => handlePinToggle(deck.title)}
            onTrash={() => handleTrash([deck.title])}
          />
        ))}
      </div>
    </section>
  );
}