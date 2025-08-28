import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cabecalho from "./components/Cabecalho";
import Lancamentos from "./pages/Lancamentos";
import Filmes from "./pages/Filmes";
import Series from "./pages/Series";
import Autores from "./pages/Autores";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import DetalhesFilme from "./pages/DetalhesFilme";
import DetalhesSerie from "./pages/DetalhesSerie";
import DetalhesAutor from "./pages/DetalhesAutor";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import UserPage from "./pages/UserPage";

const App = () => {
  return (
    <Router>
      <Cabecalho />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lancamentos" element={<Lancamentos />} />
        <Route path="/filmes" element={<Filmes />} />
        <Route path="/series" element={<Series />} />
        <Route path="/autores" element={<Autores />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/detalhes/filme" element={<DetalhesFilme />} />
        <Route path="/detalhes/serie" element={<DetalhesSerie />} />
        <Route path="/detalhes/autor" element={<DetalhesAutor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/usuario" element={<UserPage />} />
      </Routes>
    </Router>
  );
};

export default App;
