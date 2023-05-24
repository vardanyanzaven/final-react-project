export const formatDate = (timestamp) => {
  var date = new Date(timestamp);
  var day = ("0" + date.getDate()).slice(-2);
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var year = date.getFullYear().toString().slice(-2);
  var hours = ("0" + date.getHours()).slice(-2);
  var minutes = ("0" + date.getMinutes()).slice(-2);

  return day + "." + month + "." + year + " " + hours + ":" + minutes;
};
