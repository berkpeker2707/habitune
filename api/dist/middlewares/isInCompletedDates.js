"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isInCompletedDates = (array, value) => {
    return array.some((item) => {
        var alreadyStoredDate = new Date(new Date(item));
        var dateTobeChecked = new Date(value);
        const msBetweenDates = Math.abs(alreadyStoredDate.getTime() - dateTobeChecked.getTime());
        //convert ms to hours(min sec ms)
        const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
        if (hoursBetweenDates < 24) {
            // console.log("date is within 24 hours");
            return true;
        }
        else {
            // console.log("date is NOT within 24 hours");
            return false;
        }
    });
};
exports.default = isInCompletedDates;
