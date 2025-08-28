import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

import CoffeeIcon from "@mui/icons-material/Coffee";
import BathtubIcon from "@mui/icons-material/Bathtub";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import { generateSubtitle } from "../../utils/action";
import { useAppContext } from "../../Context";

const CustomList = ({ items, ...props }) => {
  const navigate = useNavigate();
  const { translate } = useAppContext();

  const getIcon = (typeAction) => {
    switch (typeAction) {
      case 1:
        return <ModeNightIcon />;
      case 2:
        return <CoffeeIcon />;
      case 3:
        return <BathtubIcon />;
      default:
        return <BathtubIcon />;
    }
  };

  const actionTypeListToInt = {
    1: "sleep",
    2: "eat",
    3: "diaper",
  };

  const typeColor = {
    1: "#FF7F50",
    2: "#00FFFF",
    3: "#FF69B4",
  };

  return (
    <List {...props}>
      {items.map((item, index) => {
        const typeStr = actionTypeListToInt[item.action_type];
        return (
          <ListItem
            sx={{
              backgroundColor: "#e7e7e7",
              borderRadius: "60px",
              marginTop: "1em",
            }}
            id={`new-item-list-${index}`}
            onClick={() => navigate(`/${item.action_type}/${item.id}`)}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: typeColor[item.action_type] }}>
                {getIcon(item.action_type)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={translate(typeStr)}
              secondary={generateSubtitle(item, translate)}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default CustomList;
