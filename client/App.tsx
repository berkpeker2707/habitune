import * as React from "react";
import { useEffect } from "react";
import { StatusBar, Vibration } from "react-native";

// import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import messaging from "@react-native-firebase/messaging";

import {
  NavigationContainer,
  // , useNavigation
} from "@react-navigation/native";
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";

//types
import {
  BottomTabNavParamList,
  // StackNavParamList,
  // generalScreenProp,
} from "./src/types/BottomTabNavParamList";
// screens
import Signin from "./src/screens/Signin";

//navbar components
import HomeIcon from "./src/components/icons/HomeIcon";
import AddIcon from "./src/components/icons/AddIcon";
import OverviewIcon from "./src/components/icons/OverviewIcon";

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
  selectSignIn,
  selectSignInWithGoogle,
  friendID,
} from "./src/state/userSlice";
import {
  fetchAllHabitsAction,
  fetchAllTodayHabitsAction,
  selectHabitUpdated,
  selectHabitsTodayBoolean,
  fetchAllHabitsOfSelectedUserAction,
  refreshHabits,
  setTempBarFilled,
} from "./src/state/habitSlice";
import { notificationUpdateTokenAction } from "./src/state/notificationSlice";

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

//helpers
import registerForPushNotificationsAsync from "./src/helpers/registerForPushNotificationsAsync";
import registerDeviceForMessaging from "./src/helpers/registerDeviceForMessaging";

import ErrorBoundary from "react-native-error-boundary";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const errorHandler = (error: Error, stackTrace: string) => {
  /* Log the error to an error reporting service */
  console.log("error: ", error);
  console.log("stackTrace: ", stackTrace);
};

//wrapper for state
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <NavigationContainer>
            <ErrorBoundary onError={errorHandler}>
              <App />
            </ErrorBoundary>
          </NavigationContainer>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

const App = () => {
  const { theme, setTheme, changeTheme } = useTheme();

  // const navigation = useNavigation<generalScreenProp>();

  // const controller = new AbortController();

  const dispatch = useAppDispatch();

  const token = useSelector(selectSignInWithGoogle);

  const tokenSecondOption = useSelector(selectSignIn);

  const habitsTodayBoolean = useSelector(selectHabitsTodayBoolean);

  const habitUpdated = useSelector(selectHabitUpdated);

  const refreshHabitsState = useSelector(refreshHabits);

  const friendIDState = useSelector(friendID);

  const todayTemp = new Date();
  const today = new Date(
    todayTemp.getFullYear(),
    todayTemp.getMonth(),
    todayTemp.getDate(),
    todayTemp.getHours(),
    todayTemp.getMinutes(),
    todayTemp.getSeconds()
  );

  useEffect(() => {
    if (habitsTodayBoolean) {
      dispatch(setTempBarFilled([...habitsTodayBoolean]));
    }
  }, [habitsTodayBoolean, refreshHabitsState]);

  //token
  useEffect(() => {
    if (
      (token && token.length > 0) ||
      (tokenSecondOption && tokenSecondOption.length > 0)
    ) {
      dispatch(fetchCurrentUserProfileAction(today.getTime()));
      dispatch(fetchAllHabitsAction());
      dispatch(fetchAllTodayHabitsAction(today.getTime()));
    }
  }, [token, tokenSecondOption]);

  useEffect(() => {
    if (changeTheme) {
      setTheme(changeTheme);
    }
  }, [changeTheme]);

  //update overview if home is updated
  useEffect(() => {
    if (habitUpdated) {
      dispatch(fetchAllHabitsAction());
    }
  }, [habitUpdated]);

  //expo device registeration
  useEffect(() => {
    registerForPushNotificationsAsync(Notifications);
  }, []);

  //register fcm
  useEffect(() => {
    if (
      (token && token.length > 0) ||
      (tokenSecondOption && tokenSecondOption.length > 0)
    ) {
      registerDeviceForMessaging(dispatch, notificationUpdateTokenAction);
    }
  }, [token, tokenSecondOption]);

  //fetch selected friend
  useEffect(() => {
    if (friendIDState) {
      dispatch(fetchAllHabitsOfSelectedUserAction(friendIDState));
    }
  }, [friendIDState]);

  //check whether an initial notification is available
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

  //assume a message-notification contains a "type" property in the data payload of the screen to open
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

  //do stuff if app foreground notification is pressed
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      showMessage({
        message: remoteMessage.notification?.title as string,
        description: remoteMessage.notification?.body as string,
        type: "default",
        backgroundColor: theme.primaryColor,
        color: theme.primaryText,
        duration: 5000,
      });
      // console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <StatusBar
        hidden={false}
        barStyle={
          theme.themeType === "default"
            ? "dark-content"
            : theme.themeType === "dark"
            ? "light-content"
            : "default"
        }
        backgroundColor={theme.backgroundColor}
      />
      <BottomTabNav.Navigator screenOptions={bottomTabNavigationOptions}>
        {!token || !tokenSecondOption ? (
          <BottomTabNav.Screen
            name="Signin"
            children={() => <Signin />}
            options={{
              tabBarButton: () => null,
            }}
          />
        ) : (
          <>
            <BottomTabNav.Screen
              name="HomeSection"
              children={(props: any) => <HomeSection {...props} />}
              options={{
                // resets screen states below
                // unmountOnBlur: true,
                tabBarButton: (props) => (
                  <HomeIcon
                    {...props}
                    onPressIn={() => Vibration.vibrate(10)}
                  />
                ),
              }}
            />
            <BottomTabNav.Screen
              name="AddSection"
              children={(props: any) => <AddSection {...props} />}
              options={{
                tabBarButton: (props) => (
                  <AddIcon {...props} onPressIn={() => Vibration.vibrate(10)} />
                ),
              }}
            />
            <BottomTabNav.Screen
              name="OverviewSection"
              children={(props: any) => <OverviewSection {...props} />}
              options={{
                tabBarButton: (props) => (
                  <OverviewIcon
                    {...props}
                    onPressIn={() => Vibration.vibrate(10)}
                  />
                ),
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
