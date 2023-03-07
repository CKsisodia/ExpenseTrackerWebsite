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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { deleteExepnseDataAction, getExpenseDataAction } from "../reducer/asyncExpenseReducer";

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

  const deleteHandler = (key) => {
    console.log(" 1 delete key", key);
    const localId = userData.localId;
    console.log(" 1 localId at deleteHandler", localId);
    dispatch(deleteExepnseDataAction({ key: key, localId: localId }));

    setTimeout(() => {
      dispatch(getExpenseDataAction(localId));
    }, 800);
  };

  const editHandler =()=> {

  }

  return (
    <TableContainer component={Paper} sx={{ mt: "20px" }}>
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Expense Title</StyledTableCell>
            <StyledTableCell align="left">Amount&nbsp;(INR)</StyledTableCell>
            <StyledTableCell align="left">Description</StyledTableCell>
            <StyledTableCell align="left">Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userExpenseList.map((items) => (
            <StyledTableRow key={items.id}>
              <StyledTableCell component="th" scope="row">
                {items.expenseTitle}
              </StyledTableCell>
              <StyledTableCell align="left">
                {items.expenseAmount}
              </StyledTableCell>
              <StyledTableCell align="left">
                {items.expenseDescription}
              </StyledTableCell>
              <StyledTableCell align="left">
                {items.expenseDate}
              </StyledTableCell>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => deleteHandler(items.key)}
                >
                  Delete
                </Button>
                <Button variant="contained" endIcon={<EditIcon />} onClick={editHandler}>
                  Edit
                </Button>
              </Stack>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
