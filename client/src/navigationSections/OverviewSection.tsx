import * as React from "react";
import { Pressable, Vibration, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavParamList } from "../../src/types/BottomTabNavParamList";
import Overview from "../../src/screens/Overview";
import Settings from "../../src/screens/Settings";
import TopNavbarLogo from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarLogo";
import TopNavbarBackButton from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarBackButton";
import TopNavbarShareButton from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarShareButton";
import TopNavbarSettingsButton from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarSettingsButton";
import { useTheme } from "../context/ThemeContext";

const StackNavigator = createStackNavigator<StackNavParamList>();

const OverviewSection = (props: any) => {
  const {
    navigation,
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
  } = props;
  const { theme } = useTheme();

  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerStyle: { height: 70, backgroundColor: theme.backgroundColor },
        headerTitleStyle: { color: theme.borderColor },
      }}
    >
      <StackNavigator.Screen
        name="Overview"
        children={(props: any) => (
          <Overview
            {...props}
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
              <TopNavbarLogo />
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
                  <TopNavbarShareButton />
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
                  <TopNavbarSettingsButton />
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
                <TopNavbarBackButton />
              </Pressable>
            </View>
          ),
        }}
      />
    </StackNavigator.Navigator>
  );
};

export default OverviewSection;
