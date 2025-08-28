import React, { useEffect, useState } from "react";
import Rodape from "../components/Rodape";
import { Link } from "react-router-dom";
import styles from "./Filmes.module.css";

const Filmes = () => {
  const [filmes, setarFilmes] = useState([]);
  const [loading, setarLoading] = useState(true);
  const [paginaAtual, setarPaginaAtual] = useState(1);
  const [totalPaginas, setarTotalPaginas] = useState(1);

  useEffect(() => {
    const procuraFilmes = async () => {
      const resposta = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=367732d8cdda39a73d06fc92dc373669&page=${paginaAtual}`
      );
      const data = await resposta.json();
      setarFilmes(data.results);
      setarTotalPaginas(data.total_pages);
      setarLoading(false);
    };
    procuraFilmes();
  }, [paginaAtual]);

  if (loading) {
    return <div>Carregando filmes...</div>;
  }

  const carregarMaisFilmes = () => {
    if (paginaAtual < totalPaginas) {
      setarPaginaAtual(paginaAtual + 1);
    }
  };

  const voltarParaFilmesAnteriores = () => {
    if (paginaAtual > 1) {
      setarPaginaAtual(paginaAtual - 1);
    }
  };

  return (
    <div>
      <h1>Filmes Populares</h1>

      <div className={styles.gridContainer}>
        {filmes.map((filme) => (
          <div key={filme.id} className={styles.filmeItem}>
            <Link to="/detalhes/filme" state={{ filme }}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`}
                alt={filme.title}
                className={styles.imagemFilme}
              />
              <p>{filme.title}</p>
            </Link>
          </div>
        ))}
      </div>

      <div className={styles.navFilmes}>
        <button
          onClick={voltarParaFilmesAnteriores}
          disabled={paginaAtual === 1}
          className={styles.setaNav}
        >
          &#8592; Voltar
        </button>
        <button
          onClick={carregarMaisFilmes}
          disabled={paginaAtual === totalPaginas}
          className={styles.setaNav}
        >
          Ver Mais &#8594;
        </button>
      </div>

      <Rodape />
    </div>
  );
};

export default Filmes;
