import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import styles from "./Cabecalho.module.css";

const Cabecalho = () => {
  const [menuAberto, setarMenuAberto] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { user, signOut } = useContext(AuthContext);

  const colapsaMenu = () => {
    setarMenuAberto(!menuAberto);
  };

  const Procura = async () => {
    if (query.trim() === "") return;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=367732d8cdda39a73d06fc92dc373669&query=${query}`
    );
    const data = await response.json();
    navigate("/search", { state: { results: data.results } });
  };

  const irParaLogin = () => {
    navigate("/login");
  };

  const irParaPerfil = () => {
    navigate("/usuario");
  };

  const deslogar = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <h1>OlokoFilmes</h1>
        </Link>
      </div>

      <button className={styles.trocarMenu} onClick={colapsaMenu}>
        {menuAberto ? "Fechar" : "Menu"}
      </button>
      <nav
        className={`${styles.nav} ${
          menuAberto ? styles.navAberta : styles.navFechada
        }`}
      >
        <li>
          <Link to="/lancamentos">Lançamentos</Link>
        </li>
        <li>
          <Link to="/filmes">Filmes</Link>
        </li>
        <li>
          <Link to="/series">Séries</Link>
        </li>
        <li>
          <Link to="/autores">Autores</Link>
        </li>
      </nav>

      <nav className={styles.telaGrande}>
        <ul>
          <li>
            <Link to="/lancamentos">Lançamentos</Link>
          </li>
          <li>
            <Link to="/filmes">Filmes</Link>
          </li>
          <li>
            <Link to="/series">Séries</Link>
          </li>
          <li>
            <Link to="/autores">Autores</Link>
          </li>
        </ul>
      </nav>

      <div className={styles.acoes}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Pesquisar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="button" onClick={Procura}>
            Buscar
          </button>
        </div>

        {user ? (
          <button onClick={irParaPerfil}>Ir para o Perfil</button>
        ) : (
          <button onClick={irParaLogin}>Login</button>
        )}

        {user && <button onClick={deslogar}>Sair</button>}
      </div>
    </header>
  );
};

export default Cabecalho;
