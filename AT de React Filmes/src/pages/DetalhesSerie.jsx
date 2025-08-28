import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { AuthContext } from "../AuthContext";
import styles from "./DetalhesSerie.module.css";

const DetalhesSerie = () => {
  const { state } = useLocation();
  const [serie, setarSerie] = useState(state?.serie || {});
  const [loading, setarLoading] = useState(true);
  const [eFavorito, setarFavorito] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!serie.id) return;

    const procuraDetalhes = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${serie.id}?api_key=367732d8cdda39a73d06fc92dc373669`
      );
      const data = await response.json();
      setarSerie(data);
      setarLoading(false);
    };

    procuraDetalhes();
  }, [serie.id]);

  useEffect(() => {
    const verificarFavoritos = async () => {
      if (!user || !serie.id) return;
      const { data, error } = await supabase
        .from("favorites")
        .select("movie_id")
        .eq("user_id", user.id)
        .eq("movie_id", serie.id)
        .eq("type", "tv");
      if (error) {
        console.error("Erro ao verificar favoritos:", error);
        return;
      }
      setarFavorito(data.length > 0);
    };

    verificarFavoritos();
  }, [user, serie.id]);

  const favoritar = async () => {
    if (!user || !serie.id) return;

    const { error } = await supabase.from("favorites").upsert([
      {
        user_id: user.id,
        movie_id: serie.id,
        type: "tv",
        created_at: new Date(),
      },
    ]);
    if (error) {
      console.error("Erro ao adicionar aos favoritos:", error);
    } else {
      setarFavorito(true);
    }
  };

  const removerFavorito = async () => {
    if (!user || !serie.id) return;

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("movie_id", serie.id)
      .eq("type", "tv");
    if (error) {
      console.error("Erro ao remover dos favoritos:", error);
    } else {
      setarFavorito(false);
    }
  };

  if (loading) return <div>Carregando detalhes...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{serie.name}</h1>

      {serie.poster_path && (
        <div className={styles.imageContainer}>
          <img
            src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
            alt={serie.name}
          />
        </div>
      )}

      <div className={styles.text}>
        <p>
          <strong>Sinopse:</strong>{" "}
          {serie.overview || "Sinopse não disponível."}
        </p>
        <p>
          <strong>Lançamento:</strong> {serie.first_air_date}
        </p>
        <p>
          <strong>Nota:</strong> {serie.vote_average}
        </p>
        <p>
          <strong>Gêneros:</strong>{" "}
          {serie.genres?.map((genre) => genre.name).join(", ")}
        </p>
        <p>
          <strong>Status:</strong> {serie.status}
        </p>
      </div>

      <button
        onClick={eFavorito ? removerFavorito : favoritar}
        className={styles.favoriteButton}
      >
        {eFavorito ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
      </button>

      <button onClick={() => navigate(-1)} className={styles.backButton}>
        Voltar
      </button>
    </div>
  );
};

export default DetalhesSerie;
