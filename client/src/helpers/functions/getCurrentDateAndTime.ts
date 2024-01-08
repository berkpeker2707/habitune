function getCurrentDateAndTime() {
  let todayTemp = new Date();
  let today = new Date(
    todayTemp.getFullYear(),
    todayTemp.getMonth(),
    todayTemp.getDate(),
    todayTemp.getHours(),
    todayTemp.getMinutes(),
    todayTemp.getSeconds()
  );
  return today;
}

export default getCurrentDateAndTime;
