import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Autores from "../pages/Autores";

jest.mock("../components/Rodape", () => () => <div>Rodapé Mock</div>);

const mockAtores = {
  results: [
    { id: 1, name: "Ator 1", profile_path: "path/to/image1.jpg" },
    { id: 2, name: "Ator 2", profile_path: "path/to/image2.jpg" },
  ],
  total_pages: 3,
};

describe("Autores Page", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockAtores),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test("exibe texto de carregamento inicialmente", () => {
    render(
      <BrowserRouter>
        <Autores />
      </BrowserRouter>
    );
    expect(screen.getByText(/Carregando atores/i)).toBeInTheDocument();
  });

  test("renderiza a lista de atores após o carregamento", async () => {
    render(
      <BrowserRouter>
        <Autores />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText("Ator 1")).toBeInTheDocument());

    expect(screen.getByText("Ator 1")).toBeInTheDocument();
    expect(screen.getByText("Ator 2")).toBeInTheDocument();

    expect(screen.getByAltText("Ator 1")).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/path/to/image1.jpg"
    );
    expect(screen.getByAltText("Ator 2")).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/path/to/image2.jpg"
    );
  });

  test("habilita/desabilita botões de navegação corretamente", async () => {
    render(
      <BrowserRouter>
        <Autores />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText("Ator 1")).toBeInTheDocument());

    const voltarButton = screen.getByText(/voltar/i);
    const verMaisButton = screen.getByText(/ver mais/i);

    expect(voltarButton).toBeDisabled();
    expect(verMaisButton).not.toBeDisabled();

    fireEvent.click(verMaisButton);

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining("page=2"))
    );

    expect(voltarButton).not.toBeDisabled();
  });

  test("exibe mensagem de erro ao falhar ao carregar os dados", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Erro ao buscar dados"))
    );

    render(
      <BrowserRouter>
        <Autores />
      </BrowserRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/Erro ao carregar os dados/i)).toBeInTheDocument()
    );
  });

  test("navega para a próxima página ao clicar em 'Ver Mais'", async () => {
    render(
      <BrowserRouter>
        <Autores />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText("Ator 1")).toBeInTheDocument());

    const verMaisButton = screen.getByText(/ver mais/i);
    fireEvent.click(verMaisButton);

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining("page=2"))
    );
  });
});
