"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isInSevenToFifteenDays = (array, value) => {
    return array.some((item) => {
        var alreadyStoredDate = new Date(item);
        var dateToBeChecked = new Date(value);
        const msBetweenDates = Math.abs(alreadyStoredDate.getTime() - dateToBeChecked.getTime());
        // Convert ms to days
        const daysBetweenDates = msBetweenDates / (24 * 60 * 60 * 1000);
        if (daysBetweenDates >= 7 && daysBetweenDates < 15) {
            return true;
        }
        else {
            return false;
        }
    });
};
exports.default = isInSevenToFifteenDays;
