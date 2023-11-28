const isInYesterday = (array: any[], value: Date) => {
  return array.some((item) => {
    var alreadyStoredDate = new Date(item);
    var dateToBeChecked = new Date(value);

    const msBetweenDates = Math.abs(
      alreadyStoredDate.getTime() - dateToBeChecked.getTime()
    );

    //convert ms to hours (min sec ms)
    const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

    //check if the date is between 24 and 48 hours
    if (hoursBetweenDates >= 24 && hoursBetweenDates < 48) {
      return true;
    } else {
      return false;
    }
  });
};

export default isInYesterday;
