import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <IconButton
        sx={{
          position: "absolute",
          top: "20px",
          left: "20px",
          backgroundColor: "white",
          borderRadius: "50%",
        }}
        onClick={() => navigate("/")}
      >
        <HomeIcon />
      </IconButton>
      <h1
        style={{
          marginTop: "70px",
          textAlign: "center",
        }}
      >
        Dashboard
      </h1>

      <div></div>
    </div>
  );
};

export default Dashboard;
