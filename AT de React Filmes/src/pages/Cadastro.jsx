import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Cadastro.module.css";
import { supabase } from "../utils/supabaseClient";

const Cadastro = () => {
  const [nome, setarNome] = useState("");
  const [email, setarEmail] = useState("");
  const [password, setarPassword] = useState("");
  const navigate = useNavigate();

  const logar = async () => {
    try {
      const { user, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      const { error: dbError } = await supabase.from("users").insert([
        {
          name: nome,
          email: email,
          password: password,
        },
      ]);

      if (dbError) throw dbError;

      console.log("Cadastro realizado com sucesso!", user);
      navigate("/login");
    } catch (error) {
      console.error("Erro ao cadastrar: ", error.message);
    }
  };

  const voltarPagina = () => {
    navigate("/login");
  };

  return (
    <div className={styles.cadastroContainer}>
      <h2>Criar Conta</h2>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={styles.cadastroForm}
      >
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setarNome(e.target.value)}
          required
        />

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

        <button type="button" onClick={logar} className={styles.cadastroButton}>
          Criar Conta
        </button>
      </form>

      <div className={styles.actions}>
        <button onClick={voltarPagina} className={styles.backButton}>
          Voltar para o Login
        </button>
      </div>
    </div>
  );
};

export default Cadastro;
