import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";

// screens
import { Home } from "./src/screens/Home";
import { Add } from "./src/screens/Add";
import { Stats } from "./src/screens/Stats";

//navbar buttons
import BottomTabHomeButton from "./src/components/navbarComponents/BottomTabHomeButton";
import BottomTabAddButton from "./src/components/navbarComponents/BottomTabAddButton";
import BottomTabStatsButton from "./src/components/navbarComponents/BottomTabStatsButton";

const { Navigator, Screen } = createBottomTabNavigator();

const options: BottomTabNavigationOptions = {
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

const App = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={options}>
        <Screen
          name="Home"
          component={Home}
          options={{
            tabBarButton: (props) => <BottomTabHomeButton {...props} />,
          }}
        />
        <Screen
          name="Add"
          component={Add}
          options={{
            tabBarButton: (props) => <BottomTabAddButton {...props} />,
          }}
        />
        <Screen
          name="Stats"
          component={Stats}
          options={{
            tabBarButton: (props) => <BottomTabStatsButton {...props} />,
          }}
        />
      </Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!</Text>
    // <StatusBar style="auto" />
    // </View>
  );
};

export default App;
