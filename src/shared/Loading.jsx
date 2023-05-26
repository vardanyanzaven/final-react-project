import { Modal } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { loading } from "../store/slicers/loadingSlice";

const Loading = () => {
  const open = useSelector(loading);

  return <Modal open={open}>Loading</Modal>;
};

export default Loading;
