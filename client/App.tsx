import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Vibration } from "react-native";

// import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import messaging from "@react-native-firebase/messaging";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
// import { createStackNavigator } from "@react-navigation/stack";

//types
import {
  BottomTabNavParamList,
  // StackNavParamList,
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
  selectHabitsTodayBoolean,
  selectCurrentHabitWeekStreak,
  selectHabitsOfSelectedUser,
  selectHabitLoading,
  updateHabitNameAction,
  deleteHabitAction,
  fetchAllHabitsOfSelectedUserAction,
  revertAllHabit,
  updateHabitCompletedDateAction,
  updateHabitSharedWithAction,
  selectFriendCurrentHabitWeekStreak,
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

//helpers
import isInArray from "./src/helpers/isInArray";
import registerForPushNotificationsAsync from "./src/helpers/registerForPushNotificationsAsync";
import registerDeviceForMessaging from "./src/helpers/registerDeviceForMessaging";
import onShare from "./src/helpers/shareApp";

import ErrorBoundary from "react-native-error-boundary";

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
        <NavigationContainer>
          <ErrorBoundary onError={errorHandler}>
            <App />
          </ErrorBoundary>
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

  const habitsTodayBoolean = useSelector(selectHabitsTodayBoolean);

  const currentHabitWeekStreak = useSelector(selectCurrentHabitWeekStreak);

  const friendCurrentHabitWeek = useSelector(
    selectFriendCurrentHabitWeekStreak
  );

  const allHabitsOfSelectedUser = useSelector(selectHabitsOfSelectedUser);

  const habitUpdated = useSelector(selectHabitUpdated);

  const habitLoading = useSelector(selectHabitLoading);

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [homeEditBool, setHomeEditBool] = useState<boolean>(false);

  const [friendIDState, setFriendIDState] = useState<number>();
  const [friendName, setFriendName] = useState<string>();

  const [friendAllHabitDatesDotsState, setFriendAllHabitDatesDotsState] =
    useState<Array<Boolean>>([]);

  //home screen states
  const [tempBarFilled, setTempBarFilled] = useState<Array<boolean>>();
  () => [];
  const [shareWithFriendList, setShareWithFriendList] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);

  const [showInfoText, setShowInfoText] = useState<boolean>(false);
  const [acceptOrRemoveModalVisible, setAcceptOrRemoveModalVisible] =
    useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<{
    email: string;
    name: string;
    pending: boolean;
  }>({
    email: "",
    name: "",
    pending: false,
  });

  const [habitNameState, setHabitNameState] = useState<string>("");
  const [editHabitSelected, setEditHabitSelected] = useState<number>(0);

  //add screen states
  const [taskName, setTaskName] = useState<string>("");
  const [openFrequency, setOpenFrequency] = useState<boolean>(false);
  const [taskUpcomingDates, setTaskUpcomingDates] = useState<string[]>([
    // "Sun",
    // "Mon",
    // "Tue",
    // "Wed",
    // "Thu",
    // "Fri",
    // "Sat",
  ]);
  const [taskFirstDate, setTaskFirstDate] = useState<Date | any>(
    new Date(
      new Date(Date.now()).getFullYear(),
      new Date(Date.now()).getMonth(),
      new Date(Date.now()).getDate(),
      new Date(Date.now()).getHours(),
      new Date(Date.now()).getMinutes(),
      new Date(Date.now()).getSeconds()
    )
  );
  const [taskLastDate, setTaskLastDate] = useState<Date | any>(
    new Date(
      new Date(Date.now()).getFullYear() + 1,
      new Date(Date.now()).getMonth(),
      new Date(Date.now()).getDate(),
      new Date(Date.now()).getHours(),
      new Date(Date.now()).getMinutes(),
      new Date(Date.now()).getSeconds()
    )
  );
  const [dateBetweenModalOpen, setDateBetweenModalOpen] =
    useState<boolean>(false);
  // const [shareWithFriendList, setShareWithFriendList] = useState<string[]>([]);
  const [openShare, setOpenShare] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#968EB0");

  const todayTemp = new Date();
  const today = new Date(
    todayTemp.getFullYear(),
    todayTemp.getMonth(),
    todayTemp.getDate(),
    todayTemp.getHours(),
    todayTemp.getMinutes(),
    todayTemp.getSeconds()
  );
  const OneDayAgo = new Date(
    new Date(
      todayTemp.getFullYear(),
      todayTemp.getMonth(),
      todayTemp.getDate() - 1,
      todayTemp.getHours(),
      todayTemp.getMinutes(),
      todayTemp.getSeconds()
    ).getTime()
  );
  const TwoDayAgo = new Date(
    new Date(
      todayTemp.getFullYear(),
      todayTemp.getMonth(),
      todayTemp.getDate() - 2,
      todayTemp.getHours(),
      todayTemp.getMinutes(),
      todayTemp.getSeconds()
    ).getTime()
  );
  const ThreeDayAgo = new Date(
    new Date(
      todayTemp.getFullYear(),
      todayTemp.getMonth(),
      todayTemp.getDate() - 3,
      todayTemp.getHours(),
      todayTemp.getMinutes(),
      todayTemp.getSeconds()
    ).getTime()
  );
  const FourDayAgo = new Date(
    new Date(
      todayTemp.getFullYear(),
      todayTemp.getMonth(),
      todayTemp.getDate() - 4,
      todayTemp.getHours(),
      todayTemp.getMinutes(),
      todayTemp.getSeconds()
    ).getTime()
  );
  const FiveDayAgo = new Date(
    new Date(
      todayTemp.getFullYear(),
      todayTemp.getMonth(),
      todayTemp.getDate() - 5,
      todayTemp.getHours(),
      todayTemp.getMinutes(),
      todayTemp.getSeconds()
    ).getTime()
  );
  const SixDayAgo = new Date(
    new Date(
      todayTemp.getFullYear(),
      todayTemp.getMonth(),
      todayTemp.getDate() - 6,
      todayTemp.getHours(),
      todayTemp.getMinutes(),
      todayTemp.getSeconds()
    ).getTime()
  );
  //date stuff starts

  //allHabitDatesDots
  try {
    //array of booleans for all habits of dot graph
    var allHabitDatesDots: Array<boolean> = [];
    for (var i = 0; i < allHabitsOfSelectedUser.length; i++) {
      allHabitDatesDots.push(
        isInArray(allHabitsOfSelectedUser[i].dates, today)
      );
      allHabitDatesDots.push(
        isInArray(allHabitsOfSelectedUser[i].dates, OneDayAgo)
      );
      allHabitDatesDots.push(
        isInArray(allHabitsOfSelectedUser[i].dates, TwoDayAgo)
      );
      allHabitDatesDots.push(
        isInArray(allHabitsOfSelectedUser[i].dates, ThreeDayAgo)
      );
      allHabitDatesDots.push(
        isInArray(allHabitsOfSelectedUser[i].dates, FourDayAgo)
      );
      allHabitDatesDots.push(
        isInArray(allHabitsOfSelectedUser[i].dates, FiveDayAgo)
      );
      allHabitDatesDots.push(
        isInArray(allHabitsOfSelectedUser[i].dates, SixDayAgo)
      );
    }
  } catch (error) {
    console.log("allHabitDatesDots: ", error);
  }

  //friendAllHabitDatesDots
  useEffect(() => {
    try {
      //array of booleans for all habits of dot graph
      var friendAllHabitDatesDots: Array<boolean> = [];

      for (var i = 0; i < allHabitsOfSelectedUser.length; i++) {
        friendAllHabitDatesDots.push(
          isInArray(allHabitsOfSelectedUser[i].dates, today)
        );
        friendAllHabitDatesDots.push(
          isInArray(allHabitsOfSelectedUser[i].dates, OneDayAgo)
        );
        friendAllHabitDatesDots.push(
          isInArray(allHabitsOfSelectedUser[i].dates, TwoDayAgo)
        );
        friendAllHabitDatesDots.push(
          isInArray(allHabitsOfSelectedUser[i].dates, ThreeDayAgo)
        );
        friendAllHabitDatesDots.push(
          isInArray(allHabitsOfSelectedUser[i].dates, FourDayAgo)
        );
        friendAllHabitDatesDots.push(
          isInArray(allHabitsOfSelectedUser[i].dates, FiveDayAgo)
        );
        friendAllHabitDatesDots.push(
          isInArray(allHabitsOfSelectedUser[i].dates, SixDayAgo)
        );
      }
      setFriendAllHabitDatesDotsState(() => friendAllHabitDatesDots);
    } catch (error) {
      console.log("friendAllHabitDatesDots: ", error);
    }
  }, [friendIDState]); // You may want to update this dependency array based on your specific needs

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
                  allHabitsToday={allHabitsToday ? allHabitsToday : []}
                  allHabitsNumber={allHabitsToday ? allHabitsToday.length : 0}
                  allHabitsOfSelectedUser={
                    allHabitsOfSelectedUser ? allHabitsOfSelectedUser : []
                  }
                  allHabitsOfSelectedUserNumber={
                    allHabitsOfSelectedUser ? allHabitsOfSelectedUser.length : 0
                  }
                  currentHabitDatesIncluded={habitsTodayBoolean}
                  homeEditBool={homeEditBool}
                  setHomeEditBool={setHomeEditBool}
                  habitLoading={habitLoading}
                  refreshing={refreshing}
                  setRefreshing={setRefreshing}
                  onShare={onShare}
                  friendIDState={friendIDState}
                  setFriendIDState={setFriendIDState}
                  friendName={friendName}
                  setFriendName={setFriendName}
                  friendCurrentHabitWeekStreakState={friendCurrentHabitWeek}
                  friendAllHabitDatesDotsState={friendAllHabitDatesDotsState}
                  tempBarFilled={tempBarFilled}
                  setTempBarFilled={setTempBarFilled}
                  shareWithFriendList={shareWithFriendList}
                  setShareWithFriendList={setShareWithFriendList}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                  showInfoText={showInfoText}
                  setShowInfoText={setShowInfoText}
                  acceptOrRemoveModalVisible={acceptOrRemoveModalVisible}
                  setAcceptOrRemoveModalVisible={setAcceptOrRemoveModalVisible}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  editHabitSelected={editHabitSelected}
                  setEditHabitSelected={setEditHabitSelected}
                  habitNameState={habitNameState}
                  setHabitNameState={setHabitNameState}
                />
              )}
              options={{
                // resets screen states below
                // unmountOnBlur: true,
                tabBarButton: (props) => (
                  <BottomTabHomeButton
                    {...props}
                    onPressIn={() => Vibration.vibrate(10)}
                  />
                ),
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
                tabBarButton: (props) => (
                  <BottomTabAddButton
                    {...props}
                    onPressIn={() => Vibration.vibrate(10)}
                  />
                ),
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
                  allHabits={allHabits ? allHabits : []}
                  allHabitsNumber={allHabits ? allHabits.length : 0}
                  habitLoading={habitLoading}
                  refreshing={refreshing}
                  setRefreshing={setRefreshing}
                  onShare={onShare}
                  currentHabitWeekStreakState={currentHabitWeekStreak}
                  allHabitDatesDots={[]}
                />
              )}
              options={{
                tabBarButton: (props) => (
                  <BottomTabOverviewButton
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
