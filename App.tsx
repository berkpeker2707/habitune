import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// screens
import { Home } from "./src/screens/Home";
import { Settings } from "./src/screens/Settings";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!</Text>
    // <StatusBar style="auto" />
    // </View>
  );
}
