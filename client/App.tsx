import * as React from "react";
import { useEffect } from "react";
import { StatusBar, Vibration } from "react-native";
import NetInfo from "@react-native-community/netinfo";

// import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import messaging from "@react-native-firebase/messaging";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";

//types
import {
  BottomTabNavParamList,
  // StackNavParamList,
  generalScreenProp,
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
  fetchAllHabitsOfSelectedUserAction,
  getTodaysHabitsBooleanAction,
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

import { ThemeProvider, useTheme } from "./src/context/ThemeContext";

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
        <ThemeProvider>
          <NavigationContainer>
            <App />
          </NavigationContainer>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

const App = () => {
  const { theme, setTheme, changeTheme } = useTheme();

  // const navigation = useNavigation();
  const navigation = useNavigation<generalScreenProp>();

  // const controller = new AbortController();

  const dispatch = useAppDispatch();

  const token = useSelector(selectSignInWithGoogle);

  const tokenSecondOption = useSelector(selectSignIn);

  const habitUpdated = useSelector(selectHabitUpdated);

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

  //token
  React.useLayoutEffect(() => {
    if (
      (token && token.length > 0) ||
      (tokenSecondOption && tokenSecondOption.length > 0)
    ) {
      dispatch(fetchCurrentUserProfileAction(today.getTime()));
      dispatch(fetchAllHabitsAction());
      dispatch(fetchAllTodayHabitsAction(today.getTime()));
      dispatch(getTodaysHabitsBooleanAction(today.getTime()));
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
      dispatch(getTodaysHabitsBooleanAction(today.getTime()));
    }
  }, [habitUpdated]);

  //expo device registeration
  useEffect(() => {
    registerForPushNotificationsAsync(Notifications);
  }, []);

  //register fcm
  React.useLayoutEffect(() => {
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

  //check connection status
  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        showMessage({
          message: "Connection Lost",
          description: "Please check your internet connection.",
          type: "default",
          backgroundColor: theme.primaryColor,
          color: theme.primaryText,
          duration: 30000,
        });
      }
    });

    return () => {
      unsubscribeNetInfo();
    };
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
                lazy: true,
                freezeOnBlur: true,
                // resets screen states below
                // unmountOnBlur: true,
                tabBarButton: (props) => (
                  <HomeIcon
                    {...props}
                    onPress={() => {
                      Vibration.vibrate(10);
                      navigation.navigate("HomeSection");
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "HomeSection" }],
                      });
                    }}
                  />
                ),
              }}
            />
            <BottomTabNav.Screen
              name="AddSection"
              children={(props: any) => <AddSection {...props} />}
              options={{
                lazy: true,
                freezeOnBlur: true,
                tabBarButton: (props) => (
                  <AddIcon
                    {...props}
                    onPress={() => {
                      Vibration.vibrate(10);
                      navigation.navigate("AddSection");
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "AddSection" }],
                      });
                    }}
                  />
                ),
              }}
            />
            <BottomTabNav.Screen
              name="OverviewSection"
              children={(props: any) => <OverviewSection {...props} />}
              options={{
                lazy: true,
                freezeOnBlur: true,
                tabBarButton: (props) => (
                  <OverviewIcon
                    {...props}
                    onPress={() => {
                      Vibration.vibrate(10);
                      navigation.navigate("OverviewSection");
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "OverviewSection" }],
                      });
                    }}
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
