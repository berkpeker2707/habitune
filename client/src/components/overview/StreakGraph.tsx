import * as React from "react";
import { TextInput } from "react-native";
import StreakBar from "./StreakGraphBar";

function StreakGraph() {
  return (
    <>
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
    </>
  );
}

export default StreakGraph;
