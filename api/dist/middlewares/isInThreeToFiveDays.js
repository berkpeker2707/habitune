"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isInThreeToFiveDays = (array, value) => {
    return array.some(item => {
        var alreadyStoredDate = new Date(item);
        var dateToBeChecked = new Date(value);
        const msBetweenDates = Math.abs(alreadyStoredDate.getTime() - dateToBeChecked.getTime());
        //convert ms to days
        const daysBetweenDates = msBetweenDates / (24 * 60 * 60 * 1000);
        if (daysBetweenDates >= 3 && daysBetweenDates < 7) {
            return true;
        }
        else {
            return false;
        }
    });
};
exports.default = isInThreeToFiveDays;
//# sourceMappingURL=isInThreeToFiveDays.js.map