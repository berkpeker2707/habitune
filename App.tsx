import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";

//svg
import Svg, { Circle, Defs, G, Path } from "react-native-svg";

// screens
import { Home } from "./src/screens/Home";
import { Add } from "./src/screens/Add";
import { Settings } from "./src/screens/Settings";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabHomeButton = (props: any) => {
  const { accessibilityState, onPress } = props;

  if (accessibilityState.selected) {
    return (
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          style={[styles.otherNavButtons]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.svgGapFiller]} />
            <Svg
              width={26}
              height={32}
              fill="none"
              viewBox="0 0 26 32"
              {...props}
            >
              <G filter="url(#filter0_b_195_435)">
                <Path
                  fill="#968EB0"
                  d="M0 24.481V12.908a3 3 0 01.946-2.187l9.523-8.942a3 3 0 013.925-.158l10.477 8.362A3 3 0 0126 12.328V28.2a3 3 0 01-3 3H3a3 3 0 01-3-3v-3.719z"
                />
              </G>
              <Defs></Defs>
            </Svg>
            <View style={[styles.svgGapFiller]} />
          </View>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          style={[styles.otherNavButtons]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.svgGapFiller]} />
            <Svg
              width={27}
              height={32}
              fill="none"
              viewBox="0 0 27 32"
              {...props}
            >
              <G filter="url(#filter0_b_195_427)">
                <Path
                  stroke="#968EB0"
                  d="M1 14.912v9.627M6.77 31h13.46M26 24.553v-9.46m0-2.184V28a3 3 0 01-3 3H4a3 3 0 01-3-3V13.461a3 3 0 01.946-2.187l9.048-8.495a3 3 0 013.925-.158l9.952 7.943A3 3 0 0126 12.91z"
                />
              </G>
              <Defs></Defs>
            </Svg>
            <View style={[styles.svgGapFiller]} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

const BottomTabAddButton = (props: any) => {
  const { route, children, onPress } = props;

  return (
    <View style={styles.btnWrapper}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        // style={[styles.addNavButtons]}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={[styles.svgGapFiller]} />
          <Svg width={71} height={58} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={"white"}
            />
          </Svg>
          <View style={[styles.addNavButtons]}>
            <Svg
              width={62}
              height={62}
              viewBox="0 0 62 62"
              fill="none"
              {...props}
            >
              <G filter="url(#filter0_d_194_424)">
                <Circle cx={31} cy={31} r={27} fill="#fff" />
              </G>
              <G filter="url(#filter1_d_194_424)" fill="#968EB0">
                <Path d="M29 42V20a2 2 0 114 0v22a2 2 0 11-4 0z" />
                <Path d="M42 33H20a2 2 0 110-4h22a2 2 0 110 4z" />
              </G>
              <Defs></Defs>
            </Svg>
          </View>

          <View style={styles.svgGapFiller} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const BottomTabStatsButton = (props: any) => {
  const { accessibilityState, onPress } = props;

  if (accessibilityState.selected) {
    return (
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          style={[styles.otherNavButtons]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.svgGapFiller]} />
            <Svg
              width={54}
              height={29}
              fill="none"
              viewBox="0 0 54 29"
              {...props}
            >
              <Circle
                cx={5.5}
                cy={23.5}
                r={4.5}
                fill="#968EB0"
                stroke="#968EB0"
              />
              <Circle
                cx={24.5}
                cy={6.5}
                r={4.5}
                fill="#968EB0"
                stroke="#968EB0"
              />
              <Path stroke="#968EB0" d="M20.967 7.743L7.669 19.712M44 6H29" />
              <Circle
                cx={48.5}
                cy={5.5}
                r={4.5}
                fill="#968EB0"
                stroke="#968EB0"
              />
            </Svg>
            <View style={[styles.svgGapFiller]} />
          </View>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          style={[styles.otherNavButtons]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.svgGapFiller]} />
            <Svg
              width={54}
              height={29}
              fill="none"
              viewBox="0 0 54 29"
              {...props}
            >
              <Circle cx={5.5} cy={23.5} r={4.5} stroke="#968EB0" />
              <Circle cx={48.5} cy={5.5} r={4.5} stroke="#968EB0" />
              <Circle cx={24.5} cy={6.5} r={4.5} stroke="#968EB0" />
              <Path stroke="#968EB0" d="M20.967 7.743L7.669 19.712M44 6H29" />
            </Svg>
            <View style={[styles.svgGapFiller]} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

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
          name="Settings"
          component={Settings}
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

const styles = StyleSheet.create({
  btnWrapper: {
    flex: 1,
    alignItems: "center",
  },
  addNavButtons: {
    flex: 1,
    position: "absolute",
    top: -22,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    // backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
  },
  otherNavButtons: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
  },
  svgGapFiller: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default App;
