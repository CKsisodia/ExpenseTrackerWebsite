import { createTheme, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ExpenseAppBar from "./components/ExpenseAppBar";
import ExpenseForm from "./components/ExpenseForm";
import HomePage from "./components/layout/HomePage";
import LoginUser, { ForgotPasswordPage } from "./components/LogInUser";
import SignUpUser from "./components/SignUpUser";
import UserProfile from "./components/UserProfile";
import { getUserDataAction } from "./reducer/asyncAuthReducer";
import { getExpenseDataAction } from "./reducer/asyncExpenseReducer";
import CssBaseline from '@mui/material/CssBaseline';


function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userProfileData);
  const darkTheme = useSelector((state) => state.user.changeMode);

  const darkModeChange = createTheme({
    palette: {
      mode: darkTheme ? "dark" : "light",
    },
  });

  useEffect(() => {
    dispatch(getUserDataAction());
  }, []);

  useEffect(() => {
    if (userData !== undefined) {
      dispatch(getExpenseDataAction(userData.localId));
    } else return;
  }, [userData]);

  return (
    <div>
      <ThemeProvider theme={darkModeChange}>
      
        <ExpenseAppBar />

        <Routes>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/expenseForm" element={<ExpenseForm />}></Route>
          <Route path="/signup" element={<SignUpUser />}></Route>
          <Route path="/login" element={<LoginUser />}></Route>
          <Route path="/userProfile" element={<UserProfile />}></Route>
          <Route
            path="/forgotPassword"
            element={<ForgotPasswordPage />}
          ></Route>
        </Routes>
        <CssBaseline />
      </ThemeProvider>
    </div>
  );
}

export default App;
