import * as React from "react";
import { Text, View } from "react-native";
import AddTaskGroup from "../components/add/AddTaskGroup";
import AddTaskFrequency from "../components/add/AddTaskFrequency";

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
      <Text>Add</Text>
      <AddTaskGroup />
      {/* <AddTaskFrequency /> */}
    </View>
  );
}
