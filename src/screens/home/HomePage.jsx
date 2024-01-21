import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import useSound from "use-sound";
import colours from "../../UI/colours";
import { Header1, Header5 } from "../../UI/text";

import eat from "../../assets/eat.PNG";
import sleep from "../../assets/sleep.PNG";

import munchSound from "../../assets/sounds/munchFinal.wav";
import snoreSound from "../../assets/sounds/snoreFinal.wav";

const HomePage = () => {
  const [isToggle, setToggle] = useState(false);

  const [munch, munchStop] = useSound(munchSound, {
    interrupt: false,
  });
  const [snore, snoreStop] = useSound(snoreSound, {
    interrupt: false,
  });

  const handleToggle = () => {
    if (isToggle) {
      snoreStop.stop();
      munch();
    } else {
      munchStop.stop();
      snore();
    }
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
          position: "sticky",
          bottom: "12%",
          bgcolor: colours.pink,
          borderRadius: "30px",
          color: colours.black,
          border: "2px solid #000",
          paddingX: "20px",
          marginTop: "20px",
          marginBottom: "56px",
        }}
        onClick={handleToggle}
      >
        <Header5 text={isToggle ? "Munch" : "Snooze"} />
      </Button>
    </Box>
  );
};

export default HomePage;
