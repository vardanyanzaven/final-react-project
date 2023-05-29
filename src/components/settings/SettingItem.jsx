import { DriveFileRenameOutline } from "@mui/icons-material";
import { Button, TableCell, TableRow } from "@mui/material";
import React from "react";
import SettingModal from "./SettingModal";
import { useState } from "react";

const SettingItem = ({ sett }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <TableRow key={sett.name}>
        <TableCell
          component="th"
          scope="row"
          sx={{ color: "#FFC30F", fontSize: "20px" }}>
          {sett.name}
        </TableCell>
        <TableCell align="left" sx={{ fontSize: "20px", color: "white" }}>
          {sett.value}
        </TableCell>
        <TableCell align="right">
          {sett.edit && (
            <Button
              disableRipple
              onClick={() => setOpenModal(true)}
              sx={{ flex: "end" }}>
              <DriveFileRenameOutline
                sx={{ color: "#FFC30F", fontSize: "30px" }}
              />
            </Button>
          )}
        </TableCell>
      </TableRow>
      <SettingModal open={openModal} setOpen={setOpenModal} setting={sett} />
    </>
  );
};

export default SettingItem;
