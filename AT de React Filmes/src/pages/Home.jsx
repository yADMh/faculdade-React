import React from "react";
import Rodape from "../components/Rodape";
import CarrosselFilmes from "../components/CarrosselFilmes";
import CarrosselSeries from "../components/CarrosselSeries";

const Home = () => {
  return (
    <div>
      <main>
        <h2>Filmes Populares</h2>
        <CarrosselFilmes />
        <h2>Séries Populares</h2>
        <CarrosselSeries />
      </main>
      <Rodape />
    </div>
  );
};

export default Home;
