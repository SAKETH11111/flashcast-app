import React from 'react';

interface FlashcardProps {
  term: string;
  definition: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ term, definition }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{term}</h2>
      </div>
      <div className="mb-4">
        <p className="text-gray-600">{definition}</p>
      </div>
      <div className="mt-6 p-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">TTS Controls Placeholder</p>
      </div>
    </div>
  );
};

export default Flashcard;