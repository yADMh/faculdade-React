import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "../App";

jest.mock("./components/Cabecalho", () => () => <div>Mocked Cabecalho</div>);
jest.mock("./pages/Home", () => () => <div>Página Inicial</div>);
jest.mock("./pages/Lancamentos", () => () => <div>Página de Lançamentos</div>);
jest.mock("./pages/Filmes", () => () => <div>Página de Filmes</div>);
jest.mock("./pages/Series", () => () => <div>Página de Séries</div>);
jest.mock("./pages/Autores", () => () => <div>Página de Autores</div>);
jest.mock("./pages/SearchResults", () => () => <div>Resultados de Busca</div>);
jest.mock("./pages/DetalhesFilme", () => () => <div>Detalhes do Filme</div>);
jest.mock("./pages/DetalhesSerie", () => () => <div>Detalhes da Série</div>);
jest.mock("./pages/DetalhesAutor", () => () => <div>Detalhes do Autor</div>);

describe("App Component", () => {
  test("renderiza o cabeçalho e a página inicial por padrão", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText(/Mocked Cabecalho/i)).toBeInTheDocument();

    expect(screen.getByText(/Página Inicial/i)).toBeInTheDocument();
  });

  test("navega para a página de lançamentos", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    window.history.pushState({}, "", "/lancamentos");
    expect(
      await screen.findByText(/Página de Lançamentos/i)
    ).toBeInTheDocument();
  });

  test("navega para a página de filmes", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    window.history.pushState({}, "", "/filmes");
    expect(await screen.findByText(/Página de Filmes/i)).toBeInTheDocument();
  });

  test("navega para uma página específica via usuário", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const user = userEvent.setup();
    window.history.pushState({}, "", "/series");

    expect(await screen.findByText(/Página de Séries/i)).toBeInTheDocument();
  });

  test("carrega página de detalhes de filmes", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    window.history.pushState({}, "", "/detalhes/filme");
    expect(await screen.findByText(/Detalhes do Filme/i)).toBeInTheDocument();
  });
});
