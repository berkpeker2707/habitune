const isInNinetyToThreeHundredDays = (array: any[], value: Date) => {
  return array.some((item) => {
    var alreadyStoredDate = new Date(item);
    var dateToBeChecked = new Date(value);

    const msBetweenDates = Math.abs(
      alreadyStoredDate.getTime() - dateToBeChecked.getTime()
    );

    // Convert ms to days
    const daysBetweenDates = msBetweenDates / (24 * 60 * 60 * 1000);

    if (daysBetweenDates >= 90 && daysBetweenDates < 365) {
      return true;
    } else {
      return false;
    }
  });
};

export default isInNinetyToThreeHundredDays;
