import { Box, Typography } from "@mui/material";
import React from "react";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import EmailIcon from "@mui/icons-material/Email";
const Footer = () => {
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          bgcolor: "black",
          color: "#DC143C",
          p: 2,
          width: "105vw",
          ml: "-10px",
          marginBottom: "-10px",
        }}
      >
        <Box
          sx={{
            my: 2,
            "& svg": { fontSize: "60px", cursor: "pointer", mr: 3 },
            "& svg:hover": {
              color: "yellow",
              transform: "translate(5px)",
              transition: "all 400ms",
            },
          }}
        >
          <ContactPhoneIcon />
          <EmailIcon />
        </Box>
        <Typography
          variant="h5"
          sx={{ "@media (max-width:600px)": { fontSize: "1rem" } }}
        >
          All Rights Reserved &copy; CK Sisodia
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
