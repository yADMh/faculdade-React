import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rodape from "../components/Rodape";
import styles from "./Autores.module.css";

const Autores = () => {
  const [atores, setarAtores] = useState([]);
  const [loading, setarLoading] = useState(true);
  const [paginaAtual, setarPaginaAtual] = useState(1);
  const [totalPaginas, setarTotalPaginas] = useState(1);

  useEffect(() => {
    const procuraAtores = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=367732d8cdda39a73d06fc92dc373669&page=${paginaAtual}`
      );
      const data = await response.json();
      setarAtores(data.results);
      setarTotalPaginas(data.total_pages);
      setarLoading(false);
    };

    procuraAtores();
  }, [paginaAtual]);

  const carregarMaisAtores = () => {
    if (paginaAtual < totalPaginas) {
      setarPaginaAtual(paginaAtual + 1);
    }
  };

  const voltarParaAtoresAnteriores = () => {
    if (paginaAtual > 1) {
      setarPaginaAtual(paginaAtual - 1);
    }
  };

  if (loading) {
    return <div>Carregando atores...</div>;
  }

  return (
    <div>
      <h1>Atores e Diretores Populares</h1>

      <div className={styles.gridContainer}>
        {atores.map((ator) => (
          <div key={ator.id} className={styles.autorItem}>
            <Link to="/detalhes/autor" state={{ person: ator }}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${ator.profile_path}`}
                alt={ator.name}
                className={styles.imagemAutor}
              />
              <p>{ator.name}</p>
            </Link>
          </div>
        ))}
      </div>

      <div className={styles.navAutores}>
        <button
          onClick={voltarParaAtoresAnteriores}
          disabled={paginaAtual === 1}
          className={styles.setaNav}
        >
          &#8592; Voltar
        </button>
        <button
          onClick={carregarMaisAtores}
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

export default Autores;
