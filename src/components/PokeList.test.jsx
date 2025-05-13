import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PokeList } from "./PokeList";
import { mockPokemon } from "../__mocks__/mockPokemon";

beforeEach(() => {
  // Mock fetch to return each pokemon from mockPokemon array
  let callCount = 0;
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve(mockPokemon[callCount++ % mockPokemon.length]),
    })
  );
});

describe("initial render", () => {
  it("renders loading state initially", () => {
    render(<PokeList />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("renders the setting modal on initial load", () => {
    render(<PokeList />);

    expect(screen.getByText(/chill/i)).toBeInTheDocument();
    expect(screen.getByText(/challenge/i)).toBeInTheDocument();
  });
});

describe("number of cards based on difficulty", () => {
  it("renders 4 cards after selecting chill guy option", async () => {
    render(<PokeList />);

    // Find and select the difficulty option
    const chillOption = await screen.findByText(/chill guy/i);
    fireEvent.click(chillOption);

    // Wait for all pokemon cards to load
    const cards = await screen.findAllByTestId(/^poke-card-/);

    // Check that there are exactly 4 cards rendered
    expect(cards.length).toBe(4);

    // Check the 1st card name
    expect(cards[0].id).toBe("bulbasaur");
  });

  it("renders 6 cards after selecting challenge option", async () => {
    render(<PokeList />);

    // Find and select the difficulty option
    const challengeOption = await screen.findByText(/challenge/i);
    fireEvent.click(challengeOption);

    // Wait for all pokemon cards to load
    const cards = await screen.findAllByTestId(/^poke-card-/);

    // Check that there are exactly 6 cards rendered
    expect(cards.length).toBe(6);

    // Check the 1st card name
    expect(cards[0].id).toBe("bulbasaur");
  });
});

describe("gameplay functions", () => {
  it("updates score when clicking correct cards", async () => {
    render(<PokeList />);

    const chillOpt = await screen.findByText(/chill guy/i);
    fireEvent.click(chillOpt);

    // Get all cards
    const cards = await screen.findAllByTestId(/^poke-card-/);

    // Click the 1st card
    fireEvent.click(cards[0]);

    // Check if score is updated
    // expect(await screen.findByText("Score: 1/4")).toBeInTheDocument();
    expect(screen.getByText("Score: 1/4")).toBeInTheDocument();

    // Click the 2nd card and check score
    fireEvent.click(cards[1]);
    expect(screen.getByText("Score: 2/4")).toBeInTheDocument();
  });

  it("game over when clicking incorrect cards", async () => {
    render(<PokeList />);

    const chillOpt = await screen.findByText(/chill guy/i);
    fireEvent.click(chillOpt);

    // Get all cards
    const cards = await screen.findAllByTestId(/^poke-card-/);

    // Click the cards in wrong order
    fireEvent.click(cards[1]);
    fireEvent.click(cards[0]);

    // Check for game over in end-game modal
    const gameOverMsg = screen.getByText("Game Over!", {
      selector: ".gameOver-msg",
    });
    expect(gameOverMsg).toBeInTheDocument();
  });
});
