# Frontend Mentor - Rock, Paper, Scissors solution

This is a solution to the [Rock, Paper, Scissors challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rock-paper-scissors-game-pTgwgvgH). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the game depending on their device's screen size ✅ *(responsive CSS with `@media (max-width: 768px)` breakpoint that reflows layout and resizes elements for mobile)*
- Play Rock, Paper, Scissors against the computer ✅ *(random computer choice via `Math.random()` with win/lose/draw logic via the `RULES` lookup object)*
- Maintain the state of the score after refreshing the browser ✅ *(implemented via `localStorage`)*
- **Bonus**: Play Rock, Paper, Scissors, Lizard, Spock against the computer ✅ *(implemented)*

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library (v18)
- [Vite](https://vitejs.dev/) - Frontend build tool
- `localStorage` for persistent score state

### What I learned

Working through this project reinforced several key concepts:

**Managing game state with React hooks** — using `useState` for `phase`, `mode`, `score`, `playerChoice`, `computerChoice`, and `result` kept the game logic clean and predictable:

```jsx
const [phase, setPhase] = useState('landing') // 'landing' | 'playing' | 'results'
const [score, setScore] = useState(() => {
  const saved = localStorage.getItem('rps-score')
  return saved ? parseInt(saved, 10) : 0
})
```

**Persisting state with `useEffect` and `localStorage`** — syncing the score automatically on every change:

```js
useEffect(() => {
  localStorage.setItem('rps-score', score.toString())
}, [score])
```

**Encoding game rules as a lookup object** — this made it straightforward to extend from the classic 3-choice game to the 5-choice Lizard/Spock bonus mode:

```js
const RULES = {
  rock:     ['scissors', 'lizard'],
  paper:    ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard:   ['paper', 'spock'],
  spock:    ['rock', 'scissors']
}
```

**Simulating computer "thinking"** with `setTimeout` added a satisfying delay before revealing the house's pick.

### Continued development

Areas I want to continue refining in future projects:

- **CSS animations** — the winner glow effect and loading pulse could be more polished with keyframe animations.
- **Accessibility** — adding proper `aria-label` attributes to the choice buttons and ensuring keyboard navigability.
- **Component decomposition** — the `App.jsx` component handles a lot; splitting game phases into separate components (`LandingScreen`, `GameBoard`, `ResultsScreen`) would improve readability and testability.
- **TypeScript** — migrating from JSX to TSX to add type safety to the game state and rules logic.

### Useful resources

- [React Docs — useState](https://react.dev/reference/react/useState) - Essential reference for initialising state from `localStorage` using a lazy initialiser function.
- [MDN — localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) - Helped clarify how `getItem` returns `null` vs. a string, which informed the score parsing logic.
- [Vite Getting Started](https://vitejs.dev/guide/) - Quick reference for setting up the React + Vite project scaffold.

### AI Collaboration

AI tools were used to accelerate certain parts of this project:

- **Tool used**: Google Antigravity (Gemini / Claude)
- **How it was used**:
  - Brainstorming the RULES lookup table structure for the Lizard/Spock bonus mode
  - Reviewing CSS specificity issues with the `.winner` glow effect
  - Generating the initial scaffold for the `Header` component
- **What worked well**: Quickly iterating on the game logic and getting clear explanations of `useEffect` dependency arrays.
- **What didn't**: AI-generated CSS sometimes needed manual tweaking to match the exact Frontend Mentor design spec, particularly for the pentagonal button layout in bonus mode.

## Author

- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- GitHub - [@yourusername](https://github.com/yourusername)

## Acknowledgments

Thanks to [Frontend Mentor](https://www.frontendmentor.io) for providing a well-structured challenge with clear design specs and assets. The bonus Lizard/Spock mode was a fun extension of the classic game and a great exercise in scalable state design.
