import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { supabase } from "../utils/supabaseClient";
import styles from "./UserPage.module.css";

const UserPage = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [moviesData, setMoviesData] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const userId = user.id;

    const fetchUserData = async () => {
      try {
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("id, email, name, password")
          .eq("id", userId);

        if (userError) {
          throw new Error(userError.message);
        }

        setUserData(userData[0]);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    const fetchFavorites = async () => {
      try {
        const { data: favoritesData, error: favoritesError } = await supabase
          .from("favorites")
          .select("movie_id, type, created_at")
          .eq("user_id", userId);

        if (favoritesError) {
          throw new Error(favoritesError.message);
        }

        setFavorites(favoritesData);
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
      }
    };

    fetchUserData();
    fetchFavorites();
  }, [user, navigate]);

  useEffect(() => {
    if (favorites.length === 0) return;

    const fetchDetails = async () => {
      try {
        const movieIds = favorites
          .filter((favorite) => favorite.type === "movie")
          .map((favorite) => favorite.movie_id);
        const seriesIds = favorites
          .filter((favorite) => favorite.type === "tv")
          .map((favorite) => favorite.movie_id);

        const moviePromises = movieIds.map(async (movieId) => {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=367732d8cdda39a73d06fc92dc373669`
          );
          return res.json();
        });
        const fetchedMovies = await Promise.all(moviePromises);
        setMoviesData(fetchedMovies);

        const seriesPromises = seriesIds.map(async (tvId) => {
          const res = await fetch(
            `https://api.themoviedb.org/3/tv/${tvId}?api_key=367732d8cdda39a73d06fc92dc373669`
          );
          return res.json();
        });
        const fetchedSeries = await Promise.all(seriesPromises);
        setSeriesData(fetchedSeries);
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
      }
    };

    fetchDetails();
  }, [favorites]);

  if (!userData) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.userPage}>
      <h2>Bem-vindo, {userData.name}</h2>
      <div className={styles.userInfo}>
        <p>Email: {userData.email}</p>
        <p>ID: {userData.id}</p>
        <p>Senha: {userData.password}</p>
      </div>

      <div className={styles.favorites}>
        <h3>Favoritos de Filmes</h3>
        {moviesData.length > 0 ? (
          <div className={styles.favoriteCards}>
            {moviesData.map((movie, index) => (
              <Link
                key={index}
                to={`/detalhes/filme`}
                state={{ filme: movie }}
                className={styles.favoriteCard}
              >
                <h4>{movie.title}</h4>
                <p>
                  Adicionado em:{" "}
                  {new Date(
                    favorites.find(
                      (fav) => fav.movie_id === movie.id
                    )?.created_at
                  ).toLocaleDateString()}
                </p>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.movieImage}
                />
              </Link>
            ))}
          </div>
        ) : (
          <p>Você ainda não tem filmes favoritos.</p>
        )}

        <h3>Favoritos de Séries</h3>
        {seriesData.length > 0 ? (
          <div className={styles.favoriteCards}>
            {seriesData.map((serie, index) => (
              <Link
                key={index}
                to={`/detalhes/serie`}
                state={{ serie: serie }}
                className={styles.favoriteCard}
              >
                <h4>{serie.name}</h4>
                <p>
                  Adicionado em:{" "}
                  {new Date(
                    favorites.find(
                      (fav) => fav.movie_id === serie.id
                    )?.created_at
                  ).toLocaleDateString()}
                </p>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`}
                  alt={serie.name}
                  className={styles.movieImage}
                />
              </Link>
            ))}
          </div>
        ) : (
          <p>Você ainda não tem séries favoritas.</p>
        )}
      </div>
    </div>
  );
};

export default UserPage;
