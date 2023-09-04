import * as React from "react";
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
import "react-native-gesture-handler";

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

import { store, useAppDispatch, useSelector } from "./src/state/store";
import {
  createHabitAction,
  fetchAllHabitsAction,
  selectHabitUpdated,
  selectHabits,
  selectHabitLoading,
  updateHabitNameAction,
  deleteHabitAction,
} from "./src/state/habitSlice";
import {
  fetchCurrentUserProfileAction,
  selectFetchCurrentUserProfile,
  selectSignInWithGoogle,
  selectUserUpdated,
} from "./src/state/userSlice";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { useCallback } from "react";

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

const HomeSection = () => {
  const navigation = useNavigation<generalScreenProp>();

  const controller = new AbortController();

  const dispatch = useAppDispatch();

  const currentUser = useSelector(selectFetchCurrentUserProfile);
  const allHabits = useSelector(selectHabits);

  const userUpdated = useSelector(selectUserUpdated);
  const habitUpdated = useSelector(selectHabitUpdated);
  const habitLoading = useSelector(selectHabitLoading);

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
  //date stuff ends

  var currentHabitDatesIncluded = useCallback(
    allHabits.map((allHabitsItem: any) =>
      isInArray(allHabitsItem.dates, todayLocal)
    ),

    [allHabits, habitUpdated]
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchCurrentUserProfileAction());

      return () => {
        controller.abort();
      };
    }, [userUpdated])
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchAllHabitsAction());

      return () => {
        controller.abort();
      };
    }, [habitUpdated])
  );

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
            homeEditState={
              navigation.getState().routes[0].params?.homeEditState
            }
            allHabits={allHabits}
            allHabitsNumber={allHabits.length}
            habitUpdated={habitUpdated}
            habitLoading={habitLoading}
            currentHabitDatesIncluded={currentHabitDatesIncluded}
          />
        )}
        options={{
          headerTitle: !navigation.getState().routes[0].params?.homeEditState
            ? "Today"
            : "",
          headerLeft: () =>
            !navigation.getState().routes[0].params?.homeEditState ? (
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
            !navigation.getState().routes[0].params?.homeEditState ? (
              <Pressable
                onPress={() => {
                  try {
                    navigation.navigate("Profile");
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
                      console.log("share with friends pressed");
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

const AddSection = () => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation<generalScreenProp>();

  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerStyle: { height: 70 },
      }}
    >
      <StackNavigator.Screen
        name="Add"
        component={Add}
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
                // disabled={
                //   navigation.getState().routes[1].state?.routes[0].params?.firstDate &&
                //   navigation.getState().routes[1].state?.routes[0].params?.lastDate &&
                //   navigation.getState().routes[1].state?.routes[0].params?.upcomingDates &&
                //   navigation.getState().routes[1].state?.routes[0].params?.name &&
                //   navigation.getState().routes[1].state?.routes[0].params?.color
                //     ? true
                //     : false
                // }
                onPress={() => {
                  try {
                    dispatch(
                      createHabitAction(
                        navigation.getState().routes[1].state?.routes[0].params
                      )
                    );
                    navigation.navigate("HomeSection");
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

const OverviewSection = () => {
  const navigation = useNavigation<generalScreenProp>();

  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerStyle: { height: 70 },
      }}
    >
      <StackNavigator.Screen
        name="Overview"
        component={Overview}
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

//wrapper for state
const AppWrapper = () => {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

const App = () => {
  const token = useSelector(selectSignInWithGoogle);

  return (
    <NavigationContainer>
      <BottomTabNav.Navigator screenOptions={bottomTabNavigationOptions}>
        {!token ? (
          <BottomTabNav.Screen
            name="Signin"
            component={Signin}
            options={{
              tabBarButton: () => null,
            }}
          />
        ) : (
          <>
            <BottomTabNav.Screen
              name="HomeSection"
              component={HomeSection}
              options={{
                // resets screen states below
                // unmountOnBlur: true,
                tabBarButton: (props) => <BottomTabHomeButton {...props} />,
              }}
            />
            <BottomTabNav.Screen
              name="AddSection"
              component={AddSection}
              options={{
                tabBarButton: (props) => <BottomTabAddButton {...props} />,
              }}
            />
            <BottomTabNav.Screen
              name="OverviewSection"
              component={OverviewSection}
              options={{
                tabBarButton: (props) => <BottomTabOverviewButton {...props} />,
              }}
            />
          </>
        )}
      </BottomTabNav.Navigator>
    </NavigationContainer>
  );
};

export default AppWrapper;
