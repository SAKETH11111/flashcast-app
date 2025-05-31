# Flashcast Product Expansion Plan

## 1. Executive Summary
Flashcast is transforming study habits through voice-controlled flashcards.  
This phase focuses on elevating the marketing site to **enterprise-grade quality** while laying foundations for the full learning platform. Outcomes:

* Professional multi-page website that converts visitors to users.
* Consistent, animated, and accessible UI using best-in-class React component libraries.
* Clear technical roadmap enabling a seamless hand-off to the Code Droid for build execution.

---

## 2. Current State Analysis
| Area                     | Status (May 2025) | Observations |
|--------------------------|-------------------|--------------|
| Codebase                 | React + Vite + TS | Solid, typed foundation; single landing route only |
| Design / UI consistency  | Partial           | Mix of bespoke & shadcn components, limited navigation |
| Feature readiness        | Early concept     | Core flashcard engine not yet implemented |
| Analytics & SEO          | Minimal           | Needs schema, meta tags, conversion tracking |
| Deployment               | GitHub Pages CI   | Works for static site; will evolve to full app hosting |

---

## 3. Target Architecture (Phase 1 – Marketing Site)
```
React (TS) ─┬─ Global Providers (Theme, Router)
            ├─ Layout Shell (Navbar, Footer, ScrollTop)
            └─ Routes
                 ├─ /           → Home (existing)
                 ├─ /features   → Feature deep-dive
                 ├─ /pricing    → Pricing & plans
                 ├─ /about      → Story & team
                 ├─ /blog       → Content hub (MVP: static MDX)
                 ├─ /docs       → Product docs (MVP: static)
                 ├─ /contact    → Contact / form
                 ├─ /legal      → Privacy + Terms
                 └─ /auth       → Login / Signup (placeholders)
```
Front-end is still **static-deployable**; dynamic app (voice flashcards) will come in Phase 2.

---

## 4. Page-by-Page Specifications
### 4.1 Home (`/`)
• Keep Hero, Testimonials, FAQ, CTA.  
• Add **hero video mock-up** (Aceternity `container-scroll-animation`).  
• Navbar with sticky blur & scroll progress.

### 4.2 Features (`/features`)
• 3-D card grid (Magic UI) explaining: Voice Control, Smart Spaced Repetition, Offline Mode, Deck Sharing, etc.  
• Interactive timeline (Aceternity `timeline`).  
• Infinite testimonials carousel.

### 4.3 Pricing (`/pricing`)
• Comparison table (MUI DataGrid ‑ accessible).  
• Toggle monthly / yearly pricing (shadcn `toggle`).  
• FAQ accordion (shadcn).  
• Stripe test-mode checkout button placeholder.

### 4.4 About (`/about`)
• Company journey timeline + animated stats counters.  
• Team cards with hover lift (Framer Motion).  
• Mission & values section.

### 4.5 Blog (`/blog`)
• MDX blog list, search filter.  
• Blog detail with reading progress bar.

### 4.6 Docs (`/docs`)
• Sidebar nav (Material UI `Drawer`) + MDX content pages.  
• Copy-code buttons (SyntaxUI snippet component).  

### 4.7 Contact (`/contact`)
• Split layout: HQ map (Leaflet) & validated form (React-Hook-Form + shadcn inputs).  
• Animated success toast.

### 4.8 Legal (`/privacy`, `/terms`)
• Static Markdown rendered pages.

### 4.9 Auth (`/login`, `/signup`)
• Minimal forms with social buttons (placeholder).

---

## 5. UI Library Research & Recommendations
| Need                       | Recommendation & Rationale |
|----------------------------|----------------------------|
| **Core primitives**        | **shadcn/ui** – Tailwind + Radix, copy-paste, accessible. |
| **Advanced animations**    | **Aceternity UI** & **Magic UI** – 200+ animated pieces, align with Tailwind & Framer Motion. |
| **Data-heavy components**  | **Material UI** – mature tables, dialogs; tree-shakable picks only where needed. |
| **Quick AI prototypes**    | **v0.dev** – generate one-off layouts fast, then polish code manually. |
| **Bonus libraries**        | SyntaxUI (code snippets), Nyxb UI (visual effects). |

Integration rule: *prefer composability* – import code into `/components/ui`, convert to local Tailwind classes for full control.

---

## 6. User Experience (Happy-Path Flows)
1. Visitor lands → scrolls hero video → clicks “See Features”.
2. On `/features`, explores 3-D cards → clicks “Start Free Trial”.
3. Pricing page → selects plan → CTA leads to `/signup`.
4. Signup placeholder → later upgrades to in-app onboarding (Phase 2).

Supporting flows: learn more (About), trust building (Blog), support (Docs, Contact).

---

## 7. Technical Requirements
| Category              | Details |
|-----------------------|---------|
| Accessibility         | WCAG 2.1 AA, Radix primitives guarantee focus handling. |
| Performance           | Core Web Vitals ≥90; lazy-load heavy animations; use `prefers-reduced-motion`. |
| SEO                   | React Helmet for meta; JSON-LD for FAQ & pricing. |
| Analytics             | Plausible or GA4 events for CTA clicks, conversion funnel. |
| Testing               | Playwright smoke tests per route; jest-rtl for components. |
| CI/CD                 | GitHub Actions existing; add Lighthouse CI budget check. |
| Code Quality          | ESLint (existing) + Prettier; commit hooks Husky + lint-staged. |

---

## 8. Implementation Roadmap & Priorities
| Sprint (2 wks) | Goal | Key Deliverables |
|----------------|------|------------------|
| **S1**         | Architecture & Nav | Navbar, Footer, Routing scaffold, ThemeProvider refactor |
| **S2**         | Core Pages         | `/features`, `/pricing` MVP with static content |
| **S3**         | Trust Pages        | `/about`, `/legal`, SEO meta |
| **S4**         | Content Engine     | MDX blog + docs infra, `/blog`, `/docs` |
| **S5**         | Forms & Contact    | `/contact` form, validation, Netlify / Formspree backend |
| **S6**         | Polish & QA        | Animation audits, accessibility, Lighthouse pass |
| **S7**         | Launch Campaign    | Analytics, preview deploy, bug-bash, production release |

Each sprint ends with demo & retro; adjust backlog based on feedback.

---

## 9. Success Metrics
| Metric                           | Target after 8 weeks |
|----------------------------------|----------------------|
| Landing page bounce rate         | ≤ 40 %              |
| Scroll depth to CTA (Home)       | ≥ 70 % visitors      |
| CTA click-through (Home → Signup)| ≥ 4 %               |
| Time on Features page            | ≥ 1 min             |
| Lighthouse performance score     | 90+ on mobile        |
| Accessibility automated score    | 95+                  |
| Pages fully covered by tests     | 80 %                 |

---

## 10. Next Steps
1. **Approve plan** – confirm scope & priorities with stakeholders.  
2. **Kick-off Sprint 1** – Product Droid hands docs to Code Droid.  
3. **Design review** – ensure brand alignment before coding advanced animations.  
4. **Track metrics** – embed analytics hooks from the outset.

*This plan positions Flashcast to attract, inform, and convert users effectively while creating a solid technical base for the upcoming voice-powered learning experience.*
