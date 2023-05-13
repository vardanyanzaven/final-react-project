import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateField } from "@mui/x-date-pickers/DateField";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function DateForBooking({ date, setdate, time, settime }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateField", "TimeField"]}>
        <DemoItem label="Pick up Date">
          <DateField
            defaultValue={date}
            value={date}
            onChange={(e) => setdate(e)}
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
