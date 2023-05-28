import dayjs from "dayjs";

export const formatDate = (timestamp) => {
  const date = dayjs(timestamp);
  return date.format("DD/MM/YYYY, hh:mm A");
};