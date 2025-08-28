import React, { createContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      console.log("Usuário autenticado:", data.user);

      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      console.log("Sessão recuperada:", sessionData.session);

      setUser(sessionData.session?.user);
      await fetchFavorites(sessionData.session?.user.id);
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setFavorites([]);
    } catch (error) {
      console.error("Erro ao sair:", error.message);
      throw error;
    }
  };

  const fetchFavorites = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("favorites")
        .select("movie_id")
        .eq("user_id", userId);
      if (error) throw error;
      setFavorites(data.map((fav) => fav.movie_id));
    } catch (error) {
      console.error("Erro ao buscar favoritos:", error.message);
      throw error;
    }
  };

  const addFavorite = async (movie) => {
    if (!user) {
      console.error("Usuário não autenticado.");
      return;
    }

    if (favorites.includes(movie.id)) {
      console.warn("Filme já está nos favoritos.");
      return;
    }

    try {
      const { error } = await supabase.from("favorites").insert({
        user_id: user.id,
        movie_id: movie.id,
      });
      if (error) throw error;
      setFavorites((prev) => [...prev, movie.id]);
    } catch (error) {
      console.error("Erro ao adicionar favorito:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session?.user) {
          setUser(data.session.user);
          await fetchFavorites(data.session.user.id);
        }
      } catch (error) {
        console.error("Erro ao recuperar sessão:", error.message);
      }
    };

    fetchSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        favorites,
        addFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
