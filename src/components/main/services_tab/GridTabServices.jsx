// import * as React from "react";
// import { experimentalStyled as styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";
// import { Machine } from "../../../constants/common";
// import { Typography } from "@material-ui/core";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
//   transition: "transform 0.3s ease-in-out", // Add transition effect
//   "&:hover": {
//     transform: "translateY(-40px)", // Move component upwards on hover
//   },
// }));

// export default function ResponsiveGrid({ service, setService }) {
//   return (
//     <Box sx={{ flexGrow: 1, mt: 8, ml: 50, justifyContent: "center" }}>
//       <Grid
//         container
//         spacing={{ xs: 2, md: 8 }}
//         columns={{ xs: 6, sm: 10, md: 16 }}>
//         {Machine.map((car, index) => (
//           <Grid item xs={8} sm={8} md={6} key={index}>
//             <Item sx={{ justifyContent: "center", width: 400, height: 300 }}>
//               <img
//                 src={car.url}
//                 alt=""
//                 width={400}
//                 height={300}
//                 onClick={() => setService(!service)}
//               />
//               <Typography> Service Name </Typography>
//             </Item>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }
