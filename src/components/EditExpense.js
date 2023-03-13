import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { expenseAction } from "../reducer/expenseSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getExpenseDataAction,
  updateExpenseDataAction,
} from "../reducer/asyncExpenseReducer";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditExpense() {
  const toBeEditedExpenseDataCopy = useSelector(
    (state) => state.expense.toBeEditedExpenseData
  );
  const userData = useSelector((state) => state.user.userProfileData);

  const editPageOpen = useSelector((state) => state.expense.editForm);

  console.log("edit expense data ", toBeEditedExpenseDataCopy);

  const dispatch = useDispatch();

  const [updateExpenseTitle, setUpdateExpenseTitle] = React.useState(
    toBeEditedExpenseDataCopy.expenseTitle
  );
  const [updateExpenseAmount, setUpdateExpenseAmount] = React.useState(
    toBeEditedExpenseDataCopy.expenseAmount
  );
  const [updateExpenseDescription, setUpdateExpenseDescription] =
    React.useState(toBeEditedExpenseDataCopy.expenseDescription);
  const [updateExpenseDate, setUpdateExpenseDate] = React.useState(
    toBeEditedExpenseDataCopy.expenseDate
  );

  const updateExpenseTitleHandler = (event) => {
    setUpdateExpenseTitle(event.target.value);
  };
  const updateExpenseAmountHandler = (event) => {
    setUpdateExpenseAmount(event.target.value);
  };
  const updateExpenseDescriptionHandler = (event) => {
    setUpdateExpenseDescription(event.target.value);
  };
  const updateExpenseDateHandler = (event) => {
    setUpdateExpenseDate(event.target.value);
  };

  const updateExpenseHandler = () => {
    const localId = userData.localId;
    const key = toBeEditedExpenseDataCopy.key;
    const updatedData = {
      expenseTitle: updateExpenseTitle,
      expenseAmount: updateExpenseAmount,
      expenseDescription: updateExpenseDescription,
      expenseDate: updateExpenseDate,
      localId: localId,
      key: key,
    };
    dispatch(updateExpenseDataAction(updatedData));

    setTimeout(() => {
      dispatch(getExpenseDataAction(localId));
    }, 1000);

    editCancelHandler();
  };

  const editCancelHandler = () => {
    dispatch(expenseAction.cancelEditForm());
  };

  return (
    <div>
      <Dialog
        open={editPageOpen}
        onClose={editCancelHandler}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit Your Expense Here"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Update Expense Title"
            name="updateExpenseTitle"
            type="text"
            fullWidth
            variant="standard"
            value={updateExpenseTitle}
            onChange={updateExpenseTitleHandler}
          />

          <TextField
            autoFocus
            margin="dense"
            label="Update Amount"
            name="updateAmount"
            type="number"
            fullWidth
            variant="standard"
            value={updateExpenseAmount}
            onChange={updateExpenseAmountHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Update Description"
            name="updateDescription"
            type="text"
            fullWidth
            variant="standard"
            value={updateExpenseDescription}
            onChange={updateExpenseDescriptionHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            type="date"
            name="Date"
            fullWidth
            variant="standard"
            value={updateExpenseDate}
            onChange={updateExpenseDateHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={editCancelHandler}>Cancel</Button>
          <Button onClick={updateExpenseHandler}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
