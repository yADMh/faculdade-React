import { createContext, useContext, useEffect, useState } from "react";
import { Alert, Grid, Snackbar } from "./components";
import { useTranslation } from "react-i18next";
import { createClient } from "@supabase/supabase-js";
import { ThemeProvider, useMediaQuery } from "@mui/material";
import { darkTheme, lightTheme } from "./theme";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

const AppContext = createContext(null);

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const AppProvider = ({ children }) => {
  const { t: translate, i18n } = useTranslation();
  const timeoutDuration = 6000;

  const [snackOpen, setSnackOpen] = useState(() => {
    const savedSnackState = localStorage.getItem("snackOpen");
    return savedSnackState ? JSON.parse(savedSnackState) : false;
  });

  const [snackMessage, setSnackMessage] = useState(() => {
    const savedSnackMessage = localStorage.getItem("snackMessage");
    return savedSnackMessage || "";
  });

  const [alertMessage, setAlertMessage] = useState(() => {
    const savedAlertMessage = localStorage.getItem("alertMessage");
    return savedAlertMessage || "";
  });

  const [alertSeverity, setAlertSeverity] = useState(() => {
    const savedAlertSeverity = localStorage.getItem("alertSeverity");
    return savedAlertSeverity || "";
  });

  const [alertVariant, setAlertVariant] = useState(() => {
    const savedAlertVariant = localStorage.getItem("alertVariant");
    return savedAlertVariant || null;
  });

  const [userSettings, setUserSettings] = useState(() => {
    const savedSettings = localStorage.getItem("userSettings");
    return savedSettings ? JSON.parse(savedSettings) : { theme: "light" };
  });

  const isDarkMode = userSettings.theme === "dark";

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const showSnackMessage = (message) => {
    setSnackMessage(message);
    setSnackOpen(true);
    localStorage.setItem("snackMessage", message);
    localStorage.setItem("snackOpen", JSON.stringify(true));
  };

  const showAlertMessage = (message, severity, variant) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertVariant(variant);
    localStorage.setItem("alertMessage", message);
    localStorage.setItem("alertSeverity", severity);
    localStorage.setItem("alertVariant", variant);

    setTimeout(() => {
      setAlertMessage("");
      localStorage.removeItem("alertMessage");
    }, timeoutDuration);
  };

  const handleClose = () => {
    setSnackMessage("");
    setSnackOpen(false);
    localStorage.setItem("snackOpen", JSON.stringify(false));
  };

  const handleThemeChange = (newTheme) => {
    setUserSettings((prevSettings) => {
      const updatedSettings = { ...prevSettings, theme: newTheme };
      localStorage.setItem("userSettings", JSON.stringify(updatedSettings));
      return updatedSettings;
    });
  };

  const sharedState = {
    changeLanguage,
    showSnackMessage,
    showAlertMessage,
    translate,
    supabase,
    userSettings,
    handleThemeChange,
  };

  useEffect(() => {
    const storeLanguage = localStorage.getItem("language");
    if (storeLanguage) {
      changeLanguage(storeLanguage);
    } else {
      const navLang = navigator.language.split("-")[0];
      changeLanguage(navLang);
    }
  }, []);

  return (
    <div className="app-background">
      <AppContext.Provider value={sharedState}>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          {children}
          <Snackbar
            autoHideDuration={timeoutDuration}
            onClose={handleClose}
            open={snackOpen}
            message={snackMessage}
          />
          {alertMessage && (
            <Grid
              container
              sx={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                padding: 2,
              }}
            >
              <Grid item xs={12}>
                <Alert variant={alertVariant} severity={alertSeverity}>
                  {alertMessage}
                </Alert>
              </Grid>
            </Grid>
          )}
        </ThemeProvider>
      </AppContext.Provider>
    </div>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export default AppProvider;
