import CoffeeIcon from "@mui/icons-material/Coffee";
import BathtubIcon from "@mui/icons-material/Bathtub";
import ModeNightIcon from '@mui/icons-material/ModeNight';

const ACTIONS = [
  {
    title: "sleep",
    actionType: 1,
    Icon: ModeNightIcon,
    color: "#FF7F50",
  },
  {
    title: "eat",
    actionType: 2,
    Icon: CoffeeIcon,
    color: "#00FFFF",
  },
  {
    title: "diaper",
    actionType: 3,
    Icon: BathtubIcon,
    color: "#FF69B4",
  },
];

export { ACTIONS };
