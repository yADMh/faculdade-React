import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./DetalhesAutor.module.css";

const DetalhesAutor = () => {
  const { state } = useLocation();
  const autor = state?.person;
  const [detalhes, setarDetalhes] = useState(null);
  const [loading, setarLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (autor) {
      const ProcuraDetalhes = async () => {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${autor.id}?api_key=367732d8cdda39a73d06fc92dc373669&language=pt-BR`
        );
        const data = await response.json();
        setarDetalhes(data);
        setarLoading(false);
      };
      ProcuraDetalhes();
    }
  }, [autor]);

  if (loading) {
    return <div>Carregando detalhes do autor...</div>;
  }

  if (!detalhes) {
    return <div>Detalhes não encontrados.</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{detalhes.name}</h1>
      <div className={styles.imageContainer}>
        {detalhes.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500/${detalhes.profile_path}`}
            alt={detalhes.name}
          />
        ) : (
          <div>Imagem não disponível</div>
        )}
      </div>
      <p className={styles.text}>
        <strong>Biografia:</strong>{" "}
        {detalhes.biography || "Biografia não disponível."}
      </p>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        Voltar
      </button>
    </div>
  );
};

export default DetalhesAutor;
