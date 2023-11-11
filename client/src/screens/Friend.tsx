import * as React from "react";

import { ScrollView, TextInput, View, Text } from "react-native";
import DotGraph from "../components/overview/DotGraph";
import StreakGraph from "../components/overview/StreakGraph";
import SkeletonPlaceholder from "../components/skeleton/SkeletonPlaceholder";
import { memo } from "react";

const Friend = memo((props: any) => {
  const {
    dispatch,
    fetchAllHabitsAction,
    fetchAllHabitsOfSelectedUserAction,
    allHabitsOfSelectedUser,
    allHabitsOfSelectedUserNumber,
    habitLoading,
    refreshing,
    setRefreshing,
    isItCurrentUser,
    friendCurrentHabitWeekStreakState,
    friendAllHabitDatesDotsState,
  } = props;
  if (
    (habitLoading && allHabitsOfSelectedUserNumber === 0) ||
    (habitLoading && allHabitsOfSelectedUserNumber === undefined) ||
    friendCurrentHabitWeekStreakState === undefined ||
    friendAllHabitDatesDotsState === undefined ||
    allHabitsOfSelectedUser === undefined
  ) {
    console.log(friendCurrentHabitWeekStreakState.length);
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
    allHabitsOfSelectedUserNumber > 0 &&
    friendCurrentHabitWeekStreakState.length > 0
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
          <SkeletonPlaceholder
            colorMode={"light"}
            width={345}
            height={39.5}
            radius={0}
          />
        </ScrollView>
      </View>
    );
  } else if (
    !habitLoading &&
    allHabitsOfSelectedUserNumber > 0 &&
    friendCurrentHabitWeekStreakState.length > 0
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
            allHabits={allHabitsOfSelectedUser}
            currentHabitWeekStreak={friendCurrentHabitWeekStreakState}
          />
          <View style={{ margin: 20 }}></View>
          <DotGraph
            dispatch={dispatch}
            fetchAllHabitsAction={fetchAllHabitsAction}
            fetchAllHabitsOfSelectedUserAction={
              fetchAllHabitsOfSelectedUserAction
            }
            allHabits={allHabitsOfSelectedUser}
            allHabitsNumber={allHabitsOfSelectedUserNumber}
            habitLoading={habitLoading}
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            isItCurrentUser={isItCurrentUser}
            allHabitDatesDots={friendAllHabitDatesDotsState}
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
});

export default Friend;
