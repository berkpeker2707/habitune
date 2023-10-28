import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Share } from "react-native";

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
  deleteUserAction,
  fetchCurrentUserProfileAction,
  revertAll,
  selectFetchCurrentUserProfile,
  selectSignIn,
  selectSignInWithGoogle,
  selectUserLoading,
  selectUserUpdated,
  sendFriendshipAction,
} from "./src/state/userSlice";
import {
  createHabitAction,
  fetchAllHabitsAction,
  fetchAllTodayHabitsAction,
  selectHabitUpdated,
  selectHabits,
  selectHabitsToday,
  selectHabitsOfSelectedUser,
  selectHabitLoading,
  updateHabitNameAction,
  deleteHabitAction,
  fetchAllHabitsOfSelectedUserAction,
  revertAllHabit,
  updateHabitCompletedDateAction,
  updateHabitSharedWithAction,
} from "./src/state/habitSlice";
import {
  notificationSendAction,
  notificationUpdateTokenAction,
} from "./src/state/notificationSlice";

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

import { showMessage, hideMessage } from "react-native-flash-message";

import HomeSection from "./src/navigationSections/HomeSection";
import AddSection from "./src/navigationSections/AddSection";
import OverviewSection from "./src/navigationSections/OverviewSection";
import isInArray from "./src/helpers/isInArray";

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

  // const controller = new AbortController();

  const dispatch = useAppDispatch();

  const token = useSelector(selectSignInWithGoogle);

  const tokenSecondOption = useSelector(selectSignIn);

  const currentUser = useSelector(selectFetchCurrentUserProfile);

  const userLoading = useSelector(selectUserLoading);

  const userUpdated = useSelector(selectUserUpdated);

  const allHabits = useSelector(selectHabits);

  const allHabitsToday = useSelector(selectHabitsToday);

  const allHabitsOfSelectedUser = useSelector(selectHabitsOfSelectedUser);

  const habitUpdated = useSelector(selectHabitUpdated);

  const habitLoading = useSelector(selectHabitLoading);

  const [homeEditBool, setHomeEditBool] = useState<boolean>(false);

  const [friendIDState, setFriendIDState] = useState<number>();

  // try {
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

  function isInHomeArray(array: any[], value: any) {
    const dateToBeChecked = new Date(value);

    for (const item of array) {
      const alreadyStoredDate = new Date(item);

      const msBetweenDates = Math.abs(
        alreadyStoredDate.getTime() - dateToBeChecked.getTime()
      );

      const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

      if (
        hoursBetweenDates < 24 &&
        alreadyStoredDate.getDate() === dateToBeChecked.getDate() &&
        alreadyStoredDate.getMonth() === dateToBeChecked.getMonth()
      ) {
        return true; // Found a match, return immediately.
      }
    }

    return false; // No match found in the array.
  }

  var currentHabitDatesIncluded = useCallback(
    allHabitsToday &&
      allHabitsToday.map((allHabitsItem: any) => {
        return isInHomeArray(allHabitsItem.dates, today);
      }),
    [allHabitsToday, habitUpdated]
  );

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

  useEffect(() => {
    if (friendIDState) {
      dispatch(fetchAllHabitsOfSelectedUserAction(friendIDState));
    }
  }, [friendIDState]);

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
              children={(props: any) => (
                <HomeSection
                  {...props}
                  dispatch={dispatch}
                  fetchCurrentUserProfileAction={fetchCurrentUserProfileAction}
                  fetchAllHabitsAction={fetchAllHabitsAction}
                  fetchAllTodayHabitsAction={fetchAllTodayHabitsAction}
                  fetchAllHabitsOfSelectedUserAction={
                    fetchAllHabitsOfSelectedUserAction
                  }
                  updateHabitCompletedDateAction={
                    updateHabitCompletedDateAction
                  }
                  updateHabitSharedWithAction={updateHabitSharedWithAction}
                  updateHabitNameAction={updateHabitNameAction}
                  sendFriendshipAction={sendFriendshipAction}
                  deleteUserAction={deleteUserAction}
                  deleteHabitAction={deleteHabitAction}
                  notificationSendAction={notificationSendAction}
                  revertAll={revertAll}
                  revertAllHabit={revertAllHabit}
                  currentUser={currentUser}
                  allHabits={allHabits}
                  allHabitsToday={allHabitsToday}
                  allHabitsNumber={allHabitsToday ? allHabitsToday.length : 0}
                  allHabitsOfSelectedUser={allHabitsOfSelectedUser}
                  allHabitsOfSelectedUserNumber={
                    allHabitsOfSelectedUser ? allHabitsOfSelectedUser.length : 0
                  }
                  currentHabitDatesIncluded={currentHabitDatesIncluded}
                  homeEditBool={homeEditBool}
                  setHomeEditBool={setHomeEditBool}
                  habitUpdated={habitUpdated}
                  habitLoading={habitLoading}
                  isInArray={isInArray}
                  onShare={onShare}
                  friendIDState={friendIDState}
                  setFriendIDState={setFriendIDState}
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
                  currentUser={currentUser}
                  dispatch={dispatch}
                  createHabitAction={createHabitAction}
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
                  dispatch={dispatch}
                  fetchAllHabitsAction={fetchAllHabitsAction}
                  fetchAllHabitsOfSelectedUserAction={
                    fetchAllHabitsOfSelectedUserAction
                  }
                  revertAll={revertAll}
                  revertAllHabit={revertAllHabit}
                  deleteUserAction={deleteUserAction}
                  allHabits={allHabits}
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
