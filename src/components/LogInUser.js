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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  forgottPasswordAction,
  loginUserAction,
} from "../reducer/asyncAuthReducer";

const theme = createTheme();

const loginSchema = yup.object().shape({
  email: yup.string().email().required("Enter Email"),
  password: yup
    .string()
    .min(6)
    .max(15)
    .required("Password Must Be atleast of 6"),
});

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email().required("Enter Email"),
});

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const forggotPasswordHandler = (email, event) => {
    event.preventDefault();
    console.log(email);
    dispatch(forgottPasswordAction(email.email));
  };

  const navToLoginPage = () => {
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        sx={{
          backgroundImage: `url(${"https://png.pngtree.com/thumb_back/fh260/background/20190223/ourmid/pngtree-pink-watercolor-background-image_84113.jpg"})`,
          borderRadius: 4,
          boxShadow: 8,
          width: "550px",
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
            Please enter your email here to reset password
          </Typography>
          <Box
            component="form"
            sx={{ mt: 3 }}
            onSubmit={handleSubmit(forggotPasswordHandler)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  type="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email")}
                />
                <p style={{ color: "#DC143C" }}>{errors.email?.message}</p>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2, bgcolor: "#DC143C" }}
            >
              Send Link
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Typography
                  variant="body2"
                  sx={{ cursor: "pointer", color: "green" }}
                  onClick={navToLoginPage}
                >
                  Login Here
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default function LoginUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginUserData = useSelector((state) => state.user.loginUserData);
 
  React.useEffect(() => {
    if (loginUserData !== undefined) {
      navigate("/");
    }
  }, [loginUserData]);

  const loginFormSubmitHandler = (data, event) => {
    event.preventDefault();
    console.log("1, getting data from user through login form ", data);
    dispatch(loginUserAction({ data }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const navToSignUpPage = () => {
    navigate("/signup");
  };

  const navToForgotPasswordPage = () => {
    navigate("/forgotPassword");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        sx={{
          backgroundImage: `url(${"https://png.pngtree.com/thumb_back/fh260/background/20190223/ourmid/pngtree-pink-watercolor-background-image_84113.jpg"})`,
          borderRadius: 4,
          boxShadow: 8,
          width: "550px",
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
            Login
          </Typography>
          <Box
            component="form"
            sx={{ mt: 3 }}
            onSubmit={handleSubmit(loginFormSubmitHandler)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  type="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email")}
                />
                <p style={{ color: "#DC143C" }}>{errors.email?.message}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password")}
                />
                <p style={{ color: "#DC143C" }}>{errors.password?.message}</p>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2, bgcolor: "#DC143C" }}
            >
              Login
            </Button>
            <Grid container justifyContent="space-between">
              <Typography
                sx={{ cursor: "pointer", color: "red" }}
                onClick={navToForgotPasswordPage}
              >
                Forgot Password ?
              </Typography>
              <Grid item>
                <Typography
                  variant="body2"
                  sx={{ cursor: "pointer", color: "green" }}
                  onClick={navToSignUpPage}
                >
                  New Member ? SignUp Here
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
