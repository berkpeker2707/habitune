import * as React from "react";
import { memo } from "react";

import { ScrollView, TextInput, View, Text } from "react-native";
import DotGraph from "../components/overview/DotGraph";
import StreakGraph from "../components/overview/StreakGraph";
import SkeletonPlaceholder from "../components/skeleton/SkeletonPlaceholder";
import { useTheme } from "../context/ThemeContext";

const Overview = memo(
  (props: {
    dispatch: Function;
    fetchAllHabitsAction: Function;
    fetchAllHabitsOfSelectedUserAction: Function;
    allHabits: [];
    allHabitsNumber: number;
    habitLoading: boolean;
    refreshing: boolean;
    setRefreshing: Function;
    isItCurrentUser: boolean;
    currentHabitWeekStreakState: [];
    allHabitDatesDots: [];
  }) => {
    const {
      dispatch,
      fetchAllHabitsAction,
      fetchAllHabitsOfSelectedUserAction,
      allHabits,
      allHabitsNumber,
      habitLoading,
      refreshing,
      setRefreshing,
      isItCurrentUser,
      currentHabitWeekStreakState,
      allHabitDatesDots,
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
            <Text>Loading...</Text>
            <SkeletonPlaceholder width={345} height={39.5} radius={0} />
          </ScrollView>
        </View>
      );
    } else if (!habitLoading && allHabitsNumber === 0) {
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
              Streaks Empty 😔
            </TextInput>
          </ScrollView>
        </View>
      );
    } else if (
      !habitLoading &&
      allHabitsNumber > 0 &&
      currentHabitWeekStreakState
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
            {currentHabitWeekStreakState.some(
              (value: number) => value !== 0
            ) ? (
              <>
                <StreakGraph
                  allHabits={allHabits}
                  currentHabitWeekStreak={currentHabitWeekStreakState}
                />
              </>
            ) : (
              <></>
            )}
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
            backgroundColor: theme.backgroundColor,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>"I have no memory of this place..." 🧙🏻</Text>
        </View>
      );
    }
  }
);

export default Overview;
