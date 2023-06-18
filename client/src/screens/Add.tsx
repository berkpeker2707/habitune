import * as React from "react";
import { useState } from "react";

import { Button, ScrollView, Text, View } from "react-native";

// import AddTaskGroup from "../components/add/AddTaskGroup";
// import AddTaskFrequency from "../components/add/AddTaskFrequency";
// import AddTaskShare from "../components/add/AddTaskShare";
// import AddTaskShareONLY from "../components/add/AddTaskShareONLY";
// import ShareWithYourFriends from "../components/add/ShareWithYourFriends";

import TaskName from "../components/add/TaskName";
import Frequency from "../components/add/frequencyComponents/Frequency";
import Share from "../components/add/shareComponents/Share";

import Reminder from "../components/add/Reminder";
import Color from "../components/add/Color";

export function Add(props: any) {
  // const [newHabitState, setNewHabitState] = useState<{
  //   name: string | undefined;
  //   frequency: Date[] | undefined;
  //   sharedWith: String[] | undefined;
  //   reminder: string | undefined;
  // }>({
  //   name: "",
  //   frequency: [], //firstDate, lastDate & ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"](upcomingDates)
  //   sharedWith: [],
  //   reminder: "", //date with hour; take hour part and equalize it with frequency first and last date hour
  // });

  const sendNewHabitNameState = (taskName: string) => {
    props.navigation.setParams({
      name: taskName,
    });
  };

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
          marginBottom: 95,
        }}
      >
        <Text>Add</Text>
        <TaskName sendNewHabitNameState={sendNewHabitNameState} />
        <Frequency />
        <Share />
        <Reminder />
        <Color />
      </ScrollView>
    </View>
  );
}
