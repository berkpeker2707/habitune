import * as React from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import StreakBar from "../components/overview/StreakBar";

export function Overview(props: any) {
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
        <TextInput
          style={{
            height: 29.5,
            paddingLeft: 20,
            color: "#444",
            textAlign: "center",
          }}
          editable={false}
          selectTextOnFocus={false}
        >
          Top 3 Streaks 🔥
        </TextInput>
        <StreakBar />
        <StreakBar />
      </ScrollView>
    </View>
  );
}
