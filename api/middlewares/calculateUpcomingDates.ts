const calculateUpcomingDates = async (
  startTime: Date,
  endstartTime: Date,
  reqBodyDays: Array<String>
) => {
  var startTimeStamp = new Date(startTime);
  var endstartTimeStamp = new Date(endstartTime);
  // var reqBodyDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  //regex for the dates taken from body
  var reqBodyDaysInFormat = reqBodyDays.join("|");
  var weekDays = reqBodyDaysInFormat;
  var re = new RegExp(weekDays);

  // calculating specific day time starts
  var hourTimeStamp = startTimeStamp;
  var hour = hourTimeStamp.getHours();
  var minutes = hourTimeStamp.getMinutes();
  var seconds = hourTimeStamp.getSeconds();
  //calculating hour, minute, milliseconds in milliseconds
  var milliseconds = (h: number, m: number, s: number) =>
    (h * 60 * 60 + m * 60 + s) * 1000;
  //addition this to final value is a must in order to get time precisely
  var dayTimeInMilliseconds = milliseconds(hour, minutes, seconds);
  // calculating specific day time ends

  //re-creating without specific time to avoid unnecessary iterations
  //format: yyyy,mm,dd
  var startDate = new Date(
    startTimeStamp.getUTCFullYear(),
    startTimeStamp.getUTCMonth(),
    startTimeStamp.getUTCDate()
  );
  var endDate = new Date(
    endstartTimeStamp.getUTCFullYear(),
    endstartTimeStamp.getUTCMonth(),
    endstartTimeStamp.getUTCDate()
  );
  var tempDate = startDate;
  var result = [];
  //take all days between startDate and endDate
  //remove prefix to specify week days
  while (tempDate.valueOf() !== endDate.valueOf()) {
    if (re.test(tempDate.toDateString())) result.push(new Date(tempDate));
    tempDate.setUTCDate(tempDate.getUTCDate() + 1);
  }
  //commented out local hour calculation again
  // result.forEach((day) => day.setTime(day.getTime() + dayTimeInMilliseconds));
  result.forEach((day) => day.setTime(day.getTime()));

  return result;
};

export default calculateUpcomingDates;
