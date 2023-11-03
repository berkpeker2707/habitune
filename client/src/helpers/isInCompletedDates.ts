// function isInCompletedDates(array: any[], value: any) {
//   const dateToBeChecked = new Date(value);

//   for (const item of array) {
//     const alreadyStoredDate = new Date(item);

//     const msBetweenDates = Math.abs(
//       alreadyStoredDate.getTime() - dateToBeChecked.getTime()
//     );

//     const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

//     if (
//       hoursBetweenDates < 24 &&
//       alreadyStoredDate.getDate() === dateToBeChecked.getDate() &&
//       alreadyStoredDate.getMonth() === dateToBeChecked.getMonth()
//     ) {
//       return true; // Found a match, return immediately.
//     }
//   }

//   return false; // No match found in the array.
// }

const isInCompletedDates = (array: any[], value: Date) => {
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
      hoursBetweenDates < 24 &&
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

export default isInCompletedDates;
