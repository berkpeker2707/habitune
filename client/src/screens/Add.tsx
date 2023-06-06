import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import AddTaskGroup from "../components/add/AddTaskGroup";
import AddTaskFrequency from "../components/add/AddTaskFrequency";
import AddTaskShare from "../components/add/AddTaskShare";
import AddTaskShareONLY from "../components/add/AddTaskShareONLY";
import TaskName from "../components/add/TaskName";
import Frequency from "../components/add/Frequency";
import ShareWithYourFriends from "../components/add/ShareWithYourFriends";
import Reminder from "../components/add/Reminder";
import Color from "../components/add/Color";

export function Add() {
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
      <ScrollView>
        <Text>Add</Text>
        <TaskName />
        <Frequency />
        <ShareWithYourFriends />
        <Reminder />
        <Color />

        {/* <AddTaskShare /> */}
      </ScrollView>
    </View>
  );
}
