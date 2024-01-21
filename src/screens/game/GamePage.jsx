import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import "./Card.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";
import colours from "../../UI/colours";
import { Header1, Header5 } from "../../UI/text";
import heart from "../../assets/heart.PNG";
import useSound from "use-sound";
import yay from "../../assets/sounds/yay.wav";
import wrong_sound from "../../assets/sounds/wrong_sound.wav";
import correct_sound from "../../assets/sounds/correct_sound.wav";
import bubble from "../../assets/sounds/bubble.wav";

const uniqueCardsArray = [
  {
    type: "bear",
    image: require(`../../assets/memoryGame/tinybear.png`),
  },
  {
    type: "raccoon",
    image: require(`../../assets/memoryGame/tinyracoon.png`),
  },
  {
    type: "fox",
    image: require(`../../assets/memoryGame/fox.png`),
  },
  {
    type: "lion",
    image: require(`../../assets/memoryGame/tinylion.png`),
  },
  {
    type: "panda",
    image: require(`../../assets/memoryGame/tinypanda.png`),
  },
  {
    type: "rabbit",
    image: require(`../../assets/memoryGame/tinyrabbit.png`),
  },
  {
    type: "reindeer",
    image: require(`../../assets/memoryGame/tinyreindeer.png`),
  },
  {
    type: "penguin",
    image: require(`../../assets/memoryGame/tinypenguin.png`),
  },
];

const duplicateAndShuffleCards = () => {
  const duplicatedCardsArray = [
    uniqueCardsArray[0],
    uniqueCardsArray[1],
    uniqueCardsArray[2],
    uniqueCardsArray[3],
    uniqueCardsArray[0],
    uniqueCardsArray[1],
    uniqueCardsArray[2],
    uniqueCardsArray[3],
    uniqueCardsArray[4],
    uniqueCardsArray[5],
    uniqueCardsArray[6],
    uniqueCardsArray[7],
    uniqueCardsArray[4],
    uniqueCardsArray[5],
    uniqueCardsArray[6],
    uniqueCardsArray[7],
  ];
  return shuffleArray(duplicatedCardsArray);
};

function shuffleArray(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

const GamePage = () => {
  const [shuffledCards, setShuffledCards] = useState(
    duplicateAndShuffleCards()
  );
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [moves, setMoves] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY
  );
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const timeout = useRef(null);
  const [yaySound] = useSound(yay, {
    interrupt: false,
  });
  const [flipSound] = useSound(bubble, {
    interrupt: false,
  });
  const [correctSound] = useSound(correct_sound, {
    interrupt: false,
    volume: 0.7,
  });
  const [wrongSound] = useSound(wrong_sound, {
    interrupt: false,
  });

  const disable = () => {
    setShouldDisableAllCards(true);
  };

  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === uniqueCardsArray.length) {
      setShowModal(true);
      yaySound();
      const highScore = Math.min(moves, bestScore);
      setBestScore(highScore);
      localStorage.setItem("bestScore", highScore);
    }
  };

  const evaluate = () => {
    const [firstIndex, secondIndex] = openCards;
    enable();
    if (shuffledCards[firstIndex].type === shuffledCards[secondIndex].type) {
      setClearedCards((prev) => ({
        ...prev,
        [shuffledCards[firstIndex].type]: true,
      }));
      correctSound();
      setOpenCards([]);
      return;
    }
    wrongSound();
    // Flip the cards back after a delay
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };

  const handleCardClick = (index) => {
    if (openCards.includes(index) || clearedCards[shuffledCards[index].type]) {
      return; // Ignore the click if the same card is clicked again
    }
    flipSound();
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearedCards]);

  const checkIsInactive = (card) => {
    return Boolean(clearedCards[card.type]);
  };

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setShowModal(false);
    setMoves(0);
    setShouldDisableAllCards(false);
    // set a shuffled deck of cards
    setShuffledCards(duplicateAndShuffleCards());
  };

  return (
    <Box className="game-container" sx={{ bgcolor: colours.green }}>
      <Header1 text="SlothMind Shuffle" />
      <Header5 text="Match the cards to win the game" />
      <Box sx={{ bgcolor: colours.green }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridGap: "5px",
            marginTop: "20px",
          }}
        >
          {shuffledCards.map((card, index) => (
            <Card
              key={index}
              type={card.type}
              image={card.image}
              isInactive={checkIsInactive(card)}
              isFlipped={openCards.includes(index) || clearedCards[card.type]}
              onClick={() => handleCardClick(index)}
              isDisabled={shouldDisableAllCards}
            />
          ))}
        </div>
        <footer>
          <div className="score" style={{ fontWeight: "bold" }}>
            <div style={{ padding: "15px" }}>
              <span>Moves:</span> {moves}
            </div>
            {localStorage.getItem("bestScore") && (
              <div style={{ fontWeight: "bold" }}>
                <span>Best Score:</span> {bestScore}
              </div>
            )}
          </div>
          <div
            style={{
              padding: "15px",
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                position: "fixed",
                bottom: { xs: "15%", sm: "12%" },
                bgcolor: colours.pink,
                borderRadius: "30px",
                color: colours.black,
                border: "2px solid #000",
                paddingX: "20px",
                marginTop: "20px",
              }}
              onClick={handleRestart}
            >
              <Header5 text={"Sloth Restart!"} />
            </Button>
          </div>
        </footer>
        <Dialog
          open={showModal}
          disableBackdropClick
          disableEscapeKeyDown
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" textAlign={"center"}>
            Slothbravo! <br />
            You completed the challenge
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              textAlign={"center"}
              paddingBottom={"10px"}
            >
              You completed the game in {moves} moves. <br />
              Your best score is {bestScore} moves.
            </DialogContentText>
            <img
              src={heart}
              alt="heart"
              style={{ height: "200px", objectFit: "contain" }}
            />
          </DialogContent>

          <DialogActions style={{ justifyContent: "center" }}>
            <Button onClick={handleRestart} sx={{ color: colours.black }}>
              Restart
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default GamePage;
