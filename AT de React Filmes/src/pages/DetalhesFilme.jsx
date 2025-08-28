import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { supabase } from "../utils/supabaseClient";
import styles from "./DetalhesFilme.module.css";

const DetalhesFilme = () => {
  const location = useLocation();
  const { filme } = location.state || {};
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [eFavorito, setarEfavorito] = useState(false);

  if (!filme) {
    return <div>Filme não encontrado!</div>;
  }

  const favoritar = async () => {
    if (!user) {
      alert("Você precisa estar logado para favoritar filmes.");
      navigate("/login");
      return;
    }

    try {
      const { data, error } = await supabase.from("favorites").insert([
        {
          user_id: user.id,
          movie_id: filme.id,
          type: "movie",
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        throw new Error(error.message);
      }

      console.log("Filme favoritado com sucesso!", data);
      setarEfavorito(true);
    } catch (error) {
      console.error("Erro ao favoritar o filme:", error);
    }
  };

  const removerFavorito = async () => {
    if (!user || !filme.id) return;

    try {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("movie_id", filme.id)
        .eq("type", "movie");

      if (error) {
        throw new Error(error.message);
      }

      console.log("Filme removido dos favoritos com sucesso!");
      setarEfavorito(false);
    } catch (error) {
      console.error("Erro ao remover o filme dos favoritos:", error);
    }
  };

  const checarFavorito = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id)
        .eq("movie_id", filme.id)
        .eq("type", "movie");

      if (error) {
        throw new Error(error.message);
      }

      if (data.length > 0) {
        setarEfavorito(true);
      }
    } catch (error) {
      console.error("Erro ao verificar se o filme está favoritado:", error);
    }
  };

  useEffect(() => {
    checarFavorito();
  }, [user, filme.id]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{filme.title}</h1>
      <div className={styles.imageContainer}>
        <img
          src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
          alt={filme.title}
        />
      </div>
      <p className={styles.text}>{filme.overview}</p>
      <p className={styles.releaseDate}>
        Data de lançamento: {filme.release_date}
      </p>

      <button
        onClick={eFavorito ? removerFavorito : favoritar}
        className={styles.favoriteButton}
      >
        {eFavorito ? "Remover dos Favoritos" : "Favoritar Filme"}
      </button>

      <button onClick={() => navigate(-1)} className={styles.backButton}>
        Voltar
      </button>
    </div>
  );
};

export default DetalhesFilme;
