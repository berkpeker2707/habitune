import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import DayCircle from "./DayCircle";
import DayBetween from "./DayBetween";
import Daily from "./Daily";
const FrequencyOpened = (props: any) => {
  const [taskUpcomingDates, setTaskUpcomingDates] = useState<String[]>([
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ]);

  //updating params if frequency changes starts
  useEffect(() => {
    props.navigation.setParams({
      upcomingDates: taskUpcomingDates,
    });
  }, [taskUpcomingDates]);
  //updating params if frequency changes ends

  //getting data from component and updating params if date between changes starts
  const sendDayBetweenState = (
    taskFirstDate: string,
    taskLastDate: string,
    taskUpcomingDates: String[]
  ) => {
    props.navigation.setParams({
      firstDate: Date.parse(taskFirstDate),
      lastDate: Date.parse(taskLastDate),
      upcomingDates: taskUpcomingDates,
    });
  };
  //getting data from component and updating params if date between changes ends

  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        width: 345,
        height: 189,
        borderRadius: 20,
        borderColor: "#968EB0",
        borderWidth: 0.5,
        marginBottom: 10,
      }}
    >
      <Daily />
      <TouchableOpacity
        onPress={() =>
          taskUpcomingDates.includes("Mon")
            ? setTaskUpcomingDates(() =>
                taskUpcomingDates.filter((item) => item !== "Mon")
              )
            : setTaskUpcomingDates((prevState) => [...prevState, "Mon"])
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
                taskUpcomingDates.filter((item) => item !== "Tue")
              )
            : setTaskUpcomingDates((prevState) => [...prevState, "Tue"])
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
                taskUpcomingDates.filter((item) => item !== "Wed")
              )
            : setTaskUpcomingDates((prevState) => [...prevState, "Wed"])
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
                taskUpcomingDates.filter((item) => item !== "Thu")
              )
            : setTaskUpcomingDates((prevState) => [...prevState, "Thu"])
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
                taskUpcomingDates.filter((item) => item !== "Fri")
              )
            : setTaskUpcomingDates((prevState) => [...prevState, "Fri"])
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
                taskUpcomingDates.filter((item) => item !== "Sat")
              )
            : setTaskUpcomingDates((prevState) => [...prevState, "Sat"])
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
                taskUpcomingDates.filter((item) => item !== "Sun")
              )
            : setTaskUpcomingDates((prevState) => [...prevState, "Sun"])
        }
      >
        <DayCircle
          day={"Su"}
          left={290}
          dayCircleMarked={taskUpcomingDates.includes("Sun") ? true : false}
        />
      </TouchableOpacity>
      <DayBetween sendDayBetweenState={sendDayBetweenState} />
    </View>
  );
};

export default FrequencyOpened;
