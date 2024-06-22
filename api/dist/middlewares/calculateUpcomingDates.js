"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const calculateUpcomingDates = (startTime, endstartTime, reqBodyDays) => __awaiter(void 0, void 0, void 0, function* () {
    var startTimeStamp = new Date(startTime);
    var endstartTimeStamp = new Date(endstartTime);
    // var reqBodyDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    //regex for the dates taken from body
    var reqBodyDaysInFormat = reqBodyDays.join('|');
    var weekDays = reqBodyDaysInFormat;
    var re = new RegExp(weekDays);
    // calculating specific day time starts
    var hourTimeStamp = startTimeStamp;
    var hour = hourTimeStamp.getHours();
    var minutes = hourTimeStamp.getMinutes();
    var seconds = hourTimeStamp.getSeconds();
    //calculating hour, minute, milliseconds in milliseconds
    var milliseconds = (h, m, s) => (h * 60 * 60 + m * 60 + s) * 1000;
    //addition this to final value is a must in order to get time precisely
    var dayTimeInMilliseconds = milliseconds(hour, minutes, seconds);
    // calculating specific day time ends
    //re-creating without specific time to avoid unnecessary iterations
    //format: yyyy,mm,dd
    var startDate = new Date(startTimeStamp.getFullYear(), startTimeStamp.getMonth(), startTimeStamp.getDate());
    var endDate = new Date(endstartTimeStamp.getFullYear(), endstartTimeStamp.getMonth(), endstartTimeStamp.getDate());
    var tempDate = startDate;
    var result = [];
    //take all days between startDate and endDate
    //remove prefix to specify week days
    while (tempDate.valueOf() !== endDate.valueOf()) {
        if (re.test(tempDate.toDateString()))
            result.push(new Date(tempDate));
        tempDate.setDate(tempDate.getDate() + 1);
    }
    result.forEach(day => day.getTime() + dayTimeInMilliseconds);
    return result;
});
exports.default = calculateUpcomingDates;
//# sourceMappingURL=calculateUpcomingDates.js.map