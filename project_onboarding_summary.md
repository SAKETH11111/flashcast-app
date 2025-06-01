# Flashcast App - Project Onboarding Summary

## 1. Project Overview

**Primary Purpose:**
Flashcast is a modern flashcard application designed to provide an interactive and engaging learning experience. It aims to help users memorize and review information efficiently.

**Core Functionalities:**
*   Displaying flashcards with terms and definitions.
*   Interactive UI elements and animations to enhance user experience.
*   Theme switching with distinct color schemes:
    *   **Light Mode:** Green primary color (hsl(145, 58%, 50%)) with yellow accents (hsl(43, 95%, 58%)) on white background
    *   **Dark Mode:** Yellow primary color (hsl(43, 95%, 58%)) with green accents (hsl(145, 58%, 50%)) on dark background (hsl(0, 0%, 10%))
*   A landing page showcasing features, testimonials, and FAQs.
*   Planned features include Text-to-Speech (TTS) controls for flashcards.

**Target Audience:**
Students, educators, and lifelong learners seeking an effective digital tool for study and knowledge retention.

**Overall Theme:**
The application has a modern, clean, and dynamic theme, utilizing animations and visual effects to create an engaging educational environment.

## 2. Technology Stack

**Programming Languages:**
*   TypeScript 5.8

**Frameworks:**
*   React 19 (for the frontend)

**Significant Libraries:**
*   **UI Components & Styling:**
    *   Tailwind CSS (utility-first CSS framework)
    *   Tailwind Animate (for animations with Tailwind)
    *   Radix UI (headless UI primitives)
    *   Lucide React (icons)
    *   Tabler Icons (icons)
    *   `shadcn/ui` (likely, given [`components.json`](components.json) and typical structure of `ui` components like [`button.tsx`](src/components/ui/button.tsx))
*   **Animation & Effects:**
    *   Framer Motion (animation library)
    *   GSAP (GreenSock Animation Platform)
    *   Canvas Confetti (for confetti effects)
    *   Cobe (for globe visualization, e.g., in [`animated-hero.tsx`](src/components/ui/animated-hero.tsx))
*   **Routing:**
    *   React Router DOM
*   **Utilities:**
    *   `class-variance-authority` (for managing component variants)
    *   `clsx` (for constructing className strings conditionally)
    *   `tailwind-merge` (for merging Tailwind CSS classes)

**Runtime Environments:**
*   Node.js (required for development and build processes)
*   Modern Web Browser (e.g., Chrome, Firefox, Safari, Edge with ES2020 support for users)

**Database Systems:**
*   No specific database system was identified from the initial scan of the repository. The application appears to be client-side focused at this stage.

**Build Tools:**
*   Vite (build tool and development server)

**Package Managers:**
*   Yarn (indicated by [`yarn.lock`](yarn.lock) and `yarn` commands in workflow)

**Deployment Environment Info:**
*   The project is configured for deployment to GitHub Pages, as suggested in the [`README.md`](README.md).

## 3. Codebase Architecture and Structure

**High-Level Organization:**
The project follows a standard Vite + React + TypeScript structure. Source code is primarily located within the [`src/`](src/) directory, with static assets in [`public/`](public/). Components are a central part of the architecture.

**Key Directories:**
```
flashcast-app/
├── public/          # Static assets (e.g., vite.svg)
├── src/             # Application source code
│   ├── assets/      # Project-specific static assets (e.g., react.svg)
│   ├── components/  # React components
│   │   ├── ui/      # Reusable, generic UI components (e.g., button, card)
│   │   └── ...      # Feature-specific or composite components (e.g., Flashcard.tsx, TopBar.tsx)
│   ├── lib/         # Utility functions (e.g., utils.ts)
│   ├── App.css      # Global styles for App component
│   ├── App.tsx      # Root React component, likely handles routing
│   ├── index.css    # Global CSS styles, Tailwind imports
│   ├── main.tsx     # Application entry point, renders the root component
│   └── vite-env.d.ts# TypeScript type declarations for Vite environment variables
├── .gitignore       # Specifies intentionally untracked files that Git should ignore
├── package.json     # Project metadata, dependencies, and scripts
├── README.md        # Project overview, setup, and usage instructions
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json    # Root TypeScript configuration
├── tsconfig.app.json # TypeScript configuration specific to the application code
├── tsconfig.node.json# TypeScript configuration for Node.js scripts (e.g., Vite config)
└── vite.config.ts   # Vite build tool configuration
```

**Modules:**
*   **UI Components:** Located in [`src/components/ui/`](src/components/ui/), these are general-purpose UI elements.
*   **Feature Components:** Found in [`src/components/`](src/components/), these are more specific to the application's features, like [`Flashcard.tsx`](src/components/Flashcard.tsx) or [`CardDisplayArea.tsx`](src/components/CardDisplayArea.tsx).
*   **Utilities:** Helper functions are organized in [`src/lib/utils.ts`](src/lib/utils.ts).

**Observed Architectural Patterns:**
*   **Component-Based Architecture:** The UI is built as a hierarchy of reusable React components.
*   **Atomic Design Principles (implied):** The separation of `ui/` components (atoms, molecules) from feature components (organisms, templates) suggests an approach similar to Atomic Design.
*   **Theme Provider Pattern:** Centralized theme management (dark/light mode) is handled by [`theme-provider.tsx`](src/components/theme-provider.tsx).

