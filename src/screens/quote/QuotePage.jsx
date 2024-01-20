import { Box } from "@mui/material";
import { Header1, Header5 } from "../../UI/text";
import colours from "../../UI/colours";

const quotes = [
  "Why do today what you can put off until tomorrow... or the day after... or next week?",
  "I'll start procrastinating right after I finish doing nothing.",
  "Procrastination is the art of keeping up with yesterday.",
  "The early bird gets the worm, but the second mouse gets the cheese... after a nap.",
];

const Quote = ({ text, colour }) => {
  return (
    <Box
      sx={{
        bgcolor: colour,
        display: "flex",
        flex: 1,
        width: "80%",
        height: "80px",
        maxHeight: "80px",
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
      {quotes.map((text, index) => (
        <Quote
          key={text}
          text={text}
          colour={index % 2 === 0 ? colours.pink : colours.orange}
        />
      ))}
    </Box>
  );
};

export default QuotePage;
