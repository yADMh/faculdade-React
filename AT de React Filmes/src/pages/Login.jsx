import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setarEmail] = useState("");
  const [password, setarPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { signIn, resendEmailConfirmation } = useContext(AuthContext);

  const Logar = async () => {
    try {
      await signIn(email, password);
      navigate("/usuario");
    } catch (error) {
      if (error.message === "Email not confirmed") {
        setError(
          "Por favor, confirme seu e-mail. Verifique sua caixa de entrada."
        );
        resendEmailConfirmation(email);
      } else {
        setError("Erro ao fazer login. Tente novamente.");
      }
    }
  };

  const voltar = () => {
    navigate("/");
  };

  const irParaCadastro = () => {
    navigate("/cadastro");
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form onSubmit={(e) => e.preventDefault()} className={styles.loginForm}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setarEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setarPassword(e.target.value)}
          required
        />
        <button type="button" onClick={Logar} className={styles.loginButton}>
          Entrar
        </button>
      </form>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <div className={styles.actions}>
        <button onClick={voltar} className={styles.backButton}>
          Voltar
        </button>
        <button onClick={irParaCadastro} className={styles.signupButton}>
          Criar Conta
        </button>
      </div>
    </div>
  );
};

export default Login;
