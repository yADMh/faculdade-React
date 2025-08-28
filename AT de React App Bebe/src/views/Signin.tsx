import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "../components";
import { useAppContext } from "../Context";
import logo from "../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleChange } from "../utils/core";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { showSnackMessage, translate } = useAppContext();
  const [data, setData] = useState({
    email: {
      value: "",
      error: null,
      helperText: null,
    },
    password: {
      value: "",
      error: null,
      helperText: null,
    },
  });

  const fakeEmail = "ademir@outlook.com";
  const fakePassword = "123456";

  const verifyLogin = () => {
    if (
      data.email.value === fakeEmail &&
      data.password.value === fakePassword
    ) {
      localStorage.setItem("session", JSON.stringify({ token: "fakeToken" }));
      localStorage.setItem(
        "user",
        JSON.stringify({ name: "Fake User", email: fakeEmail })
      );
      navigate("/");
    } else {
      showSnackMessage("Dados de usuário inválidos");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        paddingTop: 8,
      }}
    >
      <Grid sx={styles.boxAdjustment} container={true}>
        <Grid sx={styles.centerBox} item={true} size={{ xs: 12 }}>
          <Avatar sx={{ width: 180, height: 180 }} src={logo} />
        </Grid>
        <Grid
          sx={{
            ...styles.centerBox,
            ...styles.marginTop,
          }}
          item={true}
          size={{ xs: 12 }}
        >
          <Typography variant="h3">Login</Typography>
        </Grid>
        <Grid sx={styles.centerBox} item={true} size={{ xs: 12 }}>
          <Typography variant="h5">{translate("welcome")}</Typography>
        </Grid>
        <Grid sx={styles.marginTop} item={true} size={{ xs: 12 }}>
          <TextField
            label="E-mail"
            fullWidth={true}
            onChange={(event) =>
              handleChange(data, setData, event.target.value, "email")
            }
            value={data.email.value}
          />
        </Grid>
        <Grid sx={styles.marginTop} item={true} size={{ xs: 12 }}>
          <TextField
            label="Senha"
            fullWidth={true}
            onChange={(event) =>
              handleChange(data, setData, event.target.value, "password")
            }
            type="password"
            value={data.password.value}
          />
        </Grid>
        <Grid
          sx={{
            ...styles.centerBox,
            ...styles.marginTop,
          }}
          item={true}
          size={{ xs: 12 }}
        >
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              color: "black",
              transition: "color 0.3s ease",
            }}
          >
            Cadastrar
          </Link>
        </Grid>
        <Grid sx={styles.marginTop} item={true} size={{ xs: 12 }}>
          <Button fullWidth={true} onClick={verifyLogin}>
            Entrar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const styles = {
  centerBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  boxAdjustment: {
    padding: 2,
  },
  marginTop: {
    marginTop: 4,
  },
};

export default SignIn;
