import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { updateProfileAction } from "../reducer/asyncAuthReducer";

const theme = createTheme();

const userProfileSchema = yup.object().shape({
  displayName: yup.string().required("Enter Your Name"),
  photoUrl: yup.string().required("Enter Photo Url "),
});

export default function UserProfile() {
  const dispatch = useDispatch();

  const userProfileHandler = (profileData, event) => {
    event.preventDefault();
    console.log("1, profileData at component", profileData);
    dispatch(
      updateProfileAction({
        displayName: profileData.displayName,
        photoUrl: profileData.photoUrl,
      })
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userProfileSchema),
  });

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundImage: `url(${"https://png.pngtree.com/thumb_back/fh260/background/20190223/ourmid/pngtree-pink-watercolor-background-image_84113.jpg"})`,
          borderRadius: 4,
          boxShadow: 8,
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            My Profile
          </Typography>
          <Box
            component="form"
            sx={{ mt: 3 }}
            onSubmit={handleSubmit(userProfileHandler)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="displayName"
                  type="text"
                  label="Your Name"
                  name="displayName"
                  autoComplete="displayName"
                  {...register("displayName")}
                />
                <p style={{ color: "#DC143C" }}>
                  {errors.displayName?.message}
                </p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="photoUrl"
                  label="Photo Url"
                  type="text"
                  id="photoUrl"
                  autoComplete="photoUrl"
                  {...register("photoUrl")}
                />
                <p style={{ color: "#DC143C" }}>{errors.photoUrl?.message}</p>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2, bgcolor: "#DC143C" }}
            >
              Update
            </Button>
            {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  New Member ? SignUp Here
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
