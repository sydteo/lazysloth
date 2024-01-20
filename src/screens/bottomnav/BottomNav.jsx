import { FormatQuote, Home, SportsEsports } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import colours from "../../UI/colours";

const navigationData = [
  {
    label: "Home",
    value: "/home",
    to: "/home",
    icon: <Home />,
  },
  {
    label: "Quotes",
    value: "/quotes",
    to: "/quotes",
    icon: <FormatQuote />,
  },
  {
    label: "Games",
    value: "/games",
    to: "/games",
    icon: <SportsEsports />,
  },
];

const BottomNav = () => {
  const location = useLocation();
  const currentpath = location.pathname;
  const [path, setPath] = useState(currentpath);

  const handleChange = (event, newValue) => {
    setPath(newValue);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <BottomNavigation
        showLabels
        value={path}
        onChange={handleChange}
        sx={{
          bgcolor: colours.orange,
        }}
      >
        {navigationData.map((item, index) => (
          <BottomNavigationAction key={index} {...item} component={Link} />
        ))}
      </BottomNavigation>
    </Box>
  );
};

export default BottomNav;
