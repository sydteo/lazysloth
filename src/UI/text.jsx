import { Typography } from "@mui/material";

export const Header1 = ({ text }) => {
  return (
    <Typography fontSize="40px" fontWeight={"bold"} paddingTop={"10px"}>
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

export const Header5 = ({ text }) => {
  return (
    <Typography fontSize="16px" fontWeight={"bold"}>
      {text}
    </Typography>
  );
};
