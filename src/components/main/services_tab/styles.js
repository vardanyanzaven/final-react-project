export const bookingStyles = {
  mainBox: {
    display: "flex",
    justifyContent: "center",
  },
  secondBox: {
    display: "flex",
    justifyContent: "space-between",
    // alignItems: "center",
    textAlign: "center",
    width: 1200,
    height: 600,
  },
  formBox: {
    width: "400px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    ml: 10,
  },
  carBox: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
    alignItems: "center",
    mb: 2,
  },
};

export const feedBackStyles = {
  mainBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    width: 800,
    height: 600,
    mt: 10,
  },
};

export const selectedServiceStyle = {
  mainBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    m: "8rem 0 4rem 0",
  },
  card: {
    maxWidth: "65%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    p: "3rem 0"
  },
};

export const servicePageStyle = {
  mainBox: {
    mt: "8rem",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 3,
    "& .image:hover": {
      transform: "translateY(-20px)",
      transition: "transform 0.2s",
    },
  },
};
