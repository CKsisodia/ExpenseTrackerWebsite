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

function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userProfileData);

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
      <ExpenseAppBar />

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/expenseForm" element={<ExpenseForm />}></Route>
        <Route path="/signup" element={<SignUpUser />}></Route>
        <Route path="/login" element={<LoginUser />}></Route>
        <Route path="/userProfile" element={<UserProfile />}></Route>
        <Route path="/forgotPassword" element={<ForgotPasswordPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
