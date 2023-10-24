import * as React from "react";
import { TouchableOpacity, TextInput } from "react-native";

import { useCallback, useEffect, useState } from "react";

import { DatePickerModal } from "react-native-paper-dates";
import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en-GB", enGB);

const DayBetween = (props: any) => {
  const [taskFirstDate, setTaskFirstDate] = useState<Date>();
  const [taskLastDate, setTaskLastDate] = useState<Date>();

  useEffect(() => {
    props.sendDayBetweenState(taskFirstDate, taskLastDate);
  }, [taskFirstDate, taskLastDate]);

  const [open, setOpen] = useState(false);

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = useCallback(
    ({ startDate, endDate }: { startDate: any; endDate: any }) => {
      setOpen(false);
      setTaskFirstDate(() => new Date(startDate?.getTime()));
      setTaskLastDate(() => new Date(endDate?.getTime()));
    },
    [setOpen, taskFirstDate, taskLastDate]
  );

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <TouchableOpacity style={{ top: 40 }} onPress={() => setOpen(true)}>
      {taskFirstDate && taskLastDate ? (
        <TextInput
          style={{
            height: 49.5,
            borderTopWidth: 1,
            paddingLeft: 20,
            marginLeft: 7,
            marginRight: 7,
            marginBottom: 10,
            borderColor: "#968EB0",
            color: "#7c7c7c",
            textAlign: "left",
          }}
          editable={false}
          selectTextOnFocus={false}
        >
          Between {monthNames[taskFirstDate?.getMonth()]}{" "}
          {taskFirstDate?.getDate()?.toString()}
          {" - "}
          {monthNames[taskLastDate?.getMonth()]}{" "}
          {taskLastDate?.getDate()?.toString()}
        </TextInput>
      ) : (
        <TextInput
          style={{
            height: 49.5,
            borderTopWidth: 1,
            paddingLeft: 20,
            marginLeft: 7,
            marginRight: 7,
            marginBottom: 10,
            borderColor: "#968EB0",
            color: "#7c7c7c",
            textAlign: "left",
          }}
          editable={false}
          selectTextOnFocus={false}
        >
          Select Date
        </TextInput>
      )}
      <DatePickerModal
        locale="en-GB"
        mode="range"
        visible={open}
        onDismiss={onDismiss}
        startDate={taskFirstDate}
        endDate={taskLastDate}
        onConfirm={onConfirm}
      />
    </TouchableOpacity>
  );
};

export default DayBetween;
