const convertUTCDateToLocalDate = (date: any) => {
  var newDate = new Date(date);
  newDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return newDate;
};

export default convertUTCDateToLocalDate;
