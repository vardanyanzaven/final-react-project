import { DriveFileRenameOutline } from "@mui/icons-material";
import { Button, TableCell, TableRow } from "@mui/material";
import React from "react";
import SettingModal from "../shared/SettingModal";
import { useState } from "react";

const SettingItem = ({ sett }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <TableRow key={sett.name}>
        <TableCell component="th" scope="row">
          {sett.name}
        </TableCell>
        <TableCell align="left">{sett.value}</TableCell>
        <TableCell align="left">
          {sett.edit && (
            <Button disableRipple onClick={() => setOpenModal(true)}>
              <DriveFileRenameOutline />
            </Button>
          )}
        </TableCell>
      </TableRow>
      <SettingModal open={openModal} setOpen={setOpenModal} setting={sett} />
    </>
  );
};

export default SettingItem;
