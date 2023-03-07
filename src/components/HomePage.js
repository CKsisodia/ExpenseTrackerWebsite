import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import HomeImage from "../components/Images/HomeImage.jpg";

const HomePage = () => {
  return (
    <Box sx={{mt:10, backgroundImage:`url(${HomeImage})`}}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={7}>
          <Typography variant="h3">Welcome ! to our App</Typography>
          <Typography variant="h6">
            Add your daily expenses here. you will get all records.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "200px", fontSize: "16px" }}
          >
            Add Expense
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
