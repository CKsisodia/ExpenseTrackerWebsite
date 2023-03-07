import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditExpense() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [updateExpenseTitle, setUpdateExpenseTitle] = React.useState("");
  const [updateExpenseAmount, setUpdateExpenseAmount] = React.useState("");
  const [updateExpenseDescription, setUpdateExpenseDescription] = React.useState("");
  const [updateExpenseDate, setUpdateExpenseDate] = React.useState("");

  const updateExpenseTitleHandler = (event) => {Update
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

  Update
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit Your Expense Here
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            label="Update Expense Title"
            name="updateExpenseTitle"
            type="text"
            fullWidth
            variant="standard"
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
            onChange={updateExpenseDescriptionHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            type="date"
            name="Date"
            fullWidth
            variant="standard"
            onChange={updateExpenseDateHandler}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}