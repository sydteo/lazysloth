import { Box, Button } from "@mui/material";
import React, { useState } from "react";

import colours from "../../UI/colours";
import { Header1, Header2 } from "../../UI/text";

import eat from "../../assets/eat.PNG";
import sleep from "../../assets/sleep.PNG";

const HomePage = () => {
  const [isToggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!isToggle);
  };

  return (
    <Box
      sx={{
        bgcolor: colours.green,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Header1 text="Welcome to Lazy Sloth" />
      <img
        src={isToggle ? sleep : eat}
        alt="Logo"
        style={{ height: "50%", paddingX: "20px", objectFit: "contain" }}
      />
      <Button
        variant="contained"
        sx={{
          bgcolor: colours.pink,
          borderRadius: "30px",
          color: colours.black,
          border: "2px solid #000",
          paddingX: "20px",
          marginTop: "20px",
        }}
        onClick={handleToggle}
      >
        <Header2 text={isToggle ? "Feed" : "Sleep"} />
      </Button>
    </Box>
  );
};

export default HomePage;
