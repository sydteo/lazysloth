import { Typography } from "@mui/material";

export const Header1 = ({ text }) => {
  return (
    <Typography fontSize="48px" fontWeight={"bold"}>
      {text}
    </Typography>
  );
};

export const Header2 = ({ text }) => {
  return (
    <Typography fontSize="36px" fontWeight={"bold"}>
      {text}
    </Typography>
  );
};
