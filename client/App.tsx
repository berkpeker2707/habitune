import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Pressable, View } from "react-native";
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
import Share from "./src/screens/Share";
import Settings from "./src/screens/Settings";

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
  selectSignInWithGoogle,
  selectUserLoading,
  selectUserUpdated,
} from "./src/state/userSlice";
import {
  createHabitAction,
  // fetchAllHabitsAction,
  fetchAllTodayHabitsAction,
  selectHabitUpdated,
  // selectHabits,
  selectHabitsToday,
  selectHabitLoading,
  updateHabitNameAction,
  deleteHabitAction,
} from "./src/state/habitSlice";

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

const HomeSection = (props: any) => {
  const {
    navigation,
    controller,
    dispatch,
    token,
    currentUser,
    allHabitsToday,
    currentHabitDatesIncluded,
    userUpdated,
    habitUpdated,
    habitLoading,
  } = props;

  const [modalVisible, setModalVisible] = useState(false);

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
            habitUpdated={habitUpdated}
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
                      userUpdated: userUpdated,
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
        component={Profile}
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
                      navigation.navigate("Settings");
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
        name="Share"
        component={Share}
        options={{
          headerTitle: "Share",
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
    </StackNavigator.Navigator>
  );
};

const AddSection = (props: any) => {
  const {
    navigation,
    controller,
    dispatch,
    token,
    currentUser,
    allHabitsToday,
    currentHabitDatesIncluded,
    userUpdated,
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
};

const OverviewSection = (props: any) => {
  const {
    navigation,
    controller,
    dispatch,
    token,
    currentUser,
    allHabitsToday,
    currentHabitDatesIncluded,
    userUpdated,
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
            homeEditState={navigation.getState().routes[0].params.homeEditState}
            allHabits={allHabitsToday ? allHabitsToday : []}
            allHabitsNumber={allHabitsToday ? allHabitsToday.length : 0}
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
                      navigation.navigate("Settings");
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
        name="Share"
        component={Share}
        options={{
          headerTitle: "Share",
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
                    console.log("Share Error: ", error);
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

  const currentUser = useSelector(selectFetchCurrentUserProfile);

  const userUpdated = useSelector(selectUserUpdated);

  const userLoading = useSelector(selectUserLoading);

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

    const userTimezoneOffset = today.getTimezoneOffset() * 60000;
    const todayLocal = new Date(today.getTime() - userTimezoneOffset);

    //need this for setting default hour 21
    //if backend is not 21 but 00, remove this
    // const todayLocal21 = new Date(todayLocal.getTime() + 3600000 * 21);

    const isInArray = (array: any[], value: Date) => {
      return array.some((item) => {
        return new Date(item).getTime() == value.getTime();
      });
    };
    // date stuff ends

    var currentHabitDatesIncluded = useCallback(
      allHabitsToday &&
        allHabitsToday.map((allHabitsItem: any) => {
          return isInArray(allHabitsItem.dates, todayLocal);
        }),
      [allHabitsToday, habitUpdated]
    );
  } catch (error) {
    console.log("currentHabitDatesIncluded error: ", error);
  }

  useEffect(() => {
    if (token && token.length > 0) {
      dispatch(fetchCurrentUserProfileAction());

      // console.log(
      //   "🚀 ~ file: App.tsx:799 ~ useEffect ~ currentUser:",
      //   currentUser
      // );

      // console.log("🚀 ~ file: App.tsx:803 ~ useEffect ~ token:", token);
    }
  }, [token]);

  useEffect(() => {
    if (token && token.length > 0) {
      dispatch(fetchAllTodayHabitsAction());
      // console.log(
      //   "🚀 ~ file: App.tsx:811 ~ App ~ allHabitsToday:",
      //   allHabitsToday
      // );
    }
  }, [currentUser, habitUpdated]);

  return (
    <BottomTabNav.Navigator screenOptions={bottomTabNavigationOptions}>
      {!token ? (
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
                userUpdated={userUpdated}
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
                userUpdated={userUpdated}
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
                allHabitsToday={allHabitsToday}
                currentHabitDatesIncluded={currentHabitDatesIncluded}
                userUpdated={userUpdated}
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
  );
};

export default AppWrapper;
