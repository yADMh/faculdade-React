import { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  DatePicker,
  Grid,
  TextField,
  Typography,
} from "../components";
import { useAppContext } from "../Context";
import { adjustDateTimeForTimezone } from "../utils/core";
import { handleInputChange } from "../utils/action";
import { signOut } from "../services/authentication";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { translate, changeLanguage, supabase } = useAppContext();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    height: "",
    weight: "",
    birth: null,
  });

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const saveData = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      setAlert({
        open: true,
        message: translate("dados salvos"),
        severity: "success",
      });
    } catch (error) {
      console.error("Erro ao salvar dados no localStorage", error);
      setAlert({
        open: true,
        message: translate("Erro ao salvar os dados"),
        severity: "error",
      });
    }
  };

  const loadData = (key) => {
    try {
      const savedData = localStorage.getItem(key);
      return savedData ? JSON.parse(savedData) : null;
    } catch (error) {
      console.error("Erro ao carregar dados do localStorage", error);
      return null;
    }
  };

  useEffect(() => {
    const savedData = loadData("profile_students");
    if (savedData) {
      setData(savedData);
    }
  }, []);

  const verifyLanguage = (language) => {
    const storeLanguage = localStorage.getItem("language");
    return storeLanguage === language ? "contained" : "outlined";
  };

  return (
    <>
      <AppBar title={translate("settings")} />
      <Grid
        container
        spacing={2}
        sx={{
          ...styles.boxAdjustment,
          ...styles.centerBox,
          overflowY: "auto",
        }}
      >
        <Grid sx={styles.marginTop} item xs={12}>
          <TextField
            placeholder={translate("name")}
            fullWidth
            onChange={(event) =>
              handleInputChange("name", event.target.value, data, setData)
            }
            value={data.name || ""}
          />
        </Grid>
        <Grid sx={styles.marginTop} item xs={12}>
          <TextField
            placeholder={translate("height")}
            fullWidth
            onChange={(event) =>
              handleInputChange("height", event.target.value, data, setData)
            }
            value={data.height || ""}
          />
        </Grid>
        <Grid sx={styles.marginTop} item xs={12}>
          <TextField
            placeholder={translate("weight")}
            fullWidth
            onChange={(event) =>
              handleInputChange("weight", event.target.value, data, setData)
            }
            value={data.weight || ""}
          />
        </Grid>
        <Grid sx={styles.marginTop} item xs={12}>
          <DatePicker
            value={data?.birth ? adjustDateTimeForTimezone(data?.birth) : null}
            placeholder={translate("birth")}
            name="birth"
            fullWidth
            ampm={false}
            format="DD/MM/YYYY"
            onChange={(value) => {
              handleInputChange(
                "birth",
                new Date(value.toString()),
                data,
                setData
              );
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => {
              saveData("profile_students", data);
            }}
            fullWidth
          >
            {translate("save")}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => signOut(supabase, navigate)}
            fullWidth
            color="error"
            sx={styles.button}
          >
            {translate("logout")}
          </Button>
        </Grid>
        <Grid sx={styles.marginTop} item xs={12}>
          <Typography variant="h5">{translate("app_language")}:</Typography>
        </Grid>
        <Grid container spacing={2} sx={{ justifyContent: "flex" }}>
          <Grid item xs={4}>
            <Button
              onClick={() => changeLanguage("en")}
              variant={verifyLanguage("en")}
              fullWidth
              sx={styles.button}
            >
              {translate("english")}
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              onClick={() => changeLanguage("es")}
              variant={verifyLanguage("es")}
              fullWidth
              sx={styles.button}
            >
              {translate("spanish")}
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              onClick={() => changeLanguage("pt")}
              variant={verifyLanguage("pt")}
              fullWidth
              sx={styles.button}
            >
              {translate("portugues")}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const styles = {
  centerBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  boxAdjustment: {
    padding: 2,
  },
  marginTop: {
    marginTop: 4,
  },
  button: {
    marginTop: 0,
  },
};

export default Settings;
