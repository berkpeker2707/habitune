const convertUTCDateToLocalDate = async (date: any) => {
  var newDate = new Date(new Date(date).toISOString());
  // newDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return newDate;
};

export default convertUTCDateToLocalDate;
