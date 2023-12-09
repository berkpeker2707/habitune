import * as React from "react";
import { memo, useEffect } from "react";
import {
  ScrollView,
  TextInput,
  View,
  Text,
  RefreshControl,
  TouchableWithoutFeedback,
} from "react-native";
import DotGraph from "../components/overview/DotGraph";
import StreakGraph from "../components/overview/StreakGraph";
import SkeletonPlaceholder from "../components/skeleton/SkeletonPlaceholder";
import { useTheme } from "../context/ThemeContext";
import { useAppDispatch, useSelector } from "../state/store";
import {
  allHabitsNumber,
  refreshHabits,
  selectCurrentHabitWeekStreak,
  selectHabitLoading,
  selectHabits,
  setSelectedOverviewHabit,
} from "../state/habitSlice";
import { useIsFocused } from "@react-navigation/native";
import refreshCurrentUsersHabits from "../helpers/refreshers/refreshCurrentUsersHabits";

const Overview = memo(() => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const refreshHabitsState = useSelector(refreshHabits);
  const habitLoading = useSelector(selectHabitLoading);
  const allHabitsNumberState = useSelector(allHabitsNumber);
  const allHabits = useSelector(selectHabits);
  const currentHabitWeekStreakState = useSelector(selectCurrentHabitWeekStreak);

  const isFocused = useIsFocused();

  const handleBlur = () => dispatch(setSelectedOverviewHabit(null));

  useEffect(() => {
    dispatch(setSelectedOverviewHabit(null));
  }, [isFocused]);

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
  } else if (!habitLoading && allHabitsNumberState === 0) {
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
            <RefreshControl
              refreshing={refreshHabitsState}
              onRefresh={() => refreshCurrentUsersHabits(dispatch)}
            />
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
    allHabitsNumberState > 0 &&
    currentHabitWeekStreakState
  ) {
    return (
      <TouchableWithoutFeedback onPress={handleBlur}>
        {/* <View
            style={{
              display: "flex",
              height: "100%",
              backgroundColor: theme.backgroundColor,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          > */}
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={{
            marginBottom: 85,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshHabitsState}
              onRefresh={() => refreshCurrentUsersHabits(dispatch)}
            />
          }
        >
          {currentHabitWeekStreakState.some((value: number) => value !== 0) ? (
            <StreakGraph
              allHabits={allHabits}
              currentHabitWeekStreakState={currentHabitWeekStreakState}
            />
          ) : (
            <></>
          )}
          <View style={{ margin: 20 }}></View>
          <DotGraph />
        </ScrollView>
        {/* </View> */}
      </TouchableWithoutFeedback>
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
});

export default Overview;
