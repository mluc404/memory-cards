# PokeMind - A Memory Card Game

Test your memory by selecting unique Pokémon cards in the correct order. Built with **React** and powered by the **PokeAPI**, PokeMind challenges players to stay sharp as the cards shuffle after every correct selection.

<img src="./src/assets/images/screenshot.png" alt="PokeMind Game Screenshot" width="600" style="border-radius: 15px" />

<br>

[<u><font size="3">🎮 Play Game</font></u>](https://mluc404.github.io/memory-cards/)

## Tech Stack

- Vite
- React
- PokeAPI

## Features

- 2 difficulty levels
- Real Pokemon data from PokeAPI
- Fully responsive for desktop and mobile

## What I learned

### React Concepts

- **State Management**: Used `useState` to manage score, cards, game status, and UI updates
- **Side Effects with** `useEffect`: Fetched Pokémon data on mount and responded to game state changes
- **Component Architecture**: Built modular, reusable components
- **Event Handling**: Implemented click handlers with proper event propagation control

### UI/UX

- **Responsive Design**: Used Flexbox and media queries to ensure the game looks great on all devices
- **User Experience Focus**: Designed the game flow and interface to be intuitive and engaging, making it easy for users to understand how to play and enjoy the experience
- **Modal Design**: Created a reusable modal component with proper overlay handling, and consistent positioning to handle game over and game settings

### Algorithms

- **Fisher-Yates Shuffle**: Implemented this algorithm for randomizing card positions while maintaining fairness

### API Integration

- **Promise.all**: Leveraged to fetch multiple Pokémon in parallel efficiently
- **Error Handling**: Managed loading states and potential API failures

### Best Practices

- **Code Organization**: Structured the project with separate components and styles
- **Performance Optimization**: Minimized unnecessary re-renders and kept state updates efficient
- **Clean UI**: Designed with visual hierarchy and consistent spacing for better readability and interaction

## Installation

1. Clone the repository:

```bash
git clone https://github.com/mluc404/memory-cards.git
```

2. Navigate to the project directory:

```bash
cd memory-cards
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```
