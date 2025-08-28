import React, { useEffect, useState } from "react";
import Rodape from "../components/Rodape";
import { Link } from "react-router-dom";
import styles from "./Lancamentos.module.css";

const Lancamentos = () => {
  const [lancamentos, setarLancamentos] = useState([]);
  const [loading, setarLoading] = useState(true);
  const [paginaAtual, setarPaginaAtual] = useState(1);
  const [totalPaginas, setarTotalPaginas] = useState(1);

  useEffect(() => {
    const proucuraLancamentos = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=367732d8cdda39a73d06fc92dc373669&page=${paginaAtual}`
      );
      const data = await response.json();
      setarLancamentos(data.results);
      setarTotalPaginas(data.total_pages);
      setarLoading(false);
    };

    proucuraLancamentos();
  }, [paginaAtual]);

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

  if (loading) {
    return <div>Carregando lançamentos...</div>;
  }

  return (
    <div>
      <h1>Lançamentos</h1>

      <div className={styles.gridContainer}>
        {lancamentos.map((filme) => (
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

export default Lancamentos;
