# Monkey Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished responsive portfolio for three fictional monkey developers with a synchronized Swiper carousel, profile section, and validated contact form.

**Architecture:** A small React application keeps developer content in one typed module and owns the active developer id at the page level. Presentation components receive the active id and callbacks, while contact validation stays in a pure helper that can be tested without a browser.

**Tech Stack:** React, TypeScript, Vite, Swiper, Lucide React, Vitest, React Testing Library, CSS.

**Spec:** `docs/superpowers/specs/2026-09-22-monkey-portfolio-design.md`

## Global Constraints

- Use three original stylized monkey illustrations with consistent art direction.
- Preserve the approved three-section page structure.
- Swiper must support pointer dragging, touch swipe, keyboard interaction, custom arrows, and an accessible counter.
- Keep all replaceable developer content in one typed data source.
- Use CSS custom properties for the approved green, yellow, lime, and coral palette.
- Respect `prefers-reduced-motion` and prevent horizontal overflow at mobile widths.
- Do not add a backend or external form service.

## Review Focus

- A carousel change must update the profile content and contact preselection without stale state.
- A profile selector change must move the Swiper to the matching developer.
- Empty or malformed form values must show specific field errors without replacing valid values.
- Long developer names and project copy must wrap without moving fixed controls or causing overflow.
- Reduced-motion users must not receive looping or large movement animations.

---

### Task 1: Application Foundation And Developer Model

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `src/main.tsx`
- Create: `src/vite-env.d.ts`
- Create: `src/data/developers.ts`
- Create: `src/data/developers.test.ts`

**Interfaces:**
- Produces: `Developer`, `DeveloperId`, `developers`, and `getDeveloperById(id)` for all later tasks.

- [ ] **Step 1: Scaffold the Vite test environment and write the failing data tests**

```ts
import { describe, expect, it } from 'vitest';
import { developers, getDeveloperById } from './developers';

describe('developer catalog', () => {
  it('contains three developers with unique ids', () => {
    expect(developers).toHaveLength(3);
    expect(new Set(developers.map(({ id }) => id)).size).toBe(3);
  });

  it('returns the matching developer by id', () => {
    expect(getDeveloperById('kikazaru').role).toBe('Backend Developer');
  });
});
```

- [ ] **Step 2: Run the data test and verify RED**

Run: `npm test -- src/data/developers.test.ts --run`
Expected: FAIL because `./developers` does not exist.

- [ ] **Step 3: Implement the typed catalog with complete fictional copy**

```ts
export type DeveloperId = 'mizaru' | 'kikazaru' | 'iwazaru';

export interface Developer {
  id: DeveloperId;
  index: string;
  name: string;
  role: string;
  tagline: string;
  bio: string;
  hobby: string;
  approach: string;
  technologies: string[];
  project: { name: string; description: string; result: string };
  heroImage: string;
  profileImage: string;
  accent: string;
}

export const getDeveloperById = (id: DeveloperId) =>
  developers.find((developer) => developer.id === id) ?? developers[0];
```

Complete `developers` with the three approved characters and project-local image paths under `/images/`.

- [ ] **Step 4: Run the test and verify GREEN**

Run: `npm test -- src/data/developers.test.ts --run`
Expected: 2 tests PASS.

- [ ] **Step 5: Commit the foundation**

```bash
git add package.json index.html tsconfig.json vite.config.ts src/main.tsx src/vite-env.d.ts src/data
git commit -m "chore: scaffold monkey portfolio"
```

### Task 2: Synchronized Carousel And Profile Experience

**Files:**
- Create: `src/App.tsx`
- Create: `src/App.test.tsx`
- Create: `src/components/SiteHeader.tsx`
- Create: `src/components/HeroCarousel.tsx`
- Create: `src/components/DeveloperProfile.tsx`
- Create: `src/test/setup.ts`

**Interfaces:**
- Consumes: `DeveloperId` and `developers` from Task 1.
- Produces: `HeroCarousel({ activeId, onActiveChange, onBookCall, onViewProjects })` and `DeveloperProfile({ activeId, onActiveChange })`.

- [ ] **Step 1: Write failing integration tests for synchronized selection and booking**

```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('Monkey Portfolio', () => {
  it('updates hero and profile from the developer selector', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /select kikazaru/i }));
    expect(screen.getByRole('heading', { name: 'Kikazaru' })).toBeInTheDocument();
    expect(screen.getByText(/systems that stay calm under pressure/i)).toBeInTheDocument();
  });

  it('preselects the active developer when booking a call', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /select iwazaru/i }));
    fireEvent.click(screen.getByRole('button', { name: /book a call with iwazaru/i }));
    expect(screen.getByLabelText(/developer/i)).toHaveValue('iwazaru');
  });
});
```

- [ ] **Step 2: Run the app tests and verify RED**

Run: `npm test -- src/App.test.tsx --run`
Expected: FAIL because `App` and its interaction components do not exist.

- [ ] **Step 3: Implement page-owned active selection and Swiper integration**

`App` owns `activeId`, passes it to both sections, and exposes one `selectDeveloper(id)` callback. `HeroCarousel` updates it from `onSlideChange`; profile selector buttons update it directly and the carousel reacts to the controlled id. `Book a call` sets the form developer and calls `scrollIntoView({ behavior: 'smooth' })` unless reduced motion is requested.

- [ ] **Step 4: Add accessible structure and stable controls**

