import * as React from "react";
import { useCallback } from "react";

import { ScrollView, View } from "react-native";
import DotGraph from "../components/overview/DotGraph";
import StreakGraph from "../components/overview/StreakGraph";

import { useFocusEffect } from "@react-navigation/native";

import { useAppDispatch, useSelector } from "../state/store";
import {
  fetchAllHabitsAction,
  selectHabitUpdated,
  selectHabits,
  selectHabitLoading,
} from "../state/habitSlice";

const Overview = () => {
  const controller = new AbortController();

  const dispatch = useAppDispatch();

  const allHabits = useSelector(selectHabits);

  const habitUpdated = useSelector(selectHabitUpdated);
  const habitLoading = useSelector(selectHabitLoading);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchAllHabitsAction());

      return () => {
        controller.abort();
      };
    }, [habitUpdated])
  );

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
      {/* changed from scrollview */}
      <View
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
      </View>
    </View>
  );
};

export default Overview;
