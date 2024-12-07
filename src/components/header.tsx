import { AppBar, Box, Typography } from "@mui/material";
import Image from "next/image";
import profilePic from "../assets/header_bg.png";

export const Header = () => (
  <AppBar position="static">
    <Image
      className="background-image"
      src={profilePic}
      alt="background image"
    />
    <Box sx={{ position: "relative", zIndex: "1" }}>
      <Typography
        fontSize="2.5rem"
        fontWeight="700"
        lineHeight="1"
        variant="h1"
      >
        Financer.com{" "}
      </Typography>
      <Typography
        marginTop="8px"
        fontSize="1.6rem"
        fontWeight="300"
        lineHeight="1"
      >
        Interview Exam
      </Typography>
      <Typography marginTop="12px" fontStyle="italic" color="#C3DDE9">
        Candidate: Bohdan Shevchenko
      </Typography>
    </Box>
  </AppBar>
);
