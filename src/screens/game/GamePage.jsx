import React, {useState, useEffect, useRef} from 'react';
import Card from './Card';
import './Card.css';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box } from '@mui/material';
import colours from '../../UI/colours';
import { Header1, Header5 } from '../../UI/text';
import heart from '../../assets/heart.PNG';

const uniqueCardsArray = [
    {
      type: "bear",
      image: require(`../../assets/memoryGame/bear.png`)
    },
    {
      type: "raccoon",
      image: require(`../../assets/memoryGame/racoon.png`)
    },
    {
      type: "fox",
      image: require(`../../assets/memoryGame/fox.png`)
    },
    {
      type: "lion",
      image: require(`../../assets/memoryGame/lion.png`)
    },
    {
      type: "panda",
      image: require(`../../assets/memoryGame/panda.png`)
    },
    {
      type: "rabbit",
      image: require(`../../assets/memoryGame/rabbit.png`)
    },
    {
        type: "reindeer",
        image: require(`../../assets/memoryGame/reindeer.png`)
    },
    {
        type: "penguin",
        image: require(`../../assets/memoryGame/penguin.png`)
    }
  ];

const duplicateAndShuffleCards = () => {
    const duplicatedCardsArray = [uniqueCardsArray[0], uniqueCardsArray[1], uniqueCardsArray[2], uniqueCardsArray[3],
                        uniqueCardsArray[0], uniqueCardsArray[1], uniqueCardsArray[2], uniqueCardsArray[3],
                        uniqueCardsArray[4], uniqueCardsArray[5], uniqueCardsArray[6], uniqueCardsArray[7],
                        uniqueCardsArray[4], uniqueCardsArray[5], uniqueCardsArray[6], uniqueCardsArray[7]
                    ];
    return shuffleArray(duplicatedCardsArray);
};



// Function to shuffle the cards
// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }

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
    const [shuffledCards, setShuffledCards] = useState(duplicateAndShuffleCards());
    const [openCards, setOpenCards] = useState([]);
    const [clearedCards, setClearedCards] = useState({});
    const [moves, setMoves] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [bestScore, setBestScore] = useState(
        JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY
    );
    const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
    const timeout = useRef(null);

    const disable = () => {
        setShouldDisableAllCards(true);
    };

    const enable = () => {
        setShouldDisableAllCards(false);
    };

    const checkCompletion = () => {
        if (Object.keys(clearedCards).length === uniqueCardsArray.length) {
          setShowModal(true);
          const highScore = Math.min(moves, bestScore);
          setBestScore(highScore);
          localStorage.setItem("bestScore", highScore);
        }
      };

    const evaluate = () => {
        const [firstIndex, secondIndex] = openCards;
        enable();
        if (shuffledCards[firstIndex].type === shuffledCards[secondIndex].type) {
            setClearedCards((prev) => ({ ...prev, [shuffledCards[firstIndex].type]: true }));
            setOpenCards([]);
            return;
        }
        // Flip the cards back after a delay
        timeout.current = setTimeout(() => {
            setOpenCards([]);
        }, 500);
    };

    const handleCardClick = (index) => {
        if (openCards.includes(index)) {
            return; // Ignore the click if the same card is clicked again
        }
    
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
    }, [openCards]);

    useEffect(() => {
        checkCompletion();
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
        <Box className="game-container" sx={{bgcolor: colours.green}}>
            <Header1 text="Memory Game" />
            <Header5 text="Match the cards to win the game" />
            <Box  sx={{bgcolor: colours.green}}>
           
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridGap: '10px', marginTop: "20px" }}>
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
                <div className="score" style={{ fontWeight: 'bold' }}> 
                    <div style={{padding: '15px'}}>
                        <span>Moves:</span> {moves}
                    </div>
                {localStorage.getItem("bestScore") && (
                    <div style={{ fontWeight: 'bold' }}>
                        <span>Best Score:</span> {bestScore}
                    </div>
                )}
                </div>
                <div style={{padding: '15px'}}>
                    <Button variant="contained" sx={{bgcolor: colours.orange, fontWeight:'bold'}} onClick={handleRestart}>Restart</Button>
                </div>
            </footer>
            <Dialog
                open={showModal}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" textAlign={'center'}>
                    Slothbravo! <br />You completed the challenge
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" textAlign={'center'} paddingBottom={'10px'}>
                        You completed the game in {moves} moves. <br />Your best score is{" "}
                        {bestScore} moves.
                    </DialogContentText>
                    <img src={heart} alt="heart" style={{height: '200px', objectFit:"contain"}} />
                </DialogContent>

                <DialogActions style={{ justifyContent: 'center' }}>
                <Button onClick={handleRestart} sx={{color:colours.black}}>
                    Restart
                </Button>
                </DialogActions>
            </Dialog>
            </Box>
        </Box>

    );
};

export default GamePage;