import * as React from "react";
import { memo } from "react";
import { View, TouchableOpacity, Vibration } from "react-native";
import DayCircle from "./DayCircle";
import DayBetween from "./DayBetween";
import Daily from "./Daily";
import { useTheme } from "../../../context/ThemeContext";
import { useAppDispatch, useSelector } from "../../../state/store";
import {
  setTaskUpcomingDates,
  taskUpcomingDates,
} from "../../../state/habitSlice";
const FrequencyOpened = memo(() => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const taskUpcomingDatesState = useSelector(taskUpcomingDates);
  return (
    <View
      style={{
        backgroundColor: theme.backgroundColor,
        width: 345,
        height: 189,
        borderRadius: 20,
        borderColor:
          taskUpcomingDatesState.length > 0
            ? theme.primaryColor
            : theme.warningColor,
        borderWidth: 0.5,
        marginBottom: 10,
      }}
    >
      <Daily />
      <TouchableOpacity
        onPressIn={() => Vibration.vibrate(10)}
        onPress={() => {
          const updatedDates = taskUpcomingDatesState.includes("Mon")
            ? taskUpcomingDatesState.filter((item: string) => item !== "Mon")
            : [...taskUpcomingDatesState, "Mon"];
          dispatch(setTaskUpcomingDates(updatedDates));
        }}
      >
        <DayCircle
          day={"M"}
          left={20}
          dayCircleMarked={
            taskUpcomingDatesState.includes("Mon") ? true : false
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPressIn={() => Vibration.vibrate(10)}
        onPress={() => {
          const updatedDates = taskUpcomingDatesState.includes("Tue")
            ? taskUpcomingDatesState.filter((item: string) => item !== "Tue")
            : [...taskUpcomingDatesState, "Tue"];
          dispatch(setTaskUpcomingDates(updatedDates));
        }}
      >
        <DayCircle
          day={"Tu"}
          left={65}
          dayCircleMarked={
            taskUpcomingDatesState.includes("Tue") ? true : false
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPressIn={() => Vibration.vibrate(10)}
        onPress={() => {
          const updatedDates = taskUpcomingDatesState.includes("Wed")
            ? taskUpcomingDatesState.filter((item: string) => item !== "Wed")
            : [...taskUpcomingDatesState, "Wed"];
          dispatch(setTaskUpcomingDates(updatedDates));
        }}
      >
        <DayCircle
          day={"W"}
          left={110}
          dayCircleMarked={
            taskUpcomingDatesState.includes("Wed") ? true : false
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPressIn={() => Vibration.vibrate(10)}
        onPress={() => {
          const updatedDates = taskUpcomingDatesState.includes("Thu")
            ? taskUpcomingDatesState.filter((item: string) => item !== "Thu")
            : [...taskUpcomingDatesState, "Thu"];
          dispatch(setTaskUpcomingDates(updatedDates));
        }}
      >
        <DayCircle
          day={"Th"}
          left={155}
          dayCircleMarked={
            taskUpcomingDatesState.includes("Thu") ? true : false
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPressIn={() => Vibration.vibrate(10)}
        onPress={() => {
          const updatedDates = taskUpcomingDatesState.includes("Fri")
            ? taskUpcomingDatesState.filter((item: string) => item !== "Fri")
            : [...taskUpcomingDatesState, "Fri"];
          dispatch(setTaskUpcomingDates(updatedDates));
        }}
      >
        <DayCircle
          day={"F"}
          left={200}
          dayCircleMarked={
            taskUpcomingDatesState.includes("Fri") ? true : false
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPressIn={() => Vibration.vibrate(10)}
        onPress={() => {
          const updatedDates = taskUpcomingDatesState.includes("Sat")
            ? taskUpcomingDatesState.filter((item: string) => item !== "Sat")
            : [...taskUpcomingDatesState, "Sat"];
          dispatch(setTaskUpcomingDates(updatedDates));
        }}
      >
        <DayCircle
          day={"Sa"}
          left={245}
          dayCircleMarked={
            taskUpcomingDatesState.includes("Sat") ? true : false
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPressIn={() => Vibration.vibrate(10)}
        onPress={() => {
          const updatedDates = taskUpcomingDatesState.includes("Sun")
            ? taskUpcomingDatesState.filter((item: string) => item !== "Sun")
            : [...taskUpcomingDatesState, "Sun"];
          dispatch(setTaskUpcomingDates(updatedDates));
        }}
      >
        <DayCircle
          day={"Su"}
          left={290}
          dayCircleMarked={
            taskUpcomingDatesState.includes("Sun") ? true : false
          }
        />
      </TouchableOpacity>
      <DayBetween />
    </View>
  );
});

export default FrequencyOpened;
