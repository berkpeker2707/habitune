import * as React from "react";
import { useCallback } from "react";
import { TouchableOpacity, TextInput } from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en-GB", enGB);

const DayBetween = (props: {
  taskFirstDate: Date;
  setTaskFirstDate: Function;
  taskLastDate: Date;
  setTaskLastDate: Function;
  dateBetweenModalOpen: boolean;
  setDateBetweenModalOpen: Function;
}) => {
  const {
    taskFirstDate,
    setTaskFirstDate,
    taskLastDate,
    setTaskLastDate,
    dateBetweenModalOpen,
    setDateBetweenModalOpen,
  } = props;

  const onDismiss = useCallback(() => {
    setDateBetweenModalOpen(false);
  }, [setDateBetweenModalOpen]);

  const onConfirm = useCallback(
    ({ startDate, endDate }: { startDate: any; endDate: any }) => {
      setDateBetweenModalOpen(false);
      setTaskFirstDate(() => new Date(startDate?.getTime()));
      setTaskLastDate(() => new Date(endDate?.getTime()));
    },
    [setDateBetweenModalOpen, taskFirstDate, taskLastDate]
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
    <TouchableOpacity
      style={{ top: 40 }}
      onPress={() => setDateBetweenModalOpen(true)}
    >
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
        visible={dateBetweenModalOpen}
        onDismiss={onDismiss}
        startDate={taskFirstDate}
        endDate={
          taskLastDate instanceof Date
            ? new Date(
                new Date(Date.now()).getFullYear() + 1,
                new Date(Date.now()).getMonth(),
                new Date(Date.now()).getDate(),
                new Date(Date.now()).getHours(),
                new Date(Date.now()).getMinutes(),
                new Date(Date.now()).getSeconds()
              )
            : taskLastDate
        }
        onConfirm={onConfirm}
      />
    </TouchableOpacity>
  );
};

export default DayBetween;
