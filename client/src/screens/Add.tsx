import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import AddTaskGroup from "../components/add/AddTaskGroup";
import AddTaskFrequency from "../components/add/AddTaskFrequency";
import AddTaskShare from "../components/add/AddTaskShare";
import AddTaskShareONLY from "../components/add/AddTaskShareONLY";

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
        {/* <AddTaskGroup /> */}
        {/* <AddTaskFrequency /> */}
        <AddTaskShare />
        {/* <AddTaskShareONLY /> */}
      </ScrollView>
    </View>
  );
}
