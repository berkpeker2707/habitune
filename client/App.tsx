import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Pressable, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
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
import TopNavbarEditButton from "./src/components/navbarComponents/TopNavbarComponents/TopNavbarEditButton";

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

//auth state temp
const auth = true;

const HomeSection = () => {
  const navigation = useNavigation<generalScreenProp>();

  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerStyle: { height: 70 },
      }}
    >
      <StackNavigator.Screen
        name="Home"
        component={Home}
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
                    navigation.setParams({
                      homeEditState: false,
                    });
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
                  navigation.navigate("Profile");
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
                  <TopNavbarProfileImage
                    imageSource={
                      "https://fastly.picsum.photos/id/100/300/300.jpg?hmac=rRJwCdAq0dwpM7tpG0mEUD9l4HJLw_ZX0pbnCw5xn_U"
                    }
                  />
                </View>
              </Pressable>
            ) : (
              <View style={{ flexDirection: "row" }}>
                <Pressable
                  onPress={() => {
                    console.log(
                      navigation.getState().routes[0].params
                      // navigation.getState().routes[1].state?.routes[0]
                    );
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
                    console.log("share with friends pressed");
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
                    console.log("delete habit is pressed");
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
                    navigation.navigate("Settings");
                  }}
                >
                  <TopNavbarShareButton />
                </Pressable>
              </View>
              <View style={{ paddingRight: 10, paddingLeft: 20 }}>
                <Pressable
                  onPress={() => {
                    navigation.navigate("Settings");
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
                  navigation.goBack();
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
                  navigation.goBack();
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
                  navigation.goBack();
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
                  console.log(
                    navigation.getState().routes[1].state?.routes[0].params
                  );
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
                    navigation.navigate("Settings");
                  }}
                >
                  <TopNavbarShareButton />
                </Pressable>
              </View>
              <View style={{ paddingRight: 10, paddingLeft: 20 }}>
                <Pressable
                  onPress={() => {
                    navigation.navigate("Settings");
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
                  navigation.goBack();
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
                  navigation.goBack();
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

const App = () => {
  return (
    <NavigationContainer>
      <BottomTabNav.Navigator screenOptions={bottomTabNavigationOptions}>
        {!auth ? (
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

export default App;
