function getNextYearDateAndTime() {
  let todayTemp = new Date();
  let today = new Date(
    todayTemp.getFullYear() + 1,
    todayTemp.getMonth(),
    todayTemp.getDate(),
    todayTemp.getHours(),
    todayTemp.getMinutes(),
    todayTemp.getSeconds()
  );
  return today;
}

export default getNextYearDateAndTime;
