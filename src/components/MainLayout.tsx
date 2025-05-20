import React, { type ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <main className="flex-grow p-4">
      {children}
    </main>
  );
};

export default MainLayout;