**Critical Components/Services and Their Interactions:**
*   [`App.tsx`](src/App.tsx): The root component, likely responsible for setting up routing and overall application layout.
*   [`MainLayout.tsx`](src/components/MainLayout.tsx): Defines the primary structure for application views, including top and bottom action bars.
*   [`Flashcard.tsx`](src/components/Flashcard.tsx): The core component for displaying flashcard content.
*   [`TopBar.tsx`](src/components/TopBar.tsx) & [`BottomActionBar.tsx`](src/components/BottomActionBar.tsx): Provide navigation and interactive controls.
*   [`theme-provider.tsx`](src/components/theme-provider.tsx): Manages and applies color themes across the application.
*   Routing (via React Router DOM): Manages navigation between different views/pages of the application.

## 4. Development Practices and Conventions

**Coding Styles:**
*   Coding style is enforced by ESLint, as per [`eslint.config.js`](eslint.config.js). Specific rulesets (e.g., from `@typescript-eslint`, `eslint-plugin-react`) guide the style.
*   Consistent use of TypeScript for type safety.

**Linting/Formatting Configurations:**
*   ESLint is configured for code quality and style consistency.
*   Prettier is often used with ESLint, though not explicitly confirmed without checking devDependencies for `prettier`. However, the presence of ESLint strongly suggests a focus on automated formatting and linting.

**Common Patterns:**
*   **UI Patterns:**
    *   **Theme System:**
        *   Implemented via [`ThemeProvider`](src/components/theme-provider.tsx)
        *   Uses CSS variables defined in [`index.css`](src/index.css)
        *   Light mode: Green primary (buttons, accents) on white background
        *   Dark mode: Yellow primary on dark gray background
        *   System preference detection for automatic theme switching
    *   **Responsive Design:** Tailwind utility classes for all components
    *   **Micro-Interactions:** Animated transitions using Framer Motion
    *   **Visual Hierarchy:** Clear typography and spacing system with consistent color usage
*   **Path Aliases:** The `@/` alias is configured (likely in [`tsconfig.json`](tsconfig.json) and [`vite.config.ts`](vite.config.ts)) to simplify imports from the `src` directory.
*   **Component Organization:** A clear distinction between generic UI components (`src/components/ui`) and feature-specific components.

**Evidence of Testing Strategies:**
*   No dedicated testing files (e.g., `*.test.tsx`, `*.spec.tsx`) or testing-specific configurations (like Jest or Vitest config beyond Vite's defaults) were immediately apparent in the file listing. This suggests testing might not be extensively implemented yet or uses a setup not obvious from file names alone.

**Version Control Practices:**
*   Git is used for version control (evidenced by [`.gitignore`](.gitignore)).
*   The project is likely hosted on GitHub, given the GitHub Pages deployment information.

**State of Project Documentation:**
*   A [`README.md`](README.md) file exists, providing an overview and setup instructions.
*   Inline code comments and TypeScript types contribute to code-level documentation.
*   [`components.json`](components.json) might be related to `shadcn/ui` documentation or component tracking.

## 5. Key Learnings and Developer Onboarding Insights

**Crucial Codebase Areas for New Developers:**
*   **Component System:** Understanding the structure within [`src/components/`](src/components/), especially the distinction between `ui/` and feature components. Key components like [`Flashcard.tsx`](src/components/Flashcard.tsx), [`MainLayout.tsx`](src/components/MainLayout.tsx), and [`CardDisplayArea.tsx`](src/components/CardDisplayArea.tsx) are central.
*   **State Management:** While a global state manager like Redux or Zustand wasn't explicitly identified, understanding how state is managed within components and potentially passed via props or React Context (e.g., [`ThemeProvider`](src/components/theme-provider.tsx)) is crucial.
*   **Styling with Tailwind CSS:** Proficiency with Tailwind CSS and its utility-first approach is essential.
*   **Routing:** Familiarity with React Router DOM for navigation.
*   [`lib/utils.ts`](src/lib/utils.ts): For common utility functions.

**Potential Challenges, Complexities, Technical Debt:**
*   **Scalability of UI Components:** As the application grows, managing the increasing number of UI components and their variations could become complex.
*   **Advanced Feature Implementation:** Implementing planned features like robust TTS, spaced repetition algorithms, and user authentication will introduce significant complexity.
*   **State Management:** If the application scales, a more robust global state management solution might be necessary.
*   **Testing Coverage:** The apparent lack of extensive tests could become a source of technical debt, making future refactoring or feature additions riskier.
*   **Accessibility (A11y):** While Radix UI promotes accessibility, ensuring all custom components and interactions meet a11y standards requires ongoing attention.

**Key External Dependencies, APIs, Integrated Services:**
*   **Core:** React, Vite, TypeScript, Tailwind CSS.
*   **UI & Animation:** Radix UI, Framer Motion, Lucide React.
*   **Deployment:** GitHub Pages.
*   No other external APIs or backend services were identified in this initial client-side focused analysis.

**Immediate Prerequisites or Setup Steps for a New Developer:**
*   **Prerequisites:**
    *   Node.js (check [`package.json`](package.json) `engines` field for specific version, if present, otherwise a recent LTS version).
    *   Yarn package manager.
    *   A modern web browser.
*   **Setup Steps:**
    1.  Clone the repository.
    2.  Install dependencies: `yarn install`
    3.  Start the development server: `yarn dev`
    4.  Open the application in a browser (typically `http://localhost:5173` or similar, as indicated by Vite).
*   **Build for production:** `yarn build`
*   **Preview production build:** `yarn preview`