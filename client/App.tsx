import * as React from "react";
import { memo, useCallback, useEffect, useState } from "react";
import { Pressable, Share, View } from "react-native";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import messaging from "@react-native-firebase/messaging";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

//types
import {
  BottomTabNavParamList,
  StackNavParamList,
  generalScreenProp,
} from "./src/types/BottomTabNavParamList";
// screens
import Signin from "./src/screens/Signin";

//navbar components
import BottomTabHomeButton from "./src/components/navbarComponents/BottomNavbarComponents/BottomTabHomeButton";
import BottomTabAddButton from "./src/components/navbarComponents/BottomNavbarComponents/BottomTabAddButton";
import BottomTabOverviewButton from "./src/components/navbarComponents/BottomNavbarComponents/BottomTabOverviewButton";
// import TopNavbarEditButton from "./src/components/navbarComponents/TopNavbarComponents/TopNavbarEditButton";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  persistor,
  store,
  useAppDispatch,
  useSelector,
} from "./src/state/store";
import {
  fetchCurrentUserProfileAction,
  selectFetchCurrentUserProfile,
  selectSignIn,
  selectSignInWithGoogle,
  selectUserLoading,
  selectUserUpdated,
} from "./src/state/userSlice";
import {
  createHabitAction,
  fetchAllHabitsAction,
  fetchAllTodayHabitsAction,
  selectHabitUpdated,
  selectHabits,
  selectHabitsToday,
  selectHabitLoading,
  updateHabitNameAction,
  deleteHabitAction,
  fetchAllHabitsOfSelectedUserAction,
} from "./src/state/habitSlice";
import FlashMessage from "react-native-flash-message";

const bottomTabNavigationOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    position: "absolute",
    backgroundColor: "transparent",
    borderTopWidth: 0,
    bottom: 0,
    right: 0,
    left: 0,
    height: 64,
    borderRadius: 0,
    elevation: 0,
  },
};

const BottomTabNav = createBottomTabNavigator<BottomTabNavParamList>();
const StackNavigator = createStackNavigator<StackNavParamList>();

import { showMessage, hideMessage } from "react-native-flash-message";
import { notificationUpdateTokenAction } from "./src/state/notificationSlice";
import HomeSection from "./src/navigationSections/HomeSection";
import AddSection from "./src/navigationSections/AddSection";
import OverviewSection from "./src/navigationSections/OverviewSection";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

//wrapper for state
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const App = () => {
  const navigation = useNavigation<generalScreenProp>();

  const controller = new AbortController();

  const dispatch = useAppDispatch();

  const token = useSelector(selectSignInWithGoogle);

  const tokenSecondOption = useSelector(selectSignIn);

  const currentUser = useSelector(selectFetchCurrentUserProfile);

  const userLoading = useSelector(selectUserLoading);

  const userUpdated = useSelector(selectUserUpdated);

  const allHabits = useSelector(selectHabits);

  const allHabitsToday = useSelector(selectHabitsToday);

  const habitUpdated = useSelector(selectHabitUpdated);

  const habitLoading = useSelector(selectHabitLoading);

  try {
    //date stuff starts
    const todayTemp = new Date();
    const today = new Date(
      todayTemp.getFullYear(),
      todayTemp.getMonth(),
      todayTemp.getDate(),
      todayTemp.getHours(),
      todayTemp.getMinutes(),
      todayTemp.getSeconds()
    );

    function convertUTCDateToLocalDate(date: any) {
      var newDate = new Date(date);
      newDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      return newDate;
    }

    //${date from api} compares to ${date of today}
    const isInArray = (array: any[], value: any) => {
      return array.some((item) => {
        var elemHave = new Date(convertUTCDateToLocalDate(new Date(item)));
        var elemToday = new Date(convertUTCDateToLocalDate(value));

        const msBetweenDates = Math.abs(
          elemHave.getTime() - elemToday.getTime()
        );

        //convert ms to hours(min sec ms)
        const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

        if (hoursBetweenDates < 24) {
          // console.log("date is within 24 hours");
          return true;
        } else {
          // console.log("date is NOT within 24 hours");
          return false;
        }
      });
    };
    // date stuff ends

    var currentHabitDatesIncluded = useCallback(
      allHabits &&
        allHabits.map((allHabitsItem: any) => {
          return isInArray(allHabitsItem.dates, today);
        }),
      [
        allHabits,
        // , habitUpdated
      ]
    );
  } catch (error) {
    console.log("currentHabitDatesIncluded error: ", error);
  }

  function convertUTCDateToLocalDate(date: any) {
    var newDate = new Date(date);
    newDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return newDate;
  }

  //${date from api} compares to ${date of today}
  const isInArray = (array: any[], value: any) => {
    return array.some((item) => {
      var elemHave = new Date(convertUTCDateToLocalDate(new Date(item)));
      var elemToday = new Date(convertUTCDateToLocalDate(value));

      const msBetweenDates = Math.abs(elemHave.getTime() - elemToday.getTime());

      //convert ms to hours(min sec ms)
      const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

      if (hoursBetweenDates < 24) {
        // console.log("date is within 24 hours");
        return true;
      } else {
        // console.log("date is NOT within 24 hours");
        return false;
      }
    });
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: "App link",
        message: `Join me in Habitune!\n https://play.google.com/store/apps/details?id=com.thelittleteaclipper.habitune`,
        url: "https://play.google.com/store/apps/details?id=com.thelittleteaclipper.habitune",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      (token && token.length > 0) ||
      (tokenSecondOption && tokenSecondOption.length > 0)
    ) {
      dispatch(fetchCurrentUserProfileAction());
      dispatch(fetchAllHabitsAction());
      dispatch(
        fetchAllTodayHabitsAction(
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
            new Date().getHours(),
            new Date().getMinutes(),
            new Date().getSeconds()
          ).getTime()
        )
      );
    }
  }, [token, tokenSecondOption, currentUser._id, userUpdated, habitUpdated]);

  // expo notifications
  async function registerForPushNotificationsAsync() {
    let deviceToken;

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    deviceToken = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log("deviceToken:", deviceToken);

    return deviceToken;
  }

  // fcm notifications
  const registerDeviceForMessaging = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();

    dispatch(notificationUpdateTokenAction(token));
    // console.log("FCM Token: ", token);
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  useEffect(() => {
    if (
      (token && token.length > 0) ||
      (tokenSecondOption && tokenSecondOption.length > 0)
    ) {
      registerDeviceForMessaging();
    }
  }, [token, tokenSecondOption]);

  // check whether an initial notification is available
  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          // console.log(
          //   "Notification caused app to open from quit state:",
          //   remoteMessage.notification
          // );
          return;
        }
      });
  }, []);

  // do stuff if app background notification is pressed
  useEffect(() => {
    const unsubscribe = messaging().setBackgroundMessageHandler(
      async (remoteMessage) => {
        // Update a users messages list using AsyncStorage
        // const currentMessages = await AsyncStorage.getItem('messages');
        // const messageArray = JSON.parse(currentMessages);
        // messageArray.push(remoteMessage.data);
        // await AsyncStorage.setItem('messages', JSON.stringify(messageArray));
        // console.log(remoteMessage);
        return unsubscribe;
      }
    );
  }, []);

  // Assume a message-notification contains a "type" property in the data payload of the screen to open
  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp(
      async (remoteMessage) => {
        // console.log(
        //   "Notification caused app to open from background state:",
        //   remoteMessage.notification
        // )
        return unsubscribe;
      }
    );
  }, []);

  // do stuff if app foreground notification is pressed
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      showMessage({
        message: remoteMessage.notification?.title as string,
        description: remoteMessage.notification?.body as string,
        type: "default",
        backgroundColor: "#968EB0",
        color: "#FFFFFF",
        duration: 5000,
      });
      // console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <BottomTabNav.Navigator screenOptions={bottomTabNavigationOptions}>
        {!token || !tokenSecondOption ? (
          <BottomTabNav.Screen
            name="Signin"
            children={(props: any) => <Signin {...props} dispatch={dispatch} />}
            options={{
              tabBarButton: () => null,
            }}
          />
        ) : (
          <>
            <BottomTabNav.Screen
              name="HomeSection"
              initialParams={{ homeEditState: false }}
              children={(props: any) => (
                <HomeSection
                  {...props}
                  controller={controller}
                  dispatch={dispatch}
                  token={token}
                  currentUser={currentUser}
                  allHabitsToday={allHabitsToday}
                  currentHabitDatesIncluded={currentHabitDatesIncluded}
                  habitUpdated={habitUpdated}
                  habitLoading={habitLoading}
                  onShare={onShare}
                />
              )}
              options={{
                // resets screen states below
                // unmountOnBlur: true,
                tabBarButton: (props) => <BottomTabHomeButton {...props} />,
              }}
            />
            <BottomTabNav.Screen
              name="AddSection"
              children={(props: any) => (
                <AddSection
                  {...props}
                  controller={controller}
                  dispatch={dispatch}
                  currentUser={currentUser}
                />
              )}
              options={{
                tabBarButton: (props) => <BottomTabAddButton {...props} />,
              }}
            />
            <BottomTabNav.Screen
              name="OverviewSection"
              children={(props: any) => (
                <OverviewSection
                  {...props}
                  // navigation={navigation}
                  dispatch={dispatch}
                  fetchAllHabitsAction={fetchAllHabitsAction}
                  currentUser={currentUser}
                  allHabits={allHabits}
                  currentHabitDatesIncluded={currentHabitDatesIncluded}
                  habitUpdated={habitUpdated}
                  habitLoading={habitLoading}
                  isInArray={isInArray}
                  onShare={onShare}
                />
              )}
              options={{
                tabBarButton: (props) => <BottomTabOverviewButton {...props} />,
              }}
            />
          </>
        )}
      </BottomTabNav.Navigator>
      <FlashMessage position="top" />
    </>
  );
};

export default AppWrapper;
