import React, { useEffect, useState } from "react";
import Rodape from "../components/Rodape";
import { Link } from "react-router-dom";
import styles from "./Series.module.css";

const Series = () => {
  const [series, setarSeries] = useState([]);
  const [loading, setarLoading] = useState(true);
  const [paginaAtual, setarPaginaAtual] = useState(1);
  const [totalPaginas, setarTotalPaginas] = useState(1);

  useEffect(() => {
    const procuraSerie = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=367732d8cdda39a73d06fc92dc373669&page=${paginaAtual}`
      );
      const data = await response.json();
      setarSeries(data.results);
      setarTotalPaginas(data.total_pages);
      setarLoading(false);
    };
    procuraSerie();
  }, [paginaAtual]);

  if (loading) {
    return <div>Carregando séries...</div>;
  }

  const carregarMaisSeries = () => {
    if (paginaAtual < totalPaginas) {
      setarPaginaAtual(paginaAtual + 1);
    }
  };

  const voltarParaSeriesAnteriores = () => {
    if (paginaAtual > 1) {
      setarPaginaAtual(paginaAtual - 1);
    }
  };

  return (
    <div>
      <h1>Séries Populares</h1>

      <div className={styles.gridContainer}>
        {series.map((serie) => (
          <div key={serie.id} className={styles.serieItem}>
            <Link to="/detalhes/serie" state={{ serie }}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`}
                alt={serie.name}
                className={styles.imagemSerie}
              />
              <p className={styles.textoSerie}>{serie.name}</p>
            </Link>
          </div>
        ))}
      </div>

      <div className={styles.navSeries}>
        <button
          onClick={voltarParaSeriesAnteriores}
          disabled={paginaAtual === 1}
          className={styles.setaNav}
        >
          &#8592; Voltar
        </button>
        <button
          onClick={carregarMaisSeries}
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

export default Series;
