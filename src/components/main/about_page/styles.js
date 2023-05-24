export const aboutStyles = {
  aboutMain: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    opacity: "0.6",
    overflow: "hidden",
    height: "760px",
  },
  body: {
    color: "#787802",
    fontFamily: "monospace",
    width: "65%",
    wordSpacing: "3px",
    lineHeight: "30px",
    userSelect: "none",
    textShadow:
      "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
    m: "20px",
  },
};

export const commentStyles = {
  box1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    mt: 2,
    bgcolor: "#454545",
  },
  box2: { display: "flex", flexDirection: "column" },
  box3: {
    display: "flex",
    background: "white",
    width: 800,
    alignItems: "center",
    justifyContent: "space-around",
    bgcolor: "#878787",
    pb: 2,
  },
};

export const writtenComStyles = {
  mainDiv: { overflow: "auto", maxHeight: "400px", width: "100%" },
  list: { width: "100%", maxWidth: "100%", bgcolor: "lightgray" },
  listItem: {
    display: "flex",
    alignItems: "center",
  },
  mainBox: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "end",
    mb: 2,
  },
};
