import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import ExpenseList from "./ExpenseList";
import {
  addExpenseDataAction,
  getExpenseDataAction,
} from "../reducer/asyncExpenseReducer";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ExpenseForm() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userProfileData);
  console.log("expenseForm localId", userData);
  const userExpenseList = useSelector((state) => state.expense.expenseList);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [expenseTitle, setExpenseTitle] = React.useState("");
  const [expenseAmount, setExpenseAmount] = React.useState("");
  const [expenseDescription, setExpenseDescription] = React.useState("");
  const [expenseDate, setExpenseDate] = React.useState("");

  const expenseTitleHandler = (event) => {
    setExpenseTitle(event.target.value);
  };
  const expenseAmountHandler = (event) => {
    setExpenseAmount(event.target.value);
  };
  const expenseDescriptionHandler = (event) => {
    setExpenseDescription(event.target.value);
  };
  const expenseDateHandler = (event) => {
    setExpenseDate(event.target.value);
  };

  const expenseDataHandler = () => {
    const localId = userData.localId;
    console.log("in expense form local id", localId);

    const expenseData = {
      id: Math.floor(Math.random() * 1000),
      localId: localId,
      expenseTitle: expenseTitle,
      expenseAmount: expenseAmount,
      expenseDescription: expenseDescription,
      expenseDate: expenseDate,
    };
    dispatch(addExpenseDataAction(expenseData));

    setTimeout(() => {
      dispatch(getExpenseDataAction(localId));
    }, 1000);

    handleClose();
  };

  return (
    <div>
      <div
        style={{ marginTop: "35px", display: "flex", justifyContent: "center" }}
      >
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Expense Here
        </Button>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{"Your Expenses Data"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Expense Title"
            name="ExpenseTitle"
            type="text"
            fullWidth
            variant="standard"
            onChange={expenseTitleHandler}
          />

          <TextField
            autoFocus
            margin="dense"
            label="Amount"
            name="Amount"
            type="number"
            fullWidth
            variant="standard"
            onChange={expenseAmountHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            name="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={expenseDescriptionHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            type="date"
            name="Date"
            fullWidth
            variant="standard"
            onChange={expenseDateHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={expenseDataHandler}>Add</Button>
        </DialogActions>
      </Dialog>
      {userExpenseList.length > 0 && <ExpenseList />}
    </div>
  );
}
