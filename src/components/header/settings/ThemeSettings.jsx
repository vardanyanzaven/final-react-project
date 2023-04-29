import { Table, TableBody, TableContainer } from "@mui/material";
import React from "react";

const ThemeSettings = () => {
  return (
    <TableContainer component={Paper} sx={{ m: 3 }}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption>Theme settings</caption>
        <TableBody>
          {settings.map((sett) => (
            <SettingItem sett={sett} key={Math.random()} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ThemeSettings;
