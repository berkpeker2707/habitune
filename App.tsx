import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";

// screens
import { Home } from "./src/screens/Home";
import { Settings } from "./src/screens/Settings";

const Tab = createBottomTabNavigator();

const options: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: "red",
    borderRadius: 15,
    height: 90,
  },
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={options}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!</Text>
    // <StatusBar style="auto" />
    // </View>
  );
};

export default App;
