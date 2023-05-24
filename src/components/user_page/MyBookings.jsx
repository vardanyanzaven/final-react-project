import { styled } from "@mui/material/styles";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { myBookingStyles } from "./styles";

export const MyBookings = () => {
  return <MyBookingsTable />;
};

const MyBookingsTable = () => {
  const [bookingArray, setBookingArray] = useState([]);
  const { id } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "bookings"),
          where("personId", "==", id)
        );
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
      <Table sx={{ width: "100%" }} aria-label="customized table">
        <TableHead>
          <TableRow sx={myBookingStyles.tableRow}>
            <StyledTableCell sx={{ width: "20%" }}>SERVICE</StyledTableCell>
            <StyledTableCell sx={{ width: "20%" }}>ADDRESS</StyledTableCell>
            <StyledTableCell sx={{ width: "20%" }}>CAR</StyledTableCell>
            <StyledTableCell sx={{ width: "20%" }}>PICKUP</StyledTableCell>
            <StyledTableCell sx={{ width: "20%" }}>PAYMENT</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody
        //   sx={{
        //     width: "100%",
        //   }}
        >
          {bookingArray.map((row) => {
            return (
              <StyledTableRow
                sx={myBookingStyles.styledTable}
                key={Math.random()}>
                <StyledTableCell align="left" sx={{ width: "20%" }}>
                  {row.service.toUpperCase()}
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ width: "20%" }}>
                  {row.address}
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ width: "20%" }}>
                  {row.car}
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ width: "20%" }}>
                  {row.pickUpTime}
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ width: "20%" }}>
                  {row.price}$
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
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
