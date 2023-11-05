import * as React from "react";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavParamList } from "../../src/types/BottomTabNavParamList";
import Home from "../../src/screens/Home";
import Profile from "../../src/screens/Profile";
import Settings from "../../src/screens/Settings";
import Friend from "../../src/screens/Friend";

import TopNavbarLogo from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarLogo";
import TopNavbarProfileImage from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarProfileImage";
import TopNavbarBackButton from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarBackButton";
import TopNavbarShareButton from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarShareButton";
import TopNavbarSettingsButton from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarSettingsButton";
import TopNavbarDoneButton from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarDoneButton";
import TopNavbarDeleteButton from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarDeleteButton";
import TopNavbarAddFriendButton from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarAddFriendButton";

const StackNavigator = createStackNavigator<StackNavParamList>();

const HomeSection = (props: any) => {
  const {
    navigation,
    dispatch,
    fetchCurrentUserProfileAction,
    fetchAllHabitsAction,
    fetchAllTodayHabitsAction,
    fetchAllHabitsOfSelectedUserAction,
    updateHabitCompletedDateAction,
    updateHabitSharedWithAction,
    updateHabitNameAction,
    sendFriendshipAction,
    deleteUserAction,
    deleteHabitAction,
    notificationSendAction,
    revertAll,
    revertAllHabit,
    currentUser,
    allHabits,
    allHabitsToday,
    allHabitsNumber,
    allHabitsOfSelectedUser,
    allHabitsOfSelectedUserNumber,
    currentHabitDatesIncluded,
    homeEditBool,
    setHomeEditBool,
    habitLoading,
    refreshing,
    setRefreshing,
    onShare,
    friendIDState,
    setFriendIDState,
    friendCurrentHabitWeekStreakState,
    friendAllHabitDatesDotsState,
    tempBarFilled,
    setTempBarFilled,
    shareWithFriendList,
    setShareWithFriendList,
    selectedItem,
    setSelectedItem,
    nameChangable,
    setNameChangable,
    text,
    onChangeText,
    modalVisible,
    setModalVisible,
    showInfoText,
    setShowInfoText,
    acceptOrRemoveModalVisible,
    setAcceptOrRemoveModalVisible,
    selectedUser,
    setSelectedUser,
  } = props;

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
            dispatch={dispatch}
            fetchAllTodayHabitsAction={fetchAllTodayHabitsAction}
            updateHabitCompletedDateAction={updateHabitCompletedDateAction}
            updateHabitSharedWithAction={updateHabitSharedWithAction}
            notificationSendAction={notificationSendAction}
            currentUser={currentUser}
            allHabits={allHabitsToday}
            allHabitsNumber={allHabitsNumber}
            currentHabitDatesIncluded={currentHabitDatesIncluded}
            homeEditBool={homeEditBool}
            setHomeEditBool={setHomeEditBool}
            habitLoading={habitLoading}
            tempBarFilled={tempBarFilled}
            setTempBarFilled={setTempBarFilled}
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            shareWithFriendList={shareWithFriendList}
            setShareWithFriendList={setShareWithFriendList}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            nameChangable={nameChangable}
            setNameChangable={setNameChangable}
            text={text}
            onChangeText={onChangeText}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        )}
        options={{
          headerTitle: !homeEditBool ? "Today" : "",
          headerLeft: () =>
            !homeEditBool ? (
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
                      setHomeEditBool(false);
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
            !homeEditBool ? (
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
                      setHomeEditBool(false);
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
                      setHomeEditBool(false);
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
            navigation={navigation}
            dispatch={dispatch}
            fetchCurrentUserProfileAction={fetchCurrentUserProfileAction}
            sendFriendshipAction={sendFriendshipAction}
            currentUser={currentUser}
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            showInfoText={showInfoText}
            setShowInfoText={setShowInfoText}
            acceptOrRemoveModalVisible={acceptOrRemoveModalVisible}
            setAcceptOrRemoveModalVisible={setAcceptOrRemoveModalVisible}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            friendIDState={friendIDState}
            setFriendIDState={setFriendIDState}
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
        children={(props: any) => (
          <Settings
            {...props}
            dispatch={dispatch}
            revertAll={revertAll}
            revertAllHabit={revertAllHabit}
            deleteUserAction={deleteUserAction}
          />
        )}
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
            fetchAllHabitsAction={fetchAllHabitsAction}
            fetchAllHabitsOfSelectedUserAction={
              fetchAllHabitsOfSelectedUserAction
            }
            allHabits={allHabits}
            allHabitsNumber={allHabitsNumber}
            allHabitsOfSelectedUser={allHabitsOfSelectedUser}
            allHabitsOfSelectedUserNumber={allHabitsOfSelectedUserNumber}
            habitLoading={habitLoading}
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            isItCurrentUser={false}
            friendCurrentHabitWeekStreakState={
              friendCurrentHabitWeekStreakState
            }
            friendAllHabitDatesDotsState={friendAllHabitDatesDotsState}
          />
        )}
      />
    </StackNavigator.Navigator>
  );
};

export default HomeSection;
