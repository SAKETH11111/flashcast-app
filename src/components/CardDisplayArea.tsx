import React from 'react';
import Flashcard from './Flashcard';

const CardDisplayArea: React.FC = () => {
  const mockTerm = "Hello World";
  const mockDefinition = "A classic first program example.";

  return (
    <div className="flex-grow flex items-center justify-center p-4">
      <Flashcard term={mockTerm} definition={mockDefinition} />
    </div>
  );
};

export default CardDisplayArea;