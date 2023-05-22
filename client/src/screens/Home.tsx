import * as React from "react";
import { Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import HabitBar from "../components/home/HabitBar";
import HabitBarFilled from "../components/home/HabitBarFilled";

const DATA = [
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
];

const renderItem = ({ ...DATA }) => (
  // <Text
  //   style={{
  //     flex: 1,
  //     flexDirection: "column",
  //     height: "100%",
  //     alignItems: "center",
  //     justifyContent: "center",
  //     textAlign: "center",
  //   }}
  // >
  //   {DATA.item.title}
  // </Text>
  // <HabitBar />
  <HabitBarFilled />
);

export function Home() {
  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Text>Habits</Text>
      <FlashList data={DATA} renderItem={renderItem} estimatedItemSize={20} />
    </View>
  );
}
