import * as React from "react";
import { memo, useCallback, useEffect, useState } from "react";
import { Pressable, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

//types
import { StackNavParamList } from "../../src/types/BottomTabNavParamList";
// screens
import Home from "../../src/screens/Home";
import Profile from "../../src/screens/Profile";
import Settings from "../../src/screens/Settings";
import Friend from "../../src/screens/Friend";

//navbar components
import TopNavbarLogo from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarLogo";
import TopNavbarProfileImage from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarProfileImage";
import TopNavbarBackButton from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarBackButton";
import TopNavbarShareButton from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarShareButton";
import TopNavbarSettingsButton from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarSettingsButton";
import TopNavbarDoneButton from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarDoneButton";
import TopNavbarDeleteButton from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarDeleteButton";
import TopNavbarAddFriendButton from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarAddFriendButton";

import {
  updateHabitNameAction,
  deleteHabitAction,
} from "../../src/state/habitSlice";

const StackNavigator = createStackNavigator<StackNavParamList>();

const HomeSection = (props: any) => {
  const {
    navigation,
    dispatch,
    currentUser,
    allHabitsToday,
    currentHabitDatesIncluded,
    habitUpdated,
    habitLoading,
    onShare,
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
                  disabled={
                    navigation.getState().routes[0].params?.name ? false : true
                  }
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
        children={(props: any) => (
          <Profile
            {...props}
            navigation={props.navigation}
            dispatch={dispatch}
            currentUser={currentUser}
          />
        )}
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
        name="Friend"
        children={(props: any) => (
          <Friend
            {...props}
            navigation={navigation}
            dispatch={dispatch}
            habitUpdated={habitUpdated}
            habitLoading={habitLoading}
          />
        )}
      />
    </StackNavigator.Navigator>
  );
};

export default HomeSection;
