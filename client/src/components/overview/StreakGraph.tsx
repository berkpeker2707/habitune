import * as React from "react";
import { TextInput } from "react-native";
import StreakBar from "./StreakGraphBar";
import uuid from "react-native-uuid";
import { View } from "moti";
import { useTheme } from "../../context/ThemeContext";

const StreakGraph = (props: {
  allHabits: any;
  currentHabitWeekStreakState: Array<number>;
}) => {
  const { allHabits, currentHabitWeekStreakState } = props;
  const { theme } = useTheme();

  return (
    <View
      style={{
        display: "flex",
        // height: "100%",
        backgroundColor: theme.backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput
        style={{
          height: 29.5,
          paddingLeft: 20,
          color: theme.fadedShadowColor,
          textAlign: "center",
        }}
        editable={false}
        selectTextOnFocus={false}
      >
        Streaks 🔥
      </TextInput>
      {allHabits.map((allHabitsItem: any, allHabitsIndex: number) => {
        return (
          <StreakBar
            key={uuid.v4() as string}
            name={allHabitsItem.name}
            color={allHabitsItem.color}
            currentHabitWeekStreak={currentHabitWeekStreakState[allHabitsIndex]}
          />
        );
      })}
    </View>
  );
};

export default StreakGraph;
