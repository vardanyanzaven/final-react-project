import { styled } from "@mui/material/styles";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";
import { useEffect } from "react";

export const MyBookings = () => {
  return <MyBookingsTable />;
};

const MyBookingsTable = () => {
  const [bookingArray, setBookingArray] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "bookings"));
        const querySnapshot = await getDocs(q);
        const bookingsData = querySnapshot.docs.map((doc) => doc.data());
        setBookingArray(bookingsData);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };
    fetchData();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ width: "100%", minWidth: 800 }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <StyledTableCell sx={{ width: "25%" }}> USER ID</StyledTableCell>
            <StyledTableCell sx={{ width: "25%" }}>ADDRESS</StyledTableCell>
            <StyledTableCell sx={{ width: "25%" }}>CAR</StyledTableCell>
            <StyledTableCell sx={{ width: "25%" }}>PAYMENT</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody
        //   sx={{
        //     width: "100%",
        //   }}
        >
          {bookingArray.map((row) => (
            <StyledTableRow
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
              key={Math.random()}
            >
              <StyledTableCell align="left" sx={{ width: "25%" }}>
                {row.personId}
              </StyledTableCell>
              <StyledTableCell align="left" sx={{ width: "25%" }}>
                {row.address}
              </StyledTableCell>
              <StyledTableCell align="left" sx={{ width: "25%" }}>
                {row.car}
              </StyledTableCell>
              <StyledTableCell align="left" sx={{ width: "25%" }}>
                {row.price}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    width: "100%",
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
