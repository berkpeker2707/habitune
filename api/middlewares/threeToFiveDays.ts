const threeToFiveDays = (array: any[], value: Date) => {
  return array.some((item) => {
    var alreadyStoredDate = new Date(item);
    var dateToBeChecked = new Date(value);

    const msBetweenDates = Math.abs(
      alreadyStoredDate.getTime() - dateToBeChecked.getTime()
    );

    //convert ms to days
    const daysBetweenDates = msBetweenDates / (24 * 60 * 60 * 1000);

    //check if the date is between 3 and 5 days ago
    if (daysBetweenDates >= 3 && daysBetweenDates < 5) {
      return true;
    } else {
      return false;
    }
  });
};

export default threeToFiveDays;
