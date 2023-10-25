import * as React from "react";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import TaskName from "../components/add/TaskName";
import Frequency from "../components/add/frequencyComponents/Frequency";
import Share from "../components/add/shareComponents/Share";
// import Reminder from "../components/add/reminderComponents/Reminder";
import Color from "../components/add/Color";

const Add = (props: any) => {
  const { currentUser, navigation } = props;

  const [taskName, setTaskName] = useState<string>("");
  const [openFrequency, setOpenFrequency] = useState<boolean>(false);
  const [taskUpcomingDates, setTaskUpcomingDates] = useState<string[]>([
    // "Sun",
    // "Mon",
    // "Tue",
    // "Wed",
    // "Thu",
    // "Fri",
    // "Sat",
  ]);
  const [taskFirstDate, setTaskFirstDate] = useState<Date | any>(
    new Date(
      new Date(Date.now()).getFullYear(),
      new Date(Date.now()).getMonth(),
      new Date(Date.now()).getDate(),
      new Date(Date.now()).getHours(),
      new Date(Date.now()).getMinutes(),
      new Date(Date.now()).getSeconds()
    )
  );
  const [taskLastDate, setTaskLastDate] = useState<Date | any>(
    new Date(
      new Date(Date.now()).getFullYear() + 1,
      new Date(Date.now()).getMonth(),
      new Date(Date.now()).getDate(),
      new Date(Date.now()).getHours(),
      new Date(Date.now()).getMinutes(),
      new Date(Date.now()).getSeconds()
    )
  );
  const [dateBetweenModalOpen, setDateBetweenModalOpen] =
    useState<boolean>(false);
  const [shareWithFriendList, setShareWithFriendList] = useState<string[]>([]);
  const [openShare, setOpenShare] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#968EB0");

  //updating params if taskName changes starts
  useEffect(() => {
    navigation.setParams({
      name: taskName,
    });
  }, [taskName]);
  //updating params if taskName changes ends

  //updating params if frequency changes starts
  useEffect(() => {
    navigation.setParams({
      upcomingDates: taskUpcomingDates,
    });
  }, [taskUpcomingDates]);
  //updating params if frequency changes ends

  //updating params if date between changes starts
  useEffect(() => {
    navigation.setParams({
      firstDate: Date.parse(taskFirstDate),
      lastDate: Date.parse(taskLastDate),
    });
  }, [taskFirstDate, taskLastDate]);
  //updating params if date between changes ends

  //updating params if shareWithFriendList changes starts
  useEffect(() => {
    navigation.setParams({
      friendList: shareWithFriendList,
    });
  }, [shareWithFriendList]);
  //updating params if shareWithFriendList changes ends

  //updating params if color changes starts
  useEffect(() => {
    navigation.setParams({
      color: color,
    });
  }, [color]);
  //updating params if color changes ends

  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        backgroundColor: "#FFFFFF",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <ScrollView
        style={{
          marginBottom: 85,
        }}
      >
        <Text>Add</Text>
        <TaskName taskName={taskName} setTaskName={setTaskName} />
        <Frequency
          openFrequency={openFrequency}
          setOpenFrequency={setOpenFrequency}
          taskUpcomingDates={taskUpcomingDates}
          setTaskUpcomingDates={setTaskUpcomingDates}
          taskFirstDate={taskFirstDate}
          setTaskFirstDate={setTaskFirstDate}
          taskLastDate={taskLastDate}
          setTaskLastDate={setTaskLastDate}
          dateBetweenModalOpen={dateBetweenModalOpen}
          setDateBetweenModalOpen={setDateBetweenModalOpen}
        />
        <Share
          currentUser={currentUser}
          shareWithFriendList={shareWithFriendList}
          setShareWithFriendList={setShareWithFriendList}
          openShare={openShare}
          setOpenShare={setOpenShare}
        />
        {/* <Reminder /> */}
        <Color color={color} setColor={setColor} />
      </ScrollView>
    </View>
  );
};

export default Add;
