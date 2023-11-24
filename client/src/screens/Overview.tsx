import * as React from "react";
import { memo, useCallback } from "react";

import {
  ScrollView,
  TextInput,
  View,
  Text,
  RefreshControl,
} from "react-native";
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

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      isItCurrentUser
        ? dispatch(
            fetchAllHabitsAction(
              new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate(),
                new Date().getHours(),
                new Date().getMinutes(),
                new Date().getSeconds()
              ).getTime()
            )
          )
        : // : dispatch(fetchAllHabitsOfSelectedUserAction());
          "";
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);

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
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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
