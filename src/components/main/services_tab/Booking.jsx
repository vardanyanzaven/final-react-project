// import React from "react";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Divider,
// } from "@mui/material";
// import DatePickUP from "../services_tab/booking_details/DatePickUP";
// import SelectServiceType from "../services_tab/booking_details/SelectServiceType";

// export const Booking = ({ service, onClose }) => {
//   return (
//     <Dialog
//       open={!service}
//       onClose={onClose}
//       keepMounted
//       aria-describedby="alert-dialog-slide-description">
//       <form
//         style={{
//           width: "400px",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           textAlign: "center",
//         }}>
//         <DialogTitle> Book Here </DialogTitle>
//         <DialogContent
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 1,
//           }}>
//           <SelectServiceType />
//           <Divider />

//           <DialogActions> </DialogActions>
//           <DatePickUP />
//         </DialogContent>
//       </form>
//     </Dialog>
//   );
// };
