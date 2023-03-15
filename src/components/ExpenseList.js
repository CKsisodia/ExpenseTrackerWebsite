import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteExepnseDataAction,
  getExpenseDataAction,
} from "../reducer/asyncExpenseReducer";
import { expenseAction } from "../reducer/expenseSlice";
import EditExpense from "./EditExpense";
import { authSliceAction } from "../reducer/authSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ExpenseList() {
  const dispatch = useDispatch();
  const userExpenseList = useSelector((state) => state.expense.expenseList);
  const userData = useSelector((state) => state.user.userProfileData);
  const editFormOpening = useSelector((state) => state.expense.editForm);
  const darkMode = useSelector((state) => state.user.showDarkMode);

  const [amount, setAmount] = React.useState(0);

  const deleteHandler = (key) => {
    const localId = userData.localId;
    dispatch(deleteExepnseDataAction({ key: key, localId: localId }));
    setTimeout(() => {
      dispatch(getExpenseDataAction(localId));
    }, 800);
  };

  const editFormHandler = (editedExpense) => {
    dispatch(expenseAction.editFormOpen(editedExpense));
  };

  React.useEffect(() => {
    if (userExpenseList.length > 0) {
      totalAmount();
    } else {
      setAmount(0);
    }
  }, [userExpenseList]);

  React.useEffect(() => {
    if (amount < 10000) {
      dispatch(authSliceAction.deactivatePremium());
    }
  }, [amount]);

  const totalAmount = () => {
    const itemAmount = userExpenseList.map((item) => {
      return +item.expenseAmount;
    });
    const sum = itemAmount.reduce((prev, curr) => {
      return prev + curr;
    });
    setAmount(sum);
  };

  const activatePremiumHandler = () => {
    dispatch(authSliceAction.activatePremium());
  };

  const deActivatePremiumHandler = () => {
    dispatch(authSliceAction.deactivatePremium());
  };




  // const [bgimg, setBgimg] = React.useState("");

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     setBgimg(<style backgroundColor="green"/>);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);





  return (
    <>
      <TableContainer component={Paper} sx={{ mt: "20px" }}>
        <Table sx={{ minWidth: 600 }} aria-label="customized table">
          {userExpenseList.length > 0 ? (
            <TableHead>
              <TableRow>
                <StyledTableCell>Expense Title</StyledTableCell>
                <StyledTableCell align="left">Amount</StyledTableCell>
                <StyledTableCell align="left">Description</StyledTableCell>
                <StyledTableCell align="left">Date</StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
              </TableRow>
            </TableHead>
          ) : (
            <h1
              style={{
                margin: "auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Empty List , Plese add Some Expenses
            </h1>
          )}

          <TableBody>
            {userExpenseList.map((items) => (
              <StyledTableRow key={items.id}>
                <StyledTableCell component="th" scope="row">
                  {items.expenseTitle}
                </StyledTableCell>
                <StyledTableCell align="left">
                  ₹{items.expenseAmount}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {items.expenseDescription}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {items.expenseDate}
                </StyledTableCell>
                <Stack direction="row" spacing={2} sx={{ mt: "7px" }}>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteHandler(items.key)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    endIcon={<EditIcon />}
                    onClick={() => editFormHandler(items)}
                  >
                    Edit
                  </Button>
                </Stack>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {editFormOpening && <EditExpense />}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          marginTop: 10,
        }}
      >
        {userExpenseList.length > 0 ? <h1>Total Amount :- ₹{amount}</h1> : null}

        {amount > 10000 &&
          (darkMode !== true ? (
            <div>
              <Box>
                <Button
                  sx={{
                    textTransform: "none",
                    backgroundColor: "yellowgreen",
                    "&:hover": { backgroundColor: "#DC143C" },
                    color: "#111",
                  }}
                  onClick={activatePremiumHandler}
                >
                  <Typography textAlign="center">Activate Premium</Typography>
                </Button>
              </Box>
            </div>
          ) : (
            <Box>
              <Button
                sx={{
                  textTransform: "none",
                  backgroundColor: "red",
                  "&:hover": { backgroundColor: "orange" },
                  color: "#111",
                }}
                onClick={deActivatePremiumHandler}
              >
                <Typography textAlign="center">Deactivate Premium</Typography>
              </Button>
            </Box>
          ))}
      </div>
    </>
  );
}
