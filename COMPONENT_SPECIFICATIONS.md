# Component Specifications  
*(Flashcast Marketing Site – Phase 1)*  

---

## Legend  

| Field | Meaning |
|-------|---------|
| **Props** | TypeScript signature (shorthand) |
| **Styling** | Tailwind / CSS-var tokens & structural notes |
| **Animation** | Framer-Motion variants, durations, easing |
| **Responsive** | Behaviour at `sm`, `md`, `lg` breakpoints |
| **A11y** | Roles, ARIA, focus handling, motion-reduce |
| **Notes** | Implementation tips (lazy, IO, etc.) |

---

## 0. Global Shell Components  

### 0.1 `<Navbar />`  
| Field | Spec |
|-------|------|
| Props | `links: {name:string;href:string}[]` |
| Styling | Sticky top, `backdrop-blur`, glass border `border-gray-200/20`, dark variant `bg-gray-900/80` |
| Animation | Hide‐on‐scroll-down (spring `0.3s`), reveal on up; link underline with `layoutId` |
| Responsive | Collapses to hamburger below `md`; dropdown slides `y: -20 → 0` |
| A11y | `<nav>` landmark, `aria-expanded` on menu button |
| Notes | Prefetch route data via `onMouseEnter` |

### 0.2 `<Footer />` – static; ensure color-contrast 4.5:1  

### 0.3 `<ThemeProvider />` – already exists; add `MotionConfig` with `reducedMotion: "user"`  

### 0.4 `<ScrollToTopButton />` – appears at 600 px scroll; fade/scale; keyboard focusable  

---

## 1. Home (`/`)  

| Component | Props | Styling | Animation | Responsive | A11y | Notes |
|-----------|-------|---------|-----------|------------|------|-------|
| `HeroSection` | `title:string` `subtitle:string` `cta:ReactNode` | Full-viewport, `bg-gradient-to-b from-black via-gray-900 to-black`, text gradient | Title fade-up `0.6s`; optional video container-scroll (Aceternity) | Stack text & visual `md:flex` | Heading levels h1/h2 | Lazy-load video |
| `TestimonialsColumns` | `items: Testimonial[]` | Two masonry cols above `lg`, single below | Stagger fade; each card hover-lift 3 px | Gap `6` → `8` | `figure`/`blockquote` semantics | Use CSS column-count |
| `FAQAccordion` | `faqs: {q,a}[]` | uses shadcn `<Accordion>` | Height spring; rotate chevron | Full width | `aria-expanded` |  |
| `CTASection` | same | Centered spotlight btn (Magic) | Spotlight radial on pointer |  |  |  |

---

## 2. Features (`/features`)  

### 2.1 `<ThreeDCard />`  

| Field | Spec |
|-------|------|
| Props | `{ icon:ReactNode; title:string; description:string }` |
| Styling | `bg-gradient-to-br from-gray-900/90 to-gray-900/70`, border `border-gray-800`, radius `xl`, perspective 1000 |
| Animation | Mouse-move tilt: rotateX/Y up to ±8°; whileHover scale 1.02; `transition 0.2s ease-out` |
| Responsive | Grid of 1 / 2 / 3 cards (`sm`/`md`/`lg`) |
| A11y | `role="article"`, focusable `tabIndex=0`, same tilt on keyboard focus using `:focus-visible` |
| Notes | Reset transform on `mouseleave` & `blur` |

### 2.2 `<BentoGrid />`  

| Props | `items: {title,description,icon}[]` |
| Styling | CSS grid: 1-col→2→3; cards share style with ThreeDCard sans tilt |
| Animation | Parent stagger 0.1 s |
| Responsive | `md:grid-cols-2`, `lg:grid-cols-3` |
| A11y | Region label `"Feature list"` |

### 2.3 `<InfiniteMovingCards />`  

| Props | `{items: Testimonial[]; direction:"left"|"right"; speed:"fast"|"normal"|"slow"; pauseOnHover?:boolean}` |
| Styling | Track width `w-max` flex gap-4; card width `w-[350px] md:w-[450px]` |
| Animation | Keyframes `scroll-left/right`; speed map 30/45/60 s linear infinite |
| Responsive | Auto height; hides overflow |  
| A11y | Static fallback for `prefers-reduced-motion`, announce testimonial via `aria-live="polite"` on hover |
| Notes | Duplicate items array twice to create endless loop |

### 2.4 `<ContainerScroll />`  

