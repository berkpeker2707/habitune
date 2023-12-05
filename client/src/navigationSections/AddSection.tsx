import * as React from "react";
import { memo } from "react";

import { Pressable, View, Vibration } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

//types
import { StackNavParamList } from "../../src/types/BottomTabNavParamList";

// screens
import Add from "../../src/screens/Add";

//navbar components
import BackIcon from "../components/icons/BackIcon";
import DoneIcon from "../components/icons/DoneIcon";
import { useTheme } from "../context/ThemeContext";
import { useAppDispatch, useSelector } from "../state/store";
import {
  taskUpcomingDates,
  setTaskUpcomingDates,
  taskFirstDate,
  setTaskFirstDate,
  taskLastDate,
  setTaskLastDate,
} from "../state/habitSlice";

const StackNavigator = createStackNavigator<StackNavParamList>();

const AddSection = memo((props: any) => {
  const {
    navigation,
    currentUser,
    createHabitAction,
    taskName,
    setTaskName,
    openFrequency,
    setOpenFrequency,
    dateBetweenModalOpen,
    setDateBetweenModalOpen,
    shareWithFriendList,
    setShareWithFriendList,
    openShareHabit,
    setOpenShareHabit,
    color,
    setColor,
  } = props;

  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const taskUpcomingDatesState = useSelector(taskUpcomingDates);
  const taskFirstDateState = useSelector(taskFirstDate);
  const taskLastDateState = useSelector(taskLastDate);

  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerStyle: { height: 70, backgroundColor: theme.backgroundColor },
        headerTitleStyle: { color: theme.borderColor },
        cardStyle: { backgroundColor: theme.backgroundColor },
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
            taskUpcomingDates={taskUpcomingDatesState}
            setTaskUpcomingDates={setTaskUpcomingDates}
            taskFirstDate={taskFirstDateState}
            setTaskFirstDate={setTaskFirstDate}
            taskLastDate={taskLastDateState}
            setTaskLastDate={setTaskLastDate}
            dateBetweenModalOpen={dateBetweenModalOpen}
            setDateBetweenModalOpen={setDateBetweenModalOpen}
            shareWithFriendList={shareWithFriendList}
            setShareWithFriendList={setShareWithFriendList}
            openShareHabit={openShareHabit}
            setOpenShareHabit={setOpenShareHabit}
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
                <BackIcon />
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
                  taskFirstDateState && taskLastDateState && taskName
                    ? false
                    : true
                }
                onPressIn={() => Vibration.vibrate(10)}
                onPress={() => {
                  try {
                    dispatch(
                      createHabitAction({
                        firstDate: Date.parse(taskFirstDateState),
                        lastDate: Date.parse(taskLastDateState),
                        name: taskName,
                        upcomingDates: taskUpcomingDatesState,
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
                <DoneIcon />
              </Pressable>
            </View>
          ),
        }}
      />
    </StackNavigator.Navigator>
  );
});

export default AddSection;
