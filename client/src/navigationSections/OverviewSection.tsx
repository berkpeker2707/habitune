import * as React from "react";
import { Pressable, Vibration, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavParamList } from "../../src/types/BottomTabNavParamList";
import Overview from "../../src/screens/Overview";
import Settings from "../../src/screens/Settings";
import NavbarLogo from "../components/icons/NavbarLogo";
import BackIcon from "../components/icons/BackIcon";
import ShareIcon from "../components/icons/ShareIcon";
import SettingsIcon from "../components/icons/SettingsIcon";
import { useTheme } from "../context/ThemeContext";

const StackNavigator = createStackNavigator<StackNavParamList>();

const OverviewSection = (props: any) => {
  const {
    navigation,
    refreshCurrentUsersHabits,
    dispatch,
    fetchAllHabitsAction,
    fetchAllHabitsOfSelectedUserAction,
    deleteHabitAction,
    updateHabitHiddenAction,
    revertAll,
    revertAllHabit,
    deleteUserAction,
    sendFeedbackAction,
    allHabits,
    allHabitsNumber,
    habitLoading,
    refreshing,
    setRefreshing,
    onShare,
    currentHabitWeekStreakState,
    allHabitDatesDots,
    selectedOverviewHabit,
    setSelectedOverviewHabit,
    updateHabitColorAction,
    editHabitNameModal,
    setEditHabitNameModal,
    overviewColorModal,
    setOverviewColorModal,
    overviewColor,
    setOverviewColor,
    updateHabitNameAction,
    updateHabitSharedWithAction,
    shareWithFriendListModal,
    setShareWithFriendListModal,
    currentUser,
    shareWithFriendList,
    setShareWithFriendList,
  } = props;
  const { theme } = useTheme();

  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerStyle: { height: 70, backgroundColor: theme.backgroundColor },
        headerTitleStyle: { color: theme.borderColor },
        cardStyle: { backgroundColor: theme.backgroundColor },
      }}
    >
      <StackNavigator.Screen
        name="Overview"
        children={(props: any) => (
          <Overview
            {...props}
            refreshCurrentUsersHabits={refreshCurrentUsersHabits}
            dispatch={dispatch}
            fetchAllHabitsAction={fetchAllHabitsAction}
            fetchAllHabitsOfSelectedUserAction={
              fetchAllHabitsOfSelectedUserAction
            }
            deleteHabitAction={deleteHabitAction}
            updateHabitHiddenAction={updateHabitHiddenAction}
            allHabits={allHabits}
            allHabitsNumber={allHabitsNumber}
            habitLoading={habitLoading}
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            isItCurrentUser={true}
            currentHabitWeekStreakState={currentHabitWeekStreakState}
            allHabitDatesDots={allHabitDatesDots}
            selectedOverviewHabit={selectedOverviewHabit}
            setSelectedOverviewHabit={setSelectedOverviewHabit}
            updateHabitColorAction={updateHabitColorAction}
            editHabitNameModal={editHabitNameModal}
            setEditHabitNameModal={setEditHabitNameModal}
            overviewColorModal={overviewColorModal}
            setOverviewColorModal={setOverviewColorModal}
            overviewColor={overviewColor}
            setOverviewColor={setOverviewColor}
            updateHabitNameAction={updateHabitNameAction}
            updateHabitSharedWithAction={updateHabitSharedWithAction}
            shareWithFriendListModal={shareWithFriendListModal}
            setShareWithFriendListModal={setShareWithFriendListModal}
            currentUser={currentUser}
            shareWithFriendList={shareWithFriendList}
            setShareWithFriendList={setShareWithFriendList}
          />
        )}
        options={{
          headerTitle: "Overview",
          headerLeft: () => (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
              }}
            >
              <NavbarLogo />
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
              }}
            >
              <View>
                <Pressable
                  onPressIn={() => Vibration.vibrate(10)}
                  onPress={() => {
                    try {
                      onShare();
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  <ShareIcon />
                </Pressable>
              </View>
              <View style={{ flexBasis: "100%", height: 0 }}></View>
              <View style={{ paddingRight: 10, paddingLeft: 20 }}>
                <Pressable
                  onPressIn={() => Vibration.vibrate(10)}
                  onPress={() => {
                    try {
                      navigation.navigate("Settings");
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  <SettingsIcon />
                </Pressable>
              </View>
            </View>
          ),
        }}
      />
      <StackNavigator.Screen
        name="Settings"
        children={(props: any) => (
          <Settings
            {...props}
            dispatch={dispatch}
            revertAll={revertAll}
            revertAllHabit={revertAllHabit}
            deleteUserAction={deleteUserAction}
            sendFeedbackAction={sendFeedbackAction}
          />
        )}
        options={{
          headerTitle: "Settings",
          headerLeft: () => (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 10,
              }}
            >
              <Pressable
                onPressIn={() => Vibration.vibrate(10)}
                onPress={() => {
                  try {
                    navigation.goBack();
                  } catch (error) {
                    console.log("Settings Error: ", error);
                  }
                }}
              >
                <BackIcon />
              </Pressable>
            </View>
          ),
        }}
      />
    </StackNavigator.Navigator>
  );
};

export default OverviewSection;
