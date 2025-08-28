import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Avatar,
  Box,
  Typography,
  CardNewItem,
  CustomList,
} from "../components";
import babyImage from "../assets/img/baby.png";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import SettingsIcon from "@mui/icons-material/Settings";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACTIONS } from "../constants/actions";
import { list } from "../services/database";
import { useAppContext } from "../Context";

const loadDataFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const loadDataFromService = () => {
  const data = list();
  console.log("Dados carregados: ", data);
  return data;
};

const Home: React.FC = () => {
  const { translate } = useAppContext();
  const navigate = useNavigate();
  const theme = useTheme();

  const [data, setData] = useState<any[]>([]);
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    setData(loadDataFromService());
    setProfileData(loadDataFromLocalStorage("profile_students"));
  }, []);

  const calculateDaysSinceBirth = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const timeDifference = today.getTime() - birth.getTime();
    const dayDifference = Math.floor(
      -1 * (timeDifference / (1000 * 3600 * 24))
    );
    return dayDifference;
  };

  const InfoSection = ({
    onClick,
    IconComponent,
    value,
    label,
    navigateTo,
  }: {
    onClick: () => void;
    IconComponent: React.ElementType;
    value: string;
    label: string;
    navigateTo: string;
  }) => (
    <Grid size={{ xs: 4 }}>
      <Box sx={styles.centerBox}>
        <IconButton
          sx={{
            ...styles.iconButton,
            border: `2px solid ${theme.palette.primary.main}`,
          }}
          onClick={() => navigate(navigateTo)}
        >
          <IconComponent
            sx={{ ...styles.icon, color: theme.palette.primary.main }}
          />
        </IconButton>
        <Box sx={{ ...styles.centerBox, ...styles.boxText }}>
          <Typography component="p" sx={styles.text2}>
            {value}
          </Typography>
          <Typography component="p" sx={styles.text3}>
            {label}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );

  return (
    <Grid container>
      <Grid size={{ xs: 12 }} sx={{ height: "30vh" }}>
        <Grid container sx={{ alignItems: "flex-end", marginTop: "1em" }}>
          <InfoSection
            onClick={() => navigate("/dashboard")}
            IconComponent={SignalCellularAltIcon}
            value={profileData ? profileData.height : "Anão"}
            label={translate("height")}
            navigateTo="/dashboard"
          />
          <Grid size={{ xs: 4 }}>
            <Box sx={styles.centerBox}>
              <Avatar sx={{ width: 90, height: 90 }} src={babyImage} />
              <Box sx={{ ...styles.centerBox, ...styles.boxText }}>
                <Typography component="p" sx={styles.text1}>
                  {profileData ? profileData.name : "Sem nome"}
                </Typography>
                <Typography component="p" sx={styles.text3}>
                  {profileData && profileData.birth
                    ? `${calculateDaysSinceBirth(
                        profileData.birth
                      )} ${translate("days")}`
                    : "x Dias"}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <InfoSection
            onClick={() => navigate("/settings")}
            IconComponent={SettingsIcon}
            value={profileData ? profileData.weight : "Vc não pesa uma grama"}
            label={translate("weight")}
            navigateTo="/settings"
          />
        </Grid>
      </Grid>

      <Grid
        item
        size={{ xs: 12 }}
        sx={{ backgroundColor: theme.palette.primary.main }}
      >
        <Grid container sx={{ marginTop: "-10px", padding: 2 }}>
          <Grid size={{ xs: 12 }} item>
            <Grid container spacing={2}>
              {ACTIONS.map((action) => (
                <Grid size={{ xs: 4 }} key={action.title}>
                  <CardNewItem
                    title={translate(action.title)}
                    Icon={action.Icon}
                    color={action.color}
                    actionType={action.actionType}
                  />
                </Grid>
              ))}
            </Grid>

            <Grid container sx={{ marginTop: "1em" }}>
              <Grid size={{ xs: 12 }}>
                {data && (
                  <CustomList
                    sx={{
                      overflow: "auto",
                    }}
                    items={data}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const styles = {
  centerBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: {
    height: "2.5em",
    width: "2.5em",
  },
  icon: {
    fontSize: "1.5em",
  },
  boxText: {
    marginTop: ".5em",
  },
  text1: {
    wordBreak: "break-all",
    fontSize: "1.2em",
    fontWeight: "500",
    fontFamily: '"Lato", sans-serif',
  },
  text2: {
    wordBreak: "break-all",
    fontSize: ".8em",
    fontWeight: "600",
    fontFamily: '"Lato", sans-serif',
  },
  text3: {
    wordBreak: "break-all",
    fontSize: ".8em",
    fontWeight: "400",
  },
};

export default Home;
