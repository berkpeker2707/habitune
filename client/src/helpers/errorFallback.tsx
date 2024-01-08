import * as React from "react";
import { View, Text, Pressable, Vibration } from "react-native";
import {
  revertUserAction,
  fetchCurrentUserProfileAction,
} from "../state/userSlice";
import {
  fetchAllHabitsAction,
  fetchAllTodayHabitsAction,
  getTodaysHabitsBooleanAction,
  revertAllHabit,
} from "../state/habitSlice";
import { revertAllNotifications } from "../state/notificationSlice";

import { useAppDispatch } from "../state/store";
import { useTheme } from "../context/ThemeContext";
import { generalScreenProp } from "../types/BottomTabNavParamList";
import { useNavigation } from "@react-navigation/native";
import getCurrentDateAndTime from "./functions/getCurrentDateAndTime";

const CustomFallback = (props: { error: Error; resetError: Function }) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<generalScreenProp>();

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
      <Text style={{ color: theme.primaryColor }}>
        This is quite embarrassing! 😳
      </Text>
      <Text style={{ color: theme.primaryColor }}>
        An unexpected error has occurred.
      </Text>
      <Text style={{ padding: 10 }}>
        <Text style={{ color: theme.warningColor }}>Error: </Text>
        <Text
          style={{
            color: theme.primaryColor,
          }}
        >
          {props.error.toString()}
        </Text>
      </Text>
      <Pressable
        style={{
          backgroundColor: theme.primaryColor,
          borderRadius: 20,
          padding: 10,
          elevation: 2,
        }}
        onPress={() => {
          Vibration.vibrate(10);

          props.resetError;
          dispatch(revertUserAction());

          dispatch(revertAllHabit());

          dispatch(revertAllNotifications());

          dispatch(
            fetchCurrentUserProfileAction(getCurrentDateAndTime().getTime())
          );

          dispatch(fetchAllHabitsAction(getCurrentDateAndTime().getTime()));
          dispatch(
            fetchAllTodayHabitsAction(getCurrentDateAndTime().getTime())
          );
          dispatch(
            getTodaysHabitsBooleanAction(getCurrentDateAndTime().getTime())
          );

          navigation.goBack();
        }}
      >
        <Text
          style={{
            color: theme.backgroundColor,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Try Again
        </Text>
      </Pressable>
    </View>
  );
};

export default CustomFallback;
