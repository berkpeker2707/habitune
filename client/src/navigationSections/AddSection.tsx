import * as React from "react";
import { memo } from "react";
import { Pressable, View, Vibration } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavParamList } from "../../src/types/BottomTabNavParamList";
import Add from "../../src/screens/Add";
import BackIcon from "../components/icons/BackIcon";
import DoneIcon from "../components/icons/DoneIcon";
import { useTheme } from "../context/ThemeContext";
import { useAppDispatch, useSelector } from "../state/store";
import {
  taskFirstDate,
  taskLastDate,
  taskUpcomingDates,
  shareWithFriendList,
  color,
  taskName,
  createHabitAction,
} from "../state/habitSlice";

const StackNavigator = createStackNavigator<StackNavParamList>();

const AddSection = memo((props: any) => {
  const { navigation } = props;
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const taskFirstDateState = useSelector(taskFirstDate);
  const taskLastDateState = useSelector(taskLastDate);
  const taskUpcomingDatesState = useSelector(taskUpcomingDates);
  const shareWithFriendListState = useSelector(shareWithFriendList);
  const colorState = useSelector(color);
  const taskNameState = useSelector(taskName);

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
        children={(props: any) => <Add {...props} navigation={navigation} />}
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
                  taskFirstDateState && taskLastDateState && taskNameState
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
                        name: taskNameState,
                        upcomingDates: taskUpcomingDatesState,
                        color: colorState,
                        friendList: shareWithFriendListState,
                      })
                    );
                    navigation.navigate("HomeSection");
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
