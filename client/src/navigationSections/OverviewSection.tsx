import * as React from "react";
import { Pressable, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

//types
import { StackNavParamList } from "../../src/types/BottomTabNavParamList";
// screens
import Overview from "../../src/screens/Overview";
import Settings from "../../src/screens/Settings";

//navbar components
import TopNavbarLogo from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarLogo";
import TopNavbarBackButton from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarBackButton";
import TopNavbarShareButton from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarShareButton";
import TopNavbarSettingsButton from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarSettingsButton";

const StackNavigator = createStackNavigator<StackNavParamList>();

const OverviewSection = (props: any) => {
  const {
    navigation,
    dispatch,
    fetchAllHabitsAction,
    allHabits,
    habitUpdated,
    habitLoading,
    isInArray,
    onShare,
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
            dispatch={dispatch}
            fetchAllHabitsAction={fetchAllHabitsAction}
            allHabits={allHabits ? allHabits : []}
            habitUpdated={habitUpdated}
            habitLoading={habitLoading}
            isInArray={isInArray}
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
        children={(props: any) => <Settings {...props} dispatch={dispatch} />}
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

export default OverviewSection;
