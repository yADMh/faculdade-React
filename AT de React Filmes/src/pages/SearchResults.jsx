import React from "react";
import { useLocation, Link } from "react-router-dom";
import styles from "./SearchResults.module.css";
import Rodape from "../components/Rodape";

const SearchResults = () => {
  const location = useLocation();
  const { results } = location.state || { results: [] };

  return (
    <div>
      <h1>Resultados da Pesquisa</h1>

      {results.length > 0 ? (
        <div className={styles.gridContainer}>
          {results.map((item) => (
            <div key={item.id} className={styles.resultItem}>
              <Link to="/detalhes/filme" state={{ filme: item }}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                  className={styles.resultImage}
                />
                <p>{item.title || item.name}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noResults}>Nenhum resultado encontrado.</p>
      )}
      <Rodape />
    </div>
  );
};

export default SearchResults;
