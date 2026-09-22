# Monkey Portfolio Design Specification

## Goal

Create a playful one-page portfolio for three fictional developers represented by a modern take on the three wise monkeys. The experience should feel expressive and memorable while keeping the main actions obvious.

## Audience

Potential clients who want to quickly understand each developer's specialty, inspect representative work, and start a conversation.

## Visual Direction

- Jungle-inspired editorial composition with deep green backgrounds, banana yellow calls to action, lime highlights, and restrained coral details.
- Three original stylized monkey characters with a shared illustration language and distinct poses: covering eyes, ears, and mouth.
- Large character art, bold display typography, layered foliage at composition edges, tactile paper-like texture, and subtle motion.
- Avoid nested cards, excessive rounded containers, decorative gradients, and dense marketing copy.
- Mobile layout must preserve the character as the first visual signal and support touch swiping.

## Content Model

The initial release uses fictional content for three developers:

1. Mizaru, Frontend Developer: visual interfaces, motion, React, TypeScript, and accessibility.
2. Kikazaru, Backend Developer: APIs, architecture, Node.js, PostgreSQL, and cloud systems.
3. Iwazaru, Full-stack Developer: end-to-end products, React, Node.js, testing, and delivery.

All content must live in one typed data source so real names, portraits, biographies, links, and technologies can replace the fictional content later.

## Page Structure

### 1. Monkey Crew Carousel

- Full first-viewport introduction with compact navigation and the MONKEY CREW identity.
- One developer per slide with large character artwork, name, role, short positioning statement, and `Book a call` / `View projects` actions.
- Swiper provides drag, touch swipe, keyboard control, custom arrows, and an accessible `01 / 03` indicator.
- The active developer is shared with the rest of the page.

### 2. Inside the Monkey Mind

- Displays the active developer's alternate illustration, biography, hobby, work approach, and technology tags.
- Includes a compact three-person selector so visitors can change the active developer without returning to the hero.
- Changes should be immediate and use a short reduced-motion-aware transition.

### 3. Contact

- Headline: `Let's make something bananas.`
- Fields: name, email, developer selection, project summary, and submit button.
- `Book a call` scrolls to this section and preselects the active developer.
- Submission is a polished local success state for the test project; no external service is required.

## Interaction Requirements

- Carousel and profile section remain synchronized in both directions.
- Project action scrolls to a compact project strip associated with the active developer inside the profile section.
- Form validates required name, valid email, developer, and project summary.
- All controls are keyboard reachable, focus-visible, and labeled.
- Respect `prefers-reduced-motion`.

## Responsive Requirements

- Desktop: asymmetric two-column hero with copy and character art sharing the viewport.
- Tablet: maintain two columns where comfortable, then collapse before text or controls crowd.
- Mobile: text first, character immediately visible, full-width actions, touch carousel, no horizontal overflow.
- Fixed controls and counters must not shift as names or content change.

## Acceptance Criteria

- Three fictional developers can be selected through the carousel and profile selector.
- Both content sections display the same active developer.
- `Book a call` preselects that developer in the form.
- Valid form input produces a success state; invalid input exposes actionable messages.
- The page builds successfully and core interaction tests pass.
- Desktop and mobile visual checks show no overlaps, clipping, blank artwork, or horizontal scrolling.

