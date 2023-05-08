import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateField } from "@mui/x-date-pickers/DateField";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";

export default function DateForBooking() {
  const [data, setdata] = useState(dayjs(new Date()));
  const [time, settime] = useState(dayjs(Date.now()));
  console.log(time);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateField", "TimeField"]}>
        <DemoItem label="Pick up Date">
          <DateField
            defaultValue={data}
            value={data}
            onChange={(e) => setdata(e)}
          />
        </DemoItem>
        <DemoItem label="Pick up Time">
          <TimeField
            defaultValue={time}
            value={time}
            onChange={(e) => settime(e)}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
