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
  box2: { display: "flex", flexDirection: "column", mt: 2, width: "100%", bgcolor: "rgb(2, 2, 34)"},
  box3: {
    display: "flex",
    marginTop: "5%",
    background: "rgb(2, 2, 34)",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    bgcolor: "rgb(2, 2, 34)",
    pb: 2,
    
  },
};

export const writtenComStyles = {
  mainDiv: { overflow: "auto", height: "auto", maxWidth: "100%" },
  list: { width: "auto", height:"auto",  bgcolor: "transparent", opacity: 0.9, display: "flex", flexDirection: "row" },
  listItem: {
    minWidth: "400px", 
    height:"400px",
    overflow: "hidden",
    display: "flex",
    margin: "2%",
    
    alignItems: "center",
    border: 2, borderColor: "white", borderRadius: "16px"
  },
  mainBox: {
    margin: "2%",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "end",
    mb: 2,
  },
};
