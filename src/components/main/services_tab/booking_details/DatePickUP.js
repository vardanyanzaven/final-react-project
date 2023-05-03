import * as React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

function ProLabel({ children }) {
  return (
    <Stack direction="row" spacing={0.5} component="span">
      <Tooltip title="Included in Pro package">
        <a href="/x/introduction/licensing/#pro-plan">
          <span className="plan-pro" />
        </a>
      </Tooltip>
      <span>{children}</span>
    </Stack>
  );
}

ProLabel.propTypes = {
  children: PropTypes.node,
};

export default function ComponentFamilies() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateField", "TimeField"]}>
        <DemoItem label="Pick up Date">
          <DateField defaultValue={dayjs(new Date())} />
        </DemoItem>
        <DemoItem label="Pick up Time">
          <TimeField defaultValue={dayjs(new Date().getTime)} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
