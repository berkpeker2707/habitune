import * as React from "react";
import { useCallback } from "react";
import { TouchableOpacity, TextInput, Vibration } from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import { enGB, registerTranslation } from "react-native-paper-dates";
import { useTheme } from "../../../context/ThemeContext";
import { useAppDispatch, useSelector } from "../../../state/store";
import {
  taskFirstDate,
  setTaskFirstDate,
  taskLastDate,
  setTaskLastDate,
  dateBetweenModalOpen,
  setDateBetweenModalOpen,
} from "../../../state/habitSlice";

registerTranslation("en-GB", enGB);

const DayBetween = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const dateBetweenModalOpenState = useSelector(dateBetweenModalOpen);
  const taskFirstDateState = useSelector(taskFirstDate);
  const taskLastDateState = useSelector(taskLastDate);

  const onDismiss = useCallback(() => {
    dispatch(setDateBetweenModalOpen(false));
  }, [dateBetweenModalOpenState]);

  const onConfirm = useCallback(
    ({ startDate, endDate }: { startDate: any; endDate: any }) => {
      dispatch(setTaskFirstDate(startDate));
      dispatch(setTaskLastDate(endDate));
      dispatch(setDateBetweenModalOpen(false));
    },
    [setDateBetweenModalOpen]
  );

  // const monthNames = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  //   Between {monthNames[taskFirstDateState.getMonth()]}{" "}
  // {taskFirstDateState?.getDate()?.toString()}
  // {" - "}
  // {monthNames[taskLastDateState?.getMonth()]}{" "}
  // {taskLastDateState?.getDate()?.toString()}

  return (
    <TouchableOpacity
      style={{ top: 40 }}
      onPressIn={() => Vibration.vibrate(10)}
      onPress={() => dispatch(setDateBetweenModalOpen(true))}
    >
      <TextInput
        style={{
          height: 49.5,
          borderTopWidth: 1,
          paddingLeft: 20,
          marginLeft: 7,
          marginRight: 7,
          marginBottom: 10,
          borderColor: theme.borderColor,
          color: theme.fadedPrimaryText,
          textAlign: "left",
        }}
        editable={false}
        selectTextOnFocus={false}
      >
        Press to Select Date
      </TextInput>
      <DatePickerModal
        locale="en-GB"
        mode="range"
        visible={dateBetweenModalOpenState}
        onDismiss={onDismiss}
        startDate={new Date(taskFirstDateState)}
        endDate={new Date(taskLastDateState)}
        onConfirm={onConfirm}
      />
    </TouchableOpacity>
  );
};

export default DayBetween;
