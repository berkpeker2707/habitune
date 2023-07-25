import * as React from "react";
import { TextInput } from "react-native";
import StreakBar from "./StreakGraphBar";

const StreakGraph = () => {
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
      <StreakBar name="Gunluk su ic & protein tozu ic" color="#968EB0" />
      <StreakBar name="Gunluk su ic & protein tozu ic" color="#C04F43" />
    </>
  );
};

export default StreakGraph;
