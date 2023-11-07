import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import TaskName from "../components/add/TaskName";
import Frequency from "../components/add/frequencyComponents/Frequency";
import Share from "../components/add/shareComponents/Share";
// import Reminder from "../components/add/reminderComponents/Reminder";
import Color from "../components/add/Color";

const Add = (props: {
  navigation: any;
  currentUser: { friends: Array<object>; pending: boolean };
  taskName: any;
  setTaskName: any;
  openFrequency: any;
  setOpenFrequency: any;
  taskUpcomingDates: any;
  setTaskUpcomingDates: any;
  taskFirstDate: any;
  setTaskFirstDate: any;
  taskLastDate: any;
  setTaskLastDate: any;
  dateBetweenModalOpen: any;
  setDateBetweenModalOpen: any;
  shareWithFriendList: any;
  setShareWithFriendList: any;
  openShare: any;
  setOpenShare: any;
  color: any;
  setColor: any;
}) => {
  const {
    navigation,
    currentUser,
    taskName,
    setTaskName,
    openFrequency,
    setOpenFrequency,
    taskUpcomingDates,
    setTaskUpcomingDates,
    taskFirstDate,
    setTaskFirstDate,
    taskLastDate,
    setTaskLastDate,
    dateBetweenModalOpen,
    setDateBetweenModalOpen,
    shareWithFriendList,
    setShareWithFriendList,
    openShare,
    setOpenShare,
    color,
    setColor,
  } = props;

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
