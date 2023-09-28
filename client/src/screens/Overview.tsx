import * as React from "react";

import { ScrollView, View } from "react-native";
import DotGraph from "../components/overview/DotGraph";
import StreakGraph from "../components/overview/StreakGraph";

const Overview = (props: any) => {
  const {
    navigation,
    homeEditState,
    allHabits,
    allHabitsNumber,
    habitUpdated,
    habitLoading,
    currentHabitDatesIncluded,
  } = props;

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
      {/* changed from ScrollView */}
      <ScrollView
        style={{
          marginBottom: 85,
        }}
      >
        <StreakGraph
          allHabits={allHabits}
          allHabitsNumber={allHabits.length}
          habitUpdated={habitUpdated}
          habitLoading={habitLoading}
        />
        <View style={{ margin: 20 }}></View>
        <DotGraph
          allHabits={allHabits}
          allHabitsNumber={allHabits.length}
          habitUpdated={habitUpdated}
          habitLoading={habitLoading}
        />
      </ScrollView>
    </View>
  );
};

export default Overview;
