import * as React from "react";
import { memo, useCallback, useEffect, useState } from "react";
import { Pressable, Share, View } from "react-native";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import messaging from "@react-native-firebase/messaging";

import {
  NavigationContainer,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
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
import Home from "./src/screens/Home";
import Add from "./src/screens/Add";
import Overview from "./src/screens/Overview";
import Profile from "./src/screens/Profile";
import Settings from "./src/screens/Settings";
import Friend from "./src/screens/Friend";

//navbar components
import BottomTabHomeButton from "./src/components/navbarComponents/BottomNavbarComponents/BottomTabHomeButton";
import BottomTabAddButton from "./src/components/navbarComponents/BottomNavbarComponents/BottomTabAddButton";
import BottomTabOverviewButton from "./src/components/navbarComponents/BottomNavbarComponents/BottomTabOverviewButton";
import TopNavbarLogo from "./src/components/navbarComponents/TopNavbarComponents/TopNavbarLogo";
import TopNavbarProfileImage from "./src/components/navbarComponents/TopNavbarComponents/TopNavbarProfileImage";
import TopNavbarBackButton from "./src/components/navbarComponents/TopNavbarComponents/TopNavbarBackButton";
import TopNavbarShareButton from "./src/components/navbarComponents/TopNavbarComponents/TopNavbarShareButton";
import TopNavbarSettingsButton from "./src/components/navbarComponents/TopNavbarComponents/TopNavbarSettingsButton";
import TopNavbarDoneButton from "./src/components/navbarComponents/TopNavbarComponents/TopNavbarDoneButton";
import TopNavbarDeleteButton from "./src/components/navbarComponents/TopNavbarComponents/TopNavbarDeleteButton";
import TopNavbarAddFriendButton from "./src/components/navbarComponents/TopNavbarComponents/TopNavbarAddFriendButton";
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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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

const HomeSection = (props: any) => {
  const {
    navigation,
    controller,
    dispatch,
    token,
    currentUser,
    userLoading,
    allHabitsToday,
    currentHabitDatesIncluded,
    habitUpdated,
    habitLoading,
  } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState();

  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerStyle: { height: 70 },
      }}
    >
      <StackNavigator.Screen
        name="Home"
        children={(props: any) => (
          <Home
            {...props}
            navigation={navigation}
            homeEditState={navigation.getState().routes[0].params.homeEditState}
            dispatch={dispatch}
            currentUser={currentUser}
            allHabits={allHabitsToday ? allHabitsToday : []}
            allHabitsNumber={allHabitsToday ? allHabitsToday.length : 0}
            currentHabitDatesIncluded={currentHabitDatesIncluded}
            habitLoading={habitLoading}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        )}
        options={{
          headerTitle: !navigation.getState().routes[0].params.homeEditState
            ? "Today"
            : "",
          headerLeft: () =>
            !navigation.getState().routes[0].params.homeEditState ? (
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
            ) : (
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 10,
                }}
              >
                <Pressable
                  onPress={() => {
                    try {
                      navigation.setParams({
                        homeEditState: false,
                      });
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  <TopNavbarBackButton />
                </Pressable>
              </View>
            ),

          headerRight: () =>
            !navigation.getState().routes[0].params.homeEditState ? (
              <Pressable
                onPress={() => {
                  try {
                    navigation.navigate("Profile", {
                      currentUser: currentUser,
                    });
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 5,
                  }}
                >
                  <TopNavbarProfileImage imageSource={currentUser.image} />
                </View>
              </Pressable>
            ) : (
              <View style={{ flexDirection: "row" }}>
                <Pressable
                  disabled={
                    navigation.getState().routes[0].params?.name ? false : true
                  }
                  onPress={() => {
                    try {
                      dispatch(
                        updateHabitNameAction({
                          _id: navigation.getState().routes[0].params?._id,
                          name: navigation.getState().routes[0].params?.name,
                        })
                      );
                      navigation.setParams({
                        homeEditState: false,
                      });
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 5,
                      paddingLeft: 10,
                    }}
                  >
                    {/* <TopNavbarEditButton /> */}
                    <TopNavbarDoneButton />
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => {
                    try {
                      setModalVisible(!modalVisible);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 5,
                      paddingLeft: 10,
                    }}
                  >
                    <TopNavbarAddFriendButton />
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => {
                    try {
                      dispatch(
                        deleteHabitAction({
                          _id: navigation.getState().routes[0].params?._id,
                        })
                      );
                      navigation.setParams({
                        homeEditState: false,
                      });
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 5,
                      paddingLeft: 10,
                    }}
                  >
                    <TopNavbarDeleteButton />
                  </View>
                </Pressable>
              </View>
            ),
        }}
      />
      <StackNavigator.Screen
        name="Profile"
        children={(props: any) => (
          <Profile
            {...props}
            navigation={navigation}
            homeEditState={navigation.getState().routes[0].params.homeEditState}
            dispatch={dispatch}
            currentUser={currentUser}
            userLoading={userLoading}
            allHabits={allHabitsToday ? allHabitsToday : []}
            allHabitsNumber={allHabitsToday ? allHabitsToday.length : 0}
            currentHabitDatesIncluded={currentHabitDatesIncluded}
            habitUpdated={habitUpdated}
            habitLoading={habitLoading}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        )}
        options={{
          headerTitle: "Profile",
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
        component={Settings}
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
        }}
      />
      <StackNavigator.Screen
        name="Friend"
        children={(props: any) => (
          <Friend
            {...props}
            navigation={navigation}
            dispatch={dispatch}
            homeEditState={navigation.getState().routes[0].params.homeEditState}
            allHabits={allHabitsToday ? allHabitsToday : []}
            allHabitsNumber={allHabitsToday ? allHabitsToday.length : 0}
            currentHabitDatesIncluded={currentHabitDatesIncluded}
            habitUpdated={habitUpdated}
            habitLoading={habitLoading}
          />
        )}
      />
    </StackNavigator.Navigator>
  );
};

const AddSection = memo((props: any) => {
  const {
    navigation,
    controller,
    dispatch,
    token,
    currentUser,
    allHabitsToday,
    currentHabitDatesIncluded,
    habitUpdated,
    habitLoading,
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
          <Add {...props} navigation={navigation} currentUser={currentUser} />
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
                  // navigation.getState().routes[1].params?.firstDate &&
                  // navigation.getState().routes[1].params?.lastDate &&
                  // navigation.getState().routes[1].params?.upcomingDates &&
                  // navigation.getState().routes[1].params?.color &&
                  navigation.getState().routes[1].params?.name ? false : true
                }
                onPress={() => {
                  try {
                    dispatch(
                      createHabitAction(navigation.getState().routes[1].params)
                    );
                    navigation.goBack();
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

const OverviewSection = (props: any) => {
  const {
    navigation,
    controller,
    dispatch,
    token,
    currentUser,
    allHabits,
    allHabitsToday,
    currentHabitDatesIncluded,
    habitUpdated,
    habitLoading,
  } = props;

  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerStyle: { height: 70 },
      }}
    >
      <StackNavigator.Screen
        name="Overview"
        children={(props: any) => (
          <Overview
            {...props}
            navigation={navigation}
            dispatch={dispatch}
            homeEditState={navigation.getState().routes[0].params.homeEditState}
            allHabits={allHabits ? allHabits : []}
            allHabitsNumber={allHabits ? allHabits.length : 0}
            currentHabitDatesIncluded={currentHabitDatesIncluded}
            habitUpdated={habitUpdated}
            habitLoading={habitLoading}
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
        component={Settings}
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
      todayTemp.getDate()
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
      allHabitsToday &&
        allHabitsToday.map((allHabitsItem: any) => {
          return isInArray(allHabitsItem.dates, today);
        }),
      [
        allHabitsToday,
        // , habitUpdated
      ]
    );
  } catch (error) {
    console.log("currentHabitDatesIncluded error: ", error);
  }

  useEffect(() => {
    if (
      (token && token.length > 0) ||
      (tokenSecondOption && tokenSecondOption.length > 0)
    ) {
      dispatch(fetchCurrentUserProfileAction());
      dispatch(fetchAllHabitsAction());
      dispatch(fetchAllTodayHabitsAction());
    }
  }, [token, tokenSecondOption, currentUser._id, userUpdated, habitUpdated]);

  // useEffect(() => {
  //   if (token && token.length > 0) {
  //     dispatch(fetchCurrentUserProfileAction());
  //   }
  // }, [token, userUpdated]);

  // useEffect(() => {
  //   if (token && token.length > 0) {
  //     dispatch(fetchAllTodayHabitsAction());
  //     dispatch(fetchAllHabitsAction());
  //   }
  // }, [currentUser, habitUpdated]);

  // useEffect(() => {
  //   if (tokenSecondOption && tokenSecondOption.length > 0) {
  //     dispatch(fetchCurrentUserProfileAction());
  //   }
  // }, [tokenSecondOption]);

  // useEffect(() => {
  //   if (tokenSecondOption && tokenSecondOption.length > 0) {
  //     dispatch(fetchAllTodayHabitsAction());
  //     dispatch(fetchAllHabitsAction());
  //   }
  // }, [currentUser, habitUpdated]);

  //get selected friend habits
  // useEffect(() => {
  //   // console.log(navigation.getState()?.routes[0].state?.routes[2].params);
  //   if (navigation.getState()?.routes[0].state?.routes[2].params) {
  //     console.log(navigation.getState()?.routes[0].state?.routes[2].params);
  //   }
  //   // dispatch(
  //   //   fetchAllHabitsOfSelectedUserAction(
  //   //     navigation.getState().routes[0].state.routes[2].params.friendID
  //   //   )
  //   // );
  // }, [
  //   // navigation.getState().routes[0].state.routes[2].params.friendID
  //   navigation,
  // ]);

  // console.log("APP RENDERED");

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
                  // navigation={navigation}
                  controller={controller}
                  dispatch={dispatch}
                  token={token}
                  currentUser={currentUser}
                  allHabitsToday={allHabitsToday}
                  currentHabitDatesIncluded={currentHabitDatesIncluded}
                  habitUpdated={habitUpdated}
                  habitLoading={habitLoading}
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
                  controller={controller}
                  dispatch={dispatch}
                  token={token}
                  currentUser={currentUser}
                  allHabits={allHabits}
                  allHabitsToday={allHabitsToday}
                  currentHabitDatesIncluded={currentHabitDatesIncluded}
                  habitUpdated={habitUpdated}
                  habitLoading={habitLoading}
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
