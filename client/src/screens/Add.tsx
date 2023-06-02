import * as React from "react";
import { Text, View } from "react-native";
import AddTaskGroup from "../components/add/AddTaskGroup";

export function Add() {
  return (
    <View className="flex-1 items-center justify-center bg-sky-100">
      <Text>Add</Text>
      <AddTaskGroup />
    </View>
  );
}