Use semantic sections, one page-level `h1`, labelled arrow icon buttons, a stable-width counter, selector buttons with `aria-pressed`, alt text for each character, and focus-visible styles. Keep project navigation as a button that scrolls to the active project's heading.

- [ ] **Step 5: Run the app tests and verify GREEN**

Run: `npm test -- src/App.test.tsx --run`
Expected: 2 tests PASS.

- [ ] **Step 6: Commit the synchronized experience**

```bash
git add src/App.tsx src/App.test.tsx src/components src/test
git commit -m "feat: add synchronized monkey crew experience"
```

### Task 3: Contact Validation And Success State

**Files:**
- Create: `src/components/ContactForm.tsx`
- Create: `src/lib/validateContact.ts`
- Create: `src/lib/validateContact.test.ts`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Interfaces:**
- Consumes: controlled `selectedDeveloper: DeveloperId` and `onDeveloperChange(id)`.
- Produces: `validateContact(values): ContactErrors` and a local successful submission state.

- [ ] **Step 1: Write failing validation tests**

```ts
import { describe, expect, it } from 'vitest';
import { validateContact } from './validateContact';

describe('validateContact', () => {
  it('reports every required empty field', () => {
    expect(validateContact({ name: '', email: '', developer: '', summary: '' })).toEqual({
      name: 'Tell us your name.',
      email: 'Add your email.',
      developer: 'Choose a developer.',
      summary: 'Tell us a little about the project.',
    });
  });

  it('rejects a malformed email', () => {
    expect(validateContact({ name: 'Ada', email: 'ada@', developer: 'mizaru', summary: 'A portfolio' }).email)
      .toBe('Enter a valid email.');
  });
});
```

- [ ] **Step 2: Run validation tests and verify RED**

Run: `npm test -- src/lib/validateContact.test.ts --run`
Expected: FAIL because `validateContact` does not exist.

- [ ] **Step 3: Implement minimal validation and verify GREEN**

Implement trimmed required checks and `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` email validation.

Run: `npm test -- src/lib/validateContact.test.ts --run`
Expected: 2 tests PASS.

- [ ] **Step 4: Add a failing form submission integration test**

```tsx
it('shows a success state after valid local submission', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Ada' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'ada@example.com' } });
  fireEvent.change(screen.getByLabelText(/project summary/i), { target: { value: 'A playful portfolio.' } });
  fireEvent.click(screen.getByRole('button', { name: /send project brief/i }));
  expect(screen.getByRole('status')).toHaveTextContent(/brief received/i);
});
```

- [ ] **Step 5: Run the integration test and verify RED**

Run: `npm test -- src/App.test.tsx --run`
Expected: FAIL because the contact form and success state are absent.

- [ ] **Step 6: Implement the contact form and verify GREEN**

Render labelled fields, inline error messages connected through `aria-describedby`, preserve submitted values on validation failure, and replace the form with an accessible local success state after valid submission.

Run: `npm test -- src/App.test.tsx --run`
Expected: all App tests PASS.

- [ ] **Step 7: Commit contact behavior**

```bash
git add src/App.tsx src/App.test.tsx src/components/ContactForm.tsx src/lib
git commit -m "feat: add validated contact experience"
```

### Task 4: Art Direction, Responsive Styling, And Final Verification

**Files:**
- Create: `public/images/mizaru-hero.png`
- Create: `public/images/kikazaru-hero.png`
- Create: `public/images/iwazaru-hero.png`
- Create: `src/styles.css`
- Modify: `src/main.tsx`
- Modify: `src/App.test.tsx`

**Interfaces:**
- Consumes: finalized component class names and project-local image paths.
- Produces: the complete responsive visual system and reduced-motion behavior.

- [ ] **Step 1: Generate and inspect three consistent character assets**

Use the built-in image generator once per character. Request transparent-background editorial 3D illustrations, full-body or three-quarter framing, matching camera angle and materials, no text, no watermark, and the approved eye/ear/mouth poses. Inspect each output, then copy final assets into `public/images/` using the exact filenames above.

- [ ] **Step 2: Write the failing reduced-motion contract test**

```tsx
it('keeps carousel controls available independent of animation', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /previous developer/i })).toBeEnabled();
  expect(screen.getByRole('button', { name: /next developer/i })).toBeEnabled();
});
```

- [ ] **Step 3: Run the contract test and verify RED if controls are not yet wired**

Run: `npm test -- src/App.test.tsx --run`
Expected: FAIL until both accessible carousel controls are present.

- [ ] **Step 4: Implement the visual system**

Define palette, typography, spacing, stable control dimensions, responsive grids, focus styles, foliage decorations made from CSS shapes, subtle texture, and transitions. Add a `@media (prefers-reduced-motion: reduce)` block that disables smooth scrolling and nonessential transforms. Use breakpoints only where content needs them, including a single-column mobile composition with full-width actions.

- [ ] **Step 5: Run all automated verification**

Run: `npm test -- --run`
Expected: all tests PASS with zero failures.

Run: `npm run build`
Expected: TypeScript and Vite build complete with exit code 0.

- [ ] **Step 6: Perform responsive visual checks**

Start the local server and inspect at 1440x900, 768x1024, and 390x844. Confirm all three images render, carousel drag and arrows work, sections stay synchronized, the form preselects the active developer, focus is visible, text does not clip, and no viewport has horizontal overflow.

- [ ] **Step 7: Commit the finished interface**

```bash
git add public/images src/styles.css src/main.tsx src/App.test.tsx
git commit -m "feat: finish monkey portfolio design"
```

