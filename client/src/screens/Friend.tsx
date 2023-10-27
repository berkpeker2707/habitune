import * as React from "react";

import { ScrollView, View } from "react-native";
import DotGraph from "../components/overview/DotGraph";
import StreakGraph from "../components/overview/StreakGraph";

const Friend = (props: any) => {
  const {
    dispatch,
    fetchAllHabitsAction,
    fetchAllHabitsOfSelectedUserAction,
    allHabitsOfSelectedUser,
    allHabitsOfSelectedUserNumber,
    habitLoading,
    habitUpdated,
    refreshing,
    setRefreshing,
    isInArray,
    isItCurrentUser,
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
          allHabits={allHabitsOfSelectedUser}
          allHabitsNumber={allHabitsOfSelectedUserNumber}
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
          allHabits={allHabitsOfSelectedUser}
          allHabitsNumber={allHabitsOfSelectedUserNumber}
          habitLoading={habitLoading}
          refreshing={refreshing}
          setRefreshing={setRefreshing}
          isInArray={isInArray}
          isItCurrentUser={isItCurrentUser}
        />
      </ScrollView>
    </View>
  );
};

export default Friend;
