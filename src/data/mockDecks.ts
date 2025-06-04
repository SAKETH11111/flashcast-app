import { FlashcardData, StudySession } from '../types/study';

const mockFlashcards: FlashcardData[] = [
  { id: '1', term: 'React', definition: 'A JavaScript library for building user interfaces' },
  { id: '2', term: 'TypeScript', definition: 'A superset of JavaScript that adds static typing' },
  { id: '3', term: 'Node.js', definition: 'A JavaScript runtime built on Chrome\'s V8 engine' },
  { id: '4', term: 'Tailwind CSS', definition: 'A utility-first CSS framework' },
  { id: '5', term: 'Framer Motion', definition: 'A React library for animations' },
  { id: '6', term: 'Component', definition: 'A reusable piece of UI in React' },
  { id: '7', term: 'Props', definition: 'Data passed from a parent component to a child component' },
  { id: '8', term: 'State', definition: 'Data managed within a component' },
  { id: '9', term: 'useEffect Hook', definition: 'A React hook for side effects' },
  { id: '10', term: 'useState Hook', definition: 'A React hook for managing state in functional components' },
  { id: '11', term: 'JSX', definition: 'A syntax extension for JavaScript, used with React' },
  { id: '12', term: 'Virtual DOM', definition: 'A lightweight copy of the actual DOM used by React for performance optimization' },
  { id: '13', term: 'Git', definition: 'A distributed version control system' },
  { id: '14', term: 'API', definition: 'Application Programming Interface; a way for different software to communicate' },
  { id: '15', term: 'JSON', definition: 'JavaScript Object Notation; a lightweight data-interchange format' },
];

export const mockStudySession: StudySession = {
  deckId: 'mock-deck-123',
  deckName: 'Web Development Basics',
  cards: mockFlashcards,
  currentIndex: 0,
  correctCount: 0,
  incorrectCount: 0,
};
