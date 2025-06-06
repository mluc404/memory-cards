# PokeMind - A Memory Card Game

Test your memory by selecting unique Pokémon cards in the correct order. Built with **React** and powered by **PokeAPI**, PokeMind challenges players to stay sharp as the cards shuffle after every correct selection.

<img src="./src/assets/images/screenshot.png" alt="PokeMind Game Screenshot" width="600" style="border-radius: 15px" />

<br>

[<u><font size="3">🎮 Play Game</font></u>](https://pokemindgame.netlify.app/)

## Tech Stack

- Vite
- React
- [<u>PokeAPI</u>](https://pokeapi.co/docs/v2#info)

## Features

- 2 difficulty levels
- Real Pokemon data from PokeAPI
- Fully responsive for desktop and mobile

## What I learned

### React Concepts

- **State Management**: Implemented state interactions between game logic, UI updates, and API data
- **Performance Optimization**: Optimized component re-renders through proper state management and event handling
- **Component Architecture**: Built modular, reusable components with clear separation of concerns

### UI/UX

- **Responsive Design**: Used Flexbox and media queries to ensure the game looks great on all devices
- **User Experience Focus**: Designed the game flow and interface to be intuitive and engaging
- **Modal Design**: Created a reusable modal component with proper overlay handling, and consistent positioning to handle game over and game settings

### React Testing

- **Mocking**: Created mock data and API responses to test components in isolation
- **Test Organization**: Structured test blocks for better readability and maintenance

### Algorithms

- **Fisher-Yates Shuffle**: Implemented this algorithm for randomizing card positions while maintaining fairness

### API Integration

- **Promise.all**: Leveraged to fetch multiple Pokémon in parallel efficiently
- **Error Handling**: Managed loading states and potential API failures

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
