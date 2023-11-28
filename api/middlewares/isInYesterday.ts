const isInYesterday = (array: any[], value: Date) => {
  return array.some((item) => {
    var alreadyStoredDate = new Date(item);
    var dateToBeChecked = new Date(value);

    const msBetweenDates = Math.abs(
      alreadyStoredDate.getTime() - dateToBeChecked.getTime()
    );

    //convert ms to hours (min sec ms)
    const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

    //check if the date is within 24 hours and on the same day
    if (
      hoursBetweenDates >= 24 &&
      hoursBetweenDates < 48 &&
      alreadyStoredDate.getDate() === dateToBeChecked.getDate()
    ) {
      //date is within 24 hours and on the same day
      return true;
    } else {
      //date is NOT within 24 hours or not on the same day
      return false;
    }
  });
};

export default isInYesterday;
