import { Box, Button } from "@mui/material";
import { Header1, Header2, Header5 } from "../../UI/text";
import colours from "../../UI/colours";
import { useState } from "react";
import useSound from "use-sound";
import gumball from "../../assets/sounds/gumball.wav";

const quotes = [
  "Why do today what you can put off until tomorrow... or the day after... or next week?",
  "I'll start procrastinating right after I finish doing nothing.",
  "Procrastination is the art of keeping up with yesterday.",
  "The early bird gets the worm, but the second mouse gets the cheese... after a nap.",
  "Why do today what you can put off until tomorrow? Procrastination: Because deadlines are just suggestions!",
  "Procrastination is my superpower. I can turn any task into a pending masterpiece!",
  "I'm not lazy; I'm just on energy-saving mode until further notice.",
  "Procrastination is like a fine wine - it gets better with time. So let that to-do list age like a vintage Bordeaux.",
  "Why rush? The early bird might get the worm, but the second mouse gets the cheese without the stress.",
  "Procrastination is my cardio. I'm working on my mental fitness by exercising patience.",
  "I'm not avoiding work; I'm just on a prolonged coffee break. It's called strategic relaxation.",
  "Procrastination level: expert. I'll start being productive just as soon as my favorite show ends... or maybe the next episode.",
  "Why do today what you can do next week? Procrastination: because setting new records in laziness is a valid life goal.",
  "I'll stop procrastinating when there's a trophy for it. Until then, I'm training for the championship of delay.",
];

const Quote = ({ text, colour }) => {
  return (
    <Box
      sx={{
        bgcolor: colour,
        display: "flex",
        flex: 1,
        width: "80%",
        height: "70px",
        maxHeight: "70px",
        borderRadius: "30px",
        color: colours.black,
        border: "2px solid #000",
        padding: "20px",
        margin: "10px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Header5 text={text} />
    </Box>
  );
};
const QuotePage = () => {
  const [selectedQuotes, setSelectedQuotes] = useState(quotes.slice(0, 4));

  const handleChange = () => {
    const shuffled = quotes.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 4);
    setSelectedQuotes(selected);
  };

  return (
    <Box
      paddingBottom={"56px"}
      sx={{
        bgcolor: colours.green,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Header1 text="Quotes" />
      {selectedQuotes.map((text, index) => (
        <Quote
          key={text}
          text={text}
          colour={index % 2 === 0 ? colours.pink : colours.orange}
        />
      ))}
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
        onClick={handleChange}
      >
        <Header2 text={"Sloth it!"} />
      </Button>
    </Box>
  );
};

export default QuotePage;
