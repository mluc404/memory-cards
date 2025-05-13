import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PokeList } from "./PokeList";

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
