import * as React from "react";
import StreakBar from "./StreakGraphBar";
import uuid from "react-native-uuid";
import { View, Text } from "moti";
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
      <Text style={{ textAlign: "center", paddingLeft: 20 }}>
        <Text
          style={{
            height: 29.5,

            color: theme.fadedShadowColor,

            fontSize: 16,
          }}
        >
          Streaks
        </Text>
        <Text
          style={{
            height: 29.5,

            color: theme.fadedShadowColor,

            fontSize: 14,
          }}
        >
          🔥
        </Text>
      </Text>
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
