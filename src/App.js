import "./App.css";
import HomePage from "./screens/home/HomePage";
import GamePage from "./screens/game/GamePage";
import { ThemeProvider } from "@emotion/react";
import theme from "./UI/theme";
import QuotePage from "./screens/quote/QuotePage";
import BottomNav from "./screens/bottomnav/BottomNav";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import useSound from "use-sound";
import background from "./assets/sounds/background.mp3";

function App() {
  const [backgroundSound] = useSound(background, {
    onEnd: () => backgroundSound(),
    volume: 0.5,
  });

  backgroundSound();
  return (
    <Box sx={{ height: "100vh" }}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/quotes" element={<QuotePage />} />
            <Route exact path="/games" element={<GamePage />} />
          </Routes>
          <BottomNav />
        </BrowserRouter>
      </ThemeProvider>
    </Box>
  );
}

export default App;
