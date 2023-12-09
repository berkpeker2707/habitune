import * as React from "react";
import { ScrollView, View } from "react-native";
import TaskName from "../components/add/TaskName";
import Frequency from "../components/add/frequencyComponents/Frequency";
import Share from "../components/add/shareComponents/Share";
// import Reminder from "../components/add/reminderComponents/Reminder";
import Color from "../components/add/Color";
import { useTheme } from "../context/ThemeContext";

const Add = () => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        backgroundColor: theme.backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView
        style={{
          marginBottom: 85,
        }}
      >
        <View style={{ paddingTop: 20 }}></View>
        {/* <Text>Add</Text> */}
        <TaskName />
        <Frequency />
        <Share />
        {/* <Reminder /> */}
        <Color />
      </ScrollView>
    </View>
  );
};

export default Add;
