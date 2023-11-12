import * as React from "react";
import { memo } from "react";

import { Pressable, View, Vibration } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

//types
import { StackNavParamList } from "../../src/types/BottomTabNavParamList";

// screens
import Add from "../../src/screens/Add";

//navbar components
import TopNavbarBackButton from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarBackButton";
import TopNavbarDoneButton from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarDoneButton";

const StackNavigator = createStackNavigator<StackNavParamList>();

const AddSection = memo((props: any) => {
  const {
    navigation,
    currentUser,
    dispatch,
    createHabitAction,
    taskName,
    setTaskName,
    openFrequency,
    setOpenFrequency,
    taskUpcomingDates,
    setTaskUpcomingDates,
    taskFirstDate,
    setTaskFirstDate,
    taskLastDate,
    setTaskLastDate,
    dateBetweenModalOpen,
    setDateBetweenModalOpen,
    shareWithFriendList,
    setShareWithFriendList,
    openShare,
    setOpenShare,
    color,
    setColor,
  } = props;

  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerStyle: { height: 70 },
      }}
    >
      <StackNavigator.Screen
        name="Add"
        children={(props: any) => (
          <Add
            {...props}
            navigation={navigation}
            currentUser={currentUser}
            taskName={taskName}
            setTaskName={setTaskName}
            openFrequency={openFrequency}
            setOpenFrequency={setOpenFrequency}
            taskUpcomingDates={taskUpcomingDates}
            setTaskUpcomingDates={setTaskUpcomingDates}
            taskFirstDate={taskFirstDate}
            setTaskFirstDate={setTaskFirstDate}
            taskLastDate={taskLastDate}
            setTaskLastDate={setTaskLastDate}
            dateBetweenModalOpen={dateBetweenModalOpen}
            setDateBetweenModalOpen={setDateBetweenModalOpen}
            shareWithFriendList={shareWithFriendList}
            setShareWithFriendList={setShareWithFriendList}
            openShare={openShare}
            setOpenShare={setOpenShare}
            color={color}
            setColor={setColor}
          />
        )}
        options={{
          headerTitle: "New Habit",
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
                    console.log(error);
                  }
                }}
              >
                <TopNavbarBackButton />
              </Pressable>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingRight: 10,
              }}
            >
              <Pressable
                disabled={
                  taskFirstDate && taskLastDate && taskName ? false : true
                }
                onPressIn={() => Vibration.vibrate(10)}
                onPress={() => {
                  try {
                    dispatch(
                      createHabitAction({
                        firstDate: Date.parse(taskFirstDate),
                        lastDate: Date.parse(taskLastDate),
                        name: taskName,
                        upcomingDates: taskUpcomingDates,
                        color: color,
                        friendList: shareWithFriendList,
                      })
                    );
                    navigation.navigate("Home");
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <TopNavbarDoneButton />
              </Pressable>
            </View>
          ),
        }}
      />
    </StackNavigator.Navigator>
  );
});

export default AddSection;
