import carBG from "../../assets/main_photos/2085166.jpg";
export const userStyles = {
  mainBox: {
    height: "200px",
    bgcolor: "#101010",
    display: "flex",
    alignItems: "end",
    backgroundImage: `url(${carBG})`,
    backgroundSize: "100%",
    backgroundPositionX: "start",
  },
  personal: {
    position: "absolute",
    top: "150px",
    left: "70px",
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  content: {
    mt: "100px",
    minHeight: "500px",
    display: "flex",
    justifyContent: "space-around",
  },
  contentLeft: {
    width: "23%",
    bgcolor: "grey",
    paddingInline: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  contentRight: { width: "73%", bgcolor: "grey" },
};

export const myBookingStyles = {
  tableRow: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  styledTable: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
