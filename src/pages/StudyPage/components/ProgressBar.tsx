import React from 'react';

interface ProgressBarProps {
  currentIndex: number;
  totalCards: number;
  // Optional for future enhancements
  // streak?: number;
  // accuracy?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentIndex, totalCards }) => {
  const progressPercentage = totalCards > 0 ? (currentIndex / totalCards) * 100 : 0;

  return (
    <div className="fixed top-0 left-0 right-0 h-8 p-2 flex justify-between items-center text-sm bg-slate-200/50 dark:bg-gray-800/50 text-foreground">
      <div className="w-full h-full bg-slate-300 dark:bg-gray-600 rounded overflow-hidden relative">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="absolute left-0 right-0 flex justify-center items-center h-full text-foreground">
        <span>
          Card {currentIndex} of {totalCards}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
