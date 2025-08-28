import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";

jest.mock("../components/Rodape", () => () => <div>Rodapé Mock</div>);
jest.mock("../components/CarrosselFilmes", () => () => (
  <div>Carrossel de Filmes Mock</div>
));
jest.mock("../components/CarrosselSeries", () => () => (
  <div>Carrossel de Séries Mock</div>
));

describe("Home Component", () => {
  test("renderiza títulos de filmes e séries populares", () => {
    render(<Home />);

    expect(screen.getByText(/Filmes Populares/i)).toBeInTheDocument();
    expect(screen.getByText(/Séries Populares/i)).toBeInTheDocument();
  });

  test("renderiza o Carrossel de Filmes", () => {
    render(<Home />);

    expect(screen.getByText(/Carrossel de Filmes Mock/i)).toBeInTheDocument();
  });

  test("renderiza o Carrossel de Séries", () => {
    render(<Home />);

    expect(screen.getByText(/Carrossel de Séries Mock/i)).toBeInTheDocument();
  });

  test("renderiza o Rodapé", () => {
    render(<Home />);

    expect(screen.getByText(/Rodapé Mock/i)).toBeInTheDocument();
  });
});
