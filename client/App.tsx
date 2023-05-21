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
  HomeNavParamList,
  generalScreenProp,
} from "./src/types/BottomTabNavParamList";

// screens
import { Signin } from "./src/screens/Signin";
import { Home } from "./src/screens/Home";
import { Add } from "./src/screens/Add";
import { Overview } from "./src/screens/Overview";
import { Profile } from "./src/screens/Profile";

//navbar components
import BottomTabHomeButton from "./src/components/navbarComponents/BottomNavbarComponents/BottomTabHomeButton";
import BottomTabAddButton from "./src/components/navbarComponents/BottomNavbarComponents/BottomTabAddButton";
import BottomTabOverviewButton from "./src/components/navbarComponents/BottomNavbarComponents/BottomTabOverviewButton";
import TopNavbarLogo from "./src/components/navbarComponents/TopNavbarLogo";
import TopNavbarProfileImage from "./src/components/navbarComponents/TopNavbarProfileImage";

const bottomTabNavigationOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    backgroundColor: "transparent",
    borderTopWidth: 0,
    bottom: 0,
    right: 0,
    left: 0,
    height: 80,
  },
  tabBarInactiveTintColor: "#968EB0",
};

const BottomTabNav = createBottomTabNavigator<BottomTabNavParamList>();
const StackNavigator = createStackNavigator<HomeNavParamList>();

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
        name="Icon"
        component={Home}
        options={{
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
          headerTitle: "Today",
          headerRight: () => (
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
          ),
        }}
      />
      <StackNavigator.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          headerRight: () => <TopNavbarLogo />,
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
                tabBarButton: (props) => <BottomTabHomeButton {...props} />,
              }}
            />
            <BottomTabNav.Screen
              name="Add"
              component={Add}
              options={{
                tabBarButton: (props) => <BottomTabAddButton {...props} />,
              }}
            />
            <BottomTabNav.Screen
              name="Overview"
              component={Overview}
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
