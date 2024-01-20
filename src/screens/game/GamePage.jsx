import React, {useState, useEffect, useRef} from 'react';
import Card from './Card';
import './Card.css';
import { Button } from '@mui/material';
import colours from '../../UI/colours';
import { Header1 } from '../../UI/text';

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
    const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
    const timeout = useRef(null);

    const disable = () => {
        setShouldDisableAllCards(true);
    };

    const enable = () => {
        setShouldDisableAllCards(false);
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
        if (openCards.length === 1) {
            setOpenCards((prev) => [...prev, index]);
            disable();
        } else {
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
        return () => {
            clearTimeout(timeout.current);
        };
    }, []);

    const handleRestart = () => {
        setClearedCards({});
        setOpenCards([]);
       
        setShouldDisableAllCards(false);
        // set a shuffled deck of cards
        setShuffledCards(duplicateAndShuffleCards());
      };

    return (
        <div className="game-container">
            <header sx={{Text: Header1}}>
                <h3>Play the Flip card game</h3>
            </header>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridGap: '10px' }}>
                {shuffledCards.map((card, index) => (
                    <Card
                        key={index}
                        type={card.type}
                        image={card.image}
                        isFlipped={openCards.includes(index) || clearedCards[card.type]}
                        onClick={() => handleCardClick(index)}
                        isDisabled={shouldDisableAllCards}
                    />
                ))}
            </div>
            <div style={{padding: '15px'}}>
                <Button variant="contained" sx={{bgcolor: colours.orange}} onClick={handleRestart}>Restart</Button>
            </div>
        </div>

    );
};
//     const [flippedCards, setFlippedCards] = useState([]);
    
//     const handleCardClick = (type) => {
//         if (flippedCards.length < 2) {
//             setFlippedCards([...flippedCards, type]);
//         }

//         // Add logic here to check for a match if 2 cards are flipped
//     };

//     return(
//         <div className="game-container">
//             <header>
//             <h3>Play the Flip card game</h3>
//             <div>
//                 Select two cards with same content consequtively to make them vanish
//             </div>
//         </header>
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridGap: '10px' }}>
//                 {shuffledCards.map((card, index) => (
//                     <Card
//                         key={index}
//                         type={card.type}
//                         image={card.image}
//                         isFlipped={flippedCards.includes(card.type)}
//                         onClick={() => handleCardClick(card.type)}
//                 />
//                 ))}
//             </div>
//         </div>
        
    
//     )
// }

export default GamePage;