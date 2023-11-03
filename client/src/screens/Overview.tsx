import * as React from "react";

import { ScrollView, TextInput, View, Text } from "react-native";
import DotGraph from "../components/overview/DotGraph";
import StreakGraph from "../components/overview/StreakGraph";
import SkeletonPlaceholder from "../components/skeleton/SkeletonPlaceholder";

const Overview = (props: any) => {
  const {
    dispatch,
    fetchAllHabitsAction,
    fetchAllHabitsOfSelectedUserAction,
    allHabits,
    allHabitsNumber,
    habitLoading,
    habitUpdated,
    refreshing,
    setRefreshing,
    isItCurrentUser,
    currentHabitWeekStreakState,
    allHabitDatesDots,
  } = props;

  if (
    (habitLoading && allHabitsNumber === 0) ||
    (habitLoading && allHabitsNumber === undefined) ||
    currentHabitWeekStreakState === undefined ||
    allHabitDatesDots === undefined ||
    allHabits === undefined
  ) {
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
            marginBottom: 0,
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
            Streaks Empty 😔
          </TextInput>
        </ScrollView>
      </View>
    );
  } else if (
    habitLoading &&
    allHabitsNumber > 0 &&
    currentHabitWeekStreakState.length > 0
  ) {
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
            marginBottom: 0,
          }}
        >
          {Array(allHabitsNumber)
            .fill(0)
            .map((_, i) => (
              <SkeletonPlaceholder
                key={i}
                colorMode={"light"}
                width={345}
                height={39.5}
                radius={0}
              />
            ))}
        </ScrollView>
      </View>
    );
  } else if (
    !habitLoading &&
    allHabitsNumber > 0 &&
    currentHabitWeekStreakState.length > 0
  ) {
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
          <StreakGraph
            allHabits={allHabits}
            currentHabitWeekStreak={currentHabitWeekStreakState}
          />
          <View style={{ margin: 20 }}></View>
          <DotGraph
            dispatch={dispatch}
            fetchAllHabitsAction={fetchAllHabitsAction}
            fetchAllHabitsOfSelectedUserAction={
              fetchAllHabitsOfSelectedUserAction
            }
            allHabits={allHabits}
            allHabitsNumber={allHabitsNumber}
            habitLoading={habitLoading}
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            isItCurrentUser={isItCurrentUser}
            allHabitDatesDots={allHabitDatesDots}
          />
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View
        style={{
          display: "flex",
          height: "100%",
          backgroundColor: "#FFFFFF",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>"I have no memory of this place..." 🧙🏻</Text>
      </View>
    );
  }
};

export default Overview;
