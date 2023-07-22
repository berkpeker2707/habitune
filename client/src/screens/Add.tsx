import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import TaskName from "../components/add/TaskName";
import Frequency from "../components/add/frequencyComponents/Frequency";
import Share from "../components/add/shareComponents/Share";
import Reminder from "../components/add/reminderComponents/Reminder";
import Color from "../components/add/Color";

export function Add(props: any) {
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
        <TaskName navigation={props.navigation} />
        <Frequency navigation={props.navigation} />
        <Share navigation={props.navigation} />
        {/* <Reminder /> */}
        <Color navigation={props.navigation} />
      </ScrollView>
    </View>
  );
}
