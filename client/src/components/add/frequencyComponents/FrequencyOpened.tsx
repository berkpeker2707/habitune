import * as React from "react";
import { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import DayCircle from "./DayCircle";
import DayBetween from "./DayBetween";
import Daily from "./Daily";
const FrequencyOpened = memo(
  (props: {
    taskUpcomingDates: string[];
    setTaskUpcomingDates: Function;
    taskFirstDate: Date;
    setTaskFirstDate: Function;
    taskLastDate: Date;
    setTaskLastDate: Function;
    dateBetweenModalOpen: boolean;
    setDateBetweenModalOpen: Function;
  }) => {
    const {
      taskUpcomingDates,
      setTaskUpcomingDates,
      taskFirstDate,
      setTaskFirstDate,
      taskLastDate,
      setTaskLastDate,
      dateBetweenModalOpen,
      setDateBetweenModalOpen,
    } = props;
    return (
      <View
        style={{
          backgroundColor: "#FFFFFF",
          width: 345,
          height: 189,
          borderRadius: 20,
          borderColor: taskUpcomingDates.length > 0 ? "#968EB0" : "red",
          borderWidth: 0.5,
          marginBottom: 10,
        }}
      >
        <Daily />
        <TouchableOpacity
          onPress={() =>
            taskUpcomingDates.includes("Mon")
              ? setTaskUpcomingDates(() =>
                  taskUpcomingDates.filter((item: string) => item !== "Mon")
                )
              : setTaskUpcomingDates((prevState: Array<String>) => [
                  ...prevState,
                  "Mon",
                ])
          }
        >
          <DayCircle
            day={"M"}
            left={20}
            dayCircleMarked={taskUpcomingDates.includes("Mon") ? true : false}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            taskUpcomingDates.includes("Tue")
              ? setTaskUpcomingDates(() =>
                  taskUpcomingDates.filter((item: string) => item !== "Tue")
                )
              : setTaskUpcomingDates((prevState: Array<String>) => [
                  ...prevState,
                  "Tue",
                ])
          }
        >
          <DayCircle
            day={"Tu"}
            left={65}
            dayCircleMarked={taskUpcomingDates.includes("Tue") ? true : false}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            taskUpcomingDates.includes("Wed")
              ? setTaskUpcomingDates(() =>
                  taskUpcomingDates.filter((item: string) => item !== "Wed")
                )
              : setTaskUpcomingDates((prevState: Array<String>) => [
                  ...prevState,
                  "Wed",
                ])
          }
        >
          <DayCircle
            day={"W"}
            left={110}
            dayCircleMarked={taskUpcomingDates.includes("Wed") ? true : false}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            taskUpcomingDates.includes("Thu")
              ? setTaskUpcomingDates(() =>
                  taskUpcomingDates.filter((item: string) => item !== "Thu")
                )
              : setTaskUpcomingDates((prevState: Array<String>) => [
                  ...prevState,
                  "Thu",
                ])
          }
        >
          <DayCircle
            day={"Th"}
            left={155}
            dayCircleMarked={taskUpcomingDates.includes("Thu") ? true : false}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            taskUpcomingDates.includes("Fri")
              ? setTaskUpcomingDates(() =>
                  taskUpcomingDates.filter((item: string) => item !== "Fri")
                )
              : setTaskUpcomingDates((prevState: Array<String>) => [
                  ...prevState,
                  "Fri",
                ])
          }
        >
          <DayCircle
            day={"F"}
            left={200}
            dayCircleMarked={taskUpcomingDates.includes("Fri") ? true : false}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            taskUpcomingDates.includes("Sat")
              ? setTaskUpcomingDates(() =>
                  taskUpcomingDates.filter((item: string) => item !== "Sat")
                )
              : setTaskUpcomingDates((prevState: Array<String>) => [
                  ...prevState,
                  "Sat",
                ])
          }
        >
          <DayCircle
            day={"Sa"}
            left={245}
            dayCircleMarked={taskUpcomingDates.includes("Sat") ? true : false}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            taskUpcomingDates.includes("Sun")
              ? setTaskUpcomingDates(() =>
                  taskUpcomingDates.filter((item: string) => item !== "Sun")
                )
              : setTaskUpcomingDates((prevState: Array<String>) => [
                  ...prevState,
                  "Sun",
                ])
          }
        >
          <DayCircle
            day={"Su"}
            left={290}
            dayCircleMarked={taskUpcomingDates.includes("Sun") ? true : false}
          />
        </TouchableOpacity>
        <DayBetween
          taskFirstDate={taskFirstDate}
          setTaskFirstDate={setTaskFirstDate}
          taskLastDate={taskLastDate}
          setTaskLastDate={setTaskLastDate}
          dateBetweenModalOpen={dateBetweenModalOpen}
          setDateBetweenModalOpen={setDateBetweenModalOpen}
        />
      </View>
    );
  }
);

export default FrequencyOpened;
