import * as React from "react";
import { TextInput } from "react-native";
import StreakBar from "./StreakGraphBar";

import uuid from "react-native-uuid";
import { View } from "moti";

const StreakGraph = (props: {
  allHabits: any;
  currentHabitWeekStreak: Array<number>;
}) => {
  const { allHabits, currentHabitWeekStreak } = props;

  return (
    <View>
      <View
        style={{
          display: "flex",
          // height: "100%",
          backgroundColor: "#FFFFFF",
          justifyContent: "center",
          alignItems: "center",
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
          Streaks 🔥
        </TextInput>
        {allHabits.map((allHabitsItem: any, allHabitsIndex: number) => {
          return (
            <StreakBar
              key={uuid.v4() as string}
              name={allHabitsItem.name}
              color={allHabitsItem.color}
              currentHabitWeekStreak={currentHabitWeekStreak[allHabitsIndex]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default StreakGraph;