| Props | `{ children:ReactNode; titleComponent:ReactNode }` |
| Styling | `relative h-[200vh]`; sticky inner box `h-[60vh]` |
| Animation | ScaleX/Y 1→0.85 and `borderRadius 0→60` via `useTransform(scrollYProgress)` |
| Responsive | Box height `h-[50vh]` on `sm` |
| A11y | Ensure focus trap not broken; `aria-hidden` on decorative bg |
| Notes | Use `<MotionConfig>` to obey reduced motion |

### 2.5 `<TimelineItem />` – see About too; share spec  

---

## 3. Pricing (`/pricing`)  

| Component | Props | Styling | Animation | Responsive | A11y | Notes |
|-----------|-------|---------|-----------|------------|------|-------|
| `PricingComparisonTable` | `plans: Plan[]` | Use CSS grid not `<table>` for mobile; gradient border around featured plan | Fade-in rows; price number spring when toggle | Two-col on `md`, three on `lg` | Table semantics w/ `role="rowgroup"` for screen readers | Use `react-use-measure` to animate height |
| `BillingToggle` | `defaultCycle:"monthly"|"yearly" onChange(cycle)` | shadcn `<Toggle>` + Magic glow | Thumb slide `x` 0→100% | Inline vs stacked on `sm` | `aria-pressed` | Controlled component |
| `FAQAccordion` | reuse spec |  |

---

## 4. About (`/about`)  

| Component | Props | Styling/Animation (delta) |
|-----------|-------|---------------------------|
| `StatsCounter` | `{value:number; label:string; icon:ReactNode}` | Count-up on enter (`framer-motion` `useSpring`), card border gradient |
| `TeamCard` | `{name;role;bio;img}` | `overflow-hidden`, image zoom on hover (scale 1.1) |
| `TimelineItem` | `{year:string; title; description; icon; isLeft?:boolean}` – same as Features; ensure marker has `aria-hidden` |

---

## 5. Blog (`/blog`) & Docs (`/docs`) – MDX Engine  

| Component | Key Points |
|-----------|------------|
| `MDXLayout` | Provide heading anchors, code block via SyntaxUI `<CopyBlock>`; dark theme |
| `ReadingProgressBar` | Uses `useScroll` top sticky `h-1` gradient progress |

---

## 6. Contact (`/contact`)  

| Component | Props | Notes |
|-----------|-------|-------|
| `ContactForm` | `onSubmit(data)` – fields: name, email, message | Use React-Hook-Form, aria-invalid, label elements; Magic Confetti on success |
| `MapEmbed` | `{lat:number; lng:number}` | Leaflet map lazy-import; give `title` attr |

---

## 7. Legal (`/privacy`, `/terms`)  

Render markdown via `react-markdown`; ensure `<main id="content">` landmark.

---

## 8. Auth (`/login`, `/signup`)  

| Component | Spec |
|-----------|------|
| `AuthForm` | Inputs from shadcn; includes OAuth buttons; success redirect stub |
| Animation | Card drop `opacity 0 → 1`, `y -20→0` |

---

## 9. Dashboard (Phase 2 Placeholder)  

| Component | Early spec |
|-----------|------------|
| `ProgressDataGrid` | Use `@mui/x-data-grid` with Tailwind override; virtualised |

---

## 10. Utility / Hooks  

| Hook | Purpose |
|------|---------|
| `useReducedMotionPref()` | returns boolean; wrap motion variants |
| `useLazyImport()` | generic dynamic import with suspense fallback |

---

## Accessibility Checklist (Global)  

* All interactive elements keyboard reachable & focus visible  
* `prefers-reduced-motion: reduce` disables keyframe scroll & tilt  
* Color contrast ≥ AA (#8ab4f8 on #202124 OK)  
* Landmarks: `<header>`, `<main>`, `<nav>`, `<footer>`  
* `aria-live="polite"` for dynamic testimonial carousel  

---

## Implementation Order for Code Droid  

1. Core primitives (shadcn)  
2. Global shell (Navbar, Footer, ThemeProvider)  
3. Home hero & basic sections  
4. Reusable marketing components (3DCard, BentoGrid, InfiniteMovingCards)  
5. Pricing table + toggle  
6. Remaining pages  
7. Blog/Docs MDX infra  
8. Contact form with backend stub  
9. Accessibility & performance polish  

*Follow these specs to ensure consistent, performant, and accessible UI across the Flashcast marketing site.*  
