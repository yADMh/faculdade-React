import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom"; 
import styles from "./CarrosselSeries.module.css";

const CarrosselSeries = () => {
  const [series, SetarSeries] = useState([]);
  const [Slides, SetarSlide] = useState(1);

  useEffect(() => {
    const fetchSeries = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=367732d8cdda39a73d06fc92dc373669`
      );
      const data = await response.json();
      SetarSeries(data.results);
    };
    fetchSeries();
  }, []);

  const PegarSlide = () => {
    const width = window.innerWidth;
    if (width >= 900) return 4;
    if (width >= 600) return 3;
    return 2;
  };

  useEffect(() => {
    const Ajustar = () => {
      SetarSlide(PegarSlide());
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
        {series.map((serie) => (
          <div key={serie.id} className={styles.carrosselItem}>
            <div className={styles.imageContainer}>
              <Link
                to="/detalhes/serie" 
                state={{ serie }} 
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                  alt={serie.name}
                />
                <div className={styles.titleOverlay}>
                  <h3>{serie.name}</h3>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarrosselSeries;
