import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { SETTINGS_NAME_LIST } from "../../../constants/common";
import SettingItem from "./SettingItem";

export default function PersonalSettings() {
  const settings = SETTINGS_NAME_LIST();

  return (
    <TableContainer
      component={Paper}
      sx={{
        m: 3,
        background: "linear-gradient(to bottom, #333340, #444444)",
      }}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption>Your information settings</caption>
        <TableBody>
          {settings.map((sett) => (
            <SettingItem sett={sett} key={Math.random()} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
