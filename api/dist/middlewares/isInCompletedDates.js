"use strict";
// const isInCompletedDates = (array: any[], value: Date) => {
//   return array.some((item) => {
//     var alreadyStoredDate = new Date(new Date(item));
Object.defineProperty(exports, "__esModule", { value: true });
//     var dateTobeChecked = new Date(value);
//     const msBetweenDates = Math.abs(
//       alreadyStoredDate.getTime() - dateTobeChecked.getTime()
//     );
//     //convert ms to hours(min sec ms)
//     const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
//     if (hoursBetweenDates < 24) {
//       // console.log("date is within 24 hours");
//       return true;
//     } else {
//       // console.log("date is NOT within 24 hours");
//       return false;
//     }
//   });
// };
// export default isInCompletedDates;
const isInCompletedDates = (array, value) => {
    return array.some(item => {
        var alreadyStoredDate = new Date(item);
        var dateToBeChecked = new Date(value);
        const msBetweenDates = Math.abs(alreadyStoredDate.getTime() - dateToBeChecked.getTime());
        //convert ms to hours (min sec ms)
        const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
        //check if the date is within 24 hours and on the same day
        if (hoursBetweenDates < 24 &&
            alreadyStoredDate.getDate() === dateToBeChecked.getDate()) {
            //date is within 24 hours and on the same day
            return true;
        }
        else {
            //date is NOT within 24 hours or not on the same day
            return false;
        }
    });
};
exports.default = isInCompletedDates;
//# sourceMappingURL=isInCompletedDates.js.map