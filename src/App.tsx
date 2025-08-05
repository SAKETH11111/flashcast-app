import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import FeaturesPage from './pages/FeaturesPage';
import StudyPage from './pages/StudyPage';
import DashboardPage from './pages/DashboardPage';
import CreateDeckPage from './pages/CreateDeckPage';
import DeckDetailPage from './pages/DeckDetailPage';
import { DecksPage } from './pages/DashboardPage/components/DecksPage';
import { TrashPage } from './pages/DashboardPage/components/TrashPage';
import DashboardLayout from './pages/DashboardPage/DashboardLayout';
import { Particles } from './components/ui/particles';
import ScrollToTopButton from './components/ui/scroll-to-top-button';
import { SignInPage } from './components/ui/sign-in-flow-1';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Particles
        className="fixed inset-0 z-0"
        quantity={300}
        size={0.4}
        vx={0.05}
        vy={0.05}
        ease={50}
        staticity={30}
      />
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="decks" element={<DecksPage />} />
            <Route path="trash" element={<TrashPage />} />
            <Route path="create" element={<CreateDeckPage />} />
          </Route>
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/deck/:deckId" element={<DeckDetailPage />} />
          <Route path="/study/:deckId" element={<StudyPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/create" element={<Navigate to="/dashboard/create" replace />} />
        </Routes>
      </div>
      <ScrollToTopButton />
    </div>
  );
}

export default App;
