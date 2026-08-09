# Memory Match

A responsive memory card game built with React. Pick each card only once. After every pick, the board reshuffles, so you have to remember the cards rather than their positions.

## Live Demo

[Play Memory Match](https://memory-match-odin.vercel.app/)

## Features

- Three difficulty levels: Easy, Medium, and Hard
- 8, 12, or 16 cards depending on difficulty
- Cards reshuffle after every selection
- Tracks current score and best score separately for each difficulty
- Best scores persist after refresh using `localStorage`
- Win and loss states with a restart modal
- Pokémon data fetched from the PokéAPI
- Loading and error states for API requests
- Responsive design for desktop and mobile
- Hover interactions for supported devices

## Built With

- React
- JavaScript
- CSS
- Vite
- PokéAPI

## How It Works

The game fetches Pokémon data from the PokéAPI and creates a card set based on the selected difficulty.

When a card is selected:

1. The card is added to the list of previously clicked cards.
2. If the card has already been selected, the round ends.
3. Otherwise, the score increases.
4. The cards are shuffled.
5. Selecting every card without repeating one results in a win.

Best scores are stored in the browser using `localStorage`, allowing them to persist after refreshing the page.

## Running Locally

```bash
git clone https://github.com/midhin11/memory-card.git
cd memory-card
npm install
npm run dev
```
Open the local URL shown in the terminal.

## What I Practiced

This project helped me practice:

- React components and props
- State management with `useState`
- Side effects with `useEffect`
- Conditional rendering
- Rendering lists with `.map()`
- Event handling
- Sharing state between components
- Fetching and handling API data
- Persisting state with `localStorage`
- Responsive CSS
- CSS transitions and animations