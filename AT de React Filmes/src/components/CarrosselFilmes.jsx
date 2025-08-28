import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import styles from "./CarrosselFilmes.module.css";

const CarrosselFilmes = () => {
  const [Filmes, SetarFilmes] = useState([]);
  const [Slides, SetarSlides] = useState(1);

  useEffect(() => {
    const procuraFilme = async () => {
      const resposta = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=367732d8cdda39a73d06fc92dc373669`
      );
      const data = await resposta.json();
      SetarFilmes(data.results);
    };
    procuraFilme();
  }, []);

  const PegarSlide = () => {
    const width = window.innerWidth;
    if (width >= 900) return 4;
    if (width >= 600) return 3;
    return 2;
  };

  useEffect(() => {
    const Ajustar = () => {
      SetarSlides(PegarSlide());
    };

    window.addEventListener("resize", Ajustar);
    Ajustar();
    return () => window.removeEventListener("resize", Ajustar);
  }, []);

  const Configs = {
    dots: true,
    infinite: true,
    speed: 1100,
    slidesToShow: Slides,
    slidesToScroll: 3,
  };

  return (
    <div className={styles.carrosselContainer}>
      <Slider {...Configs}>
        {Filmes.map((filme) => (
          <div key={filme.id} className={styles.carrosselItem}>
            <div className={styles.imageContainer}>
              <Link to="/detalhes/filme" state={{ filme }}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                  alt={filme.title}
                />
                <div className={styles.titleOverlay}>
                  <h3>{filme.title}</h3>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarrosselFilmes;
