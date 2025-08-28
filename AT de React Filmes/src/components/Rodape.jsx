import styles from "./Rodape.module.css";

const Rodape = () => {
  return (
    <footer className={styles.footer}>
      <p>Contato: ademirdeljr@outlook.com</p>
      <p>Telefone: (19) 999370243</p>
      <p>
        <a
          className={styles.link}
          href="https://www.linkedin.com/in/ademir-de-lucca-junior"
        >
          LinkedIn
        </a>
      </p>
    </footer>
  );
};

export default Rodape;
