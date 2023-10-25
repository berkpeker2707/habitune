import * as React from "react";

import { ScrollView, View } from "react-native";
import DotGraph from "../components/overview/DotGraph";
import StreakGraph from "../components/overview/StreakGraph";
import {
  fetchAllHabitsOfSelectedUserAction,
  selectHabitsOfSelectedUser,
} from "../state/habitSlice";
import { useSelector } from "../state/store";
import { useEffect } from "react";

const Friend = (props: any) => {
  const { navigation, dispatch, habitUpdated, habitLoading } = props;

  useEffect(() => {
    dispatch(
      fetchAllHabitsOfSelectedUserAction(
        navigation.getState().routes[0].state.routes[2].params.friendID
      )
    );
  }, [navigation.getState().routes[0].state.routes[2].params.friendID]);

  const allHabitsOfSelectedUser = useSelector(selectHabitsOfSelectedUser);

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
          allHabitsNumber={allHabitsOfSelectedUser.length}
          habitUpdated={habitUpdated}
          habitLoading={habitLoading}
        />
        <View style={{ margin: 20 }}></View>
        <DotGraph
          allHabits={allHabitsOfSelectedUser}
          allHabitsNumber={allHabitsOfSelectedUser.length}
          habitUpdated={habitUpdated}
          habitLoading={habitLoading}
          isItCurrentUser={false}
        />
      </ScrollView>
    </View>
  );
};

export default Friend;
