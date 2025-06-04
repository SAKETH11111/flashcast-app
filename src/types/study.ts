export interface FlashcardData {
  id: string;
  term: string;
  definition: string;
  known?: boolean;
}

export interface StudySession {
  deckId: string;
  deckName: string;
  cards: FlashcardData[];
  currentIndex: number;
  correctCount: number;
  incorrectCount: number;
}
