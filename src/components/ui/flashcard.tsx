import React from 'react';

interface FlashcardWrapperProps {
  children: React.ReactNode;
}

const FlashcardWrapper: React.FC<FlashcardWrapperProps> = ({ children }) => {
  return (
    <div className="relative"> {/* Basic wrapper, can be styled further if needed */}
      {children}
    </div>
  );
};

export default FlashcardWrapper;
