import * as React from "react";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import DotGraph from "../components/overview/DotGraph";
import StreakGraph from "../components/overview/StreakGraph";

const Overview = (props: {
  dispatch: Function;
  fetchAllHabitsAction: Function;
  fetchAllHabitsOfSelectedUserAction: Function;
  allHabits: Array<object>;
  habitUpdated: boolean;
  habitLoading: boolean;
  isInArray: Function;
}) => {
  const {
    dispatch,
    fetchAllHabitsAction,
    fetchAllHabitsOfSelectedUserAction,
    allHabits,
    habitUpdated,
    habitLoading,
    isInArray,
  } = props;

  const [refreshing, setRefreshing] = useState(false);

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
          isInArray={isInArray}
        />
        <View style={{ margin: 20 }}></View>
        <DotGraph
          dispatch={dispatch}
          fetchAllHabitsAction={fetchAllHabitsAction}
          fetchAllHabitsOfSelectedUserAction={
            fetchAllHabitsOfSelectedUserAction
          }
          allHabits={allHabits}
          allHabitsNumber={allHabits.length}
          habitLoading={habitLoading}
          refreshing={refreshing}
          setRefreshing={setRefreshing}
          isInArray={isInArray}
          isItCurrentUser={true}
        />
      </ScrollView>
    </View>
  );
};

export default Overview;
