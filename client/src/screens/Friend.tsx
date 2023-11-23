import * as React from "react";

import { ScrollView, TextInput, View, Text } from "react-native";
import DotGraph from "../components/overview/DotGraph";
import StreakGraph from "../components/overview/StreakGraph";
import SkeletonPlaceholder from "../components/skeleton/SkeletonPlaceholder";
import { useTheme } from "../context/ThemeContext";

const Friend = (props: {
  dispatch: Function;
  fetchAllHabitsAction: Function;
  fetchAllHabitsOfSelectedUserAction: Function;
  allHabitsOfSelectedUser: [];
  allHabitsOfSelectedUserNumber: number;
  habitLoading: boolean;
  refreshing: boolean;
  setRefreshing: Function;
  isItCurrentUser: boolean;
  friendCurrentHabitWeekStreakState: [];
  friendAllHabitDatesDotsState: [];
}) => {
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
  const { theme } = useTheme();

  if (habitLoading) {
    return (
      <View
        style={{
          display: "flex",
          height: "100%",
          backgroundColor: theme.backgroundColor,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ScrollView
          style={{
            marginBottom: 0,
          }}
        >
          <Text style={{ color: theme.primaryText }}>Loading...</Text>
          <SkeletonPlaceholder width={345} height={39.5} radius={0} />
        </ScrollView>
      </View>
    );
  } else if (!habitLoading && allHabitsOfSelectedUserNumber === 0) {
    return (
      <View
        style={{
          display: "flex",
          height: "100%",
          backgroundColor: theme.backgroundColor,
          justifyContent: "center",
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
              color: theme.fadedShadowColor,
              textAlign: "center",
            }}
            editable={false}
            selectTextOnFocus={false}
          >
            Habits Empty 😔
          </TextInput>
        </ScrollView>
      </View>
    );
  } else if (
    !habitLoading &&
    allHabitsOfSelectedUserNumber > 0 &&
    friendCurrentHabitWeekStreakState
  ) {
    return (
      <View
        style={{
          display: "flex",
          height: "100%",
          backgroundColor: theme.backgroundColor,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <ScrollView
          style={{
            marginBottom: 85,
          }}
        >
          {friendCurrentHabitWeekStreakState.some(
            (value: number) => value !== 0
          ) ? (
            <>
              <StreakGraph
                allHabits={allHabitsOfSelectedUser}
                currentHabitWeekStreak={friendCurrentHabitWeekStreakState}
              />
              <View style={{ margin: 20 }}></View>
            </>
          ) : (
            <></>
          )}
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
          backgroundColor: theme.backgroundColor,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>"I have no memory of this place..." 🧙🏻</Text>
      </View>
    );
  }
};

export default Friend;
