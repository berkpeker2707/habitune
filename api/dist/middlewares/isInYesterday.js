"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isInYesterday = (array, value) => {
    return array.some((item) => {
        var alreadyStoredDate = new Date(item);
        var dateToBeChecked = new Date(value);
        const msBetweenDates = Math.abs(alreadyStoredDate.getTime() - dateToBeChecked.getTime());
        //convert ms to hours (min sec ms)
        const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
        if (hoursBetweenDates >= 24 && hoursBetweenDates < 48) {
            return true;
        }
        else {
            return false;
        }
    });
};
exports.default = isInYesterday;
