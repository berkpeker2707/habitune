const isInCompletedDates = (array: any[], value: Date) => {
  return array.some((item) => {
    var elemHave = new Date(new Date(item));
    var elemToday = new Date(value);

    const msBetweenDates = Math.abs(elemHave.getTime() - elemToday.getTime());

    //convert ms to hours(min sec ms)
    const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

    if (hoursBetweenDates < 24) {
      // console.log("date is within 24 hours");
      return true;
    } else {
      // console.log("date is NOT within 24 hours");
      return false;
    }
  });
};

export default isInCompletedDates;
