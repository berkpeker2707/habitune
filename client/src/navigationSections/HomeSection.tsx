import * as React from "react";
import { Pressable, Vibration, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavParamList } from "../../src/types/BottomTabNavParamList";
import Home from "../../src/screens/Home";
import Profile from "../../src/screens/Profile";
import Settings from "../../src/screens/Settings";
import Friend from "../../src/screens/Friend";

import NavbarLogo from "../components/icons/NavbarLogo";
import TopNavbarProfileImage from "../../src/components/navbarComponents/TopNavbarComponents/TopNavbarProfileImage";
import BackIcon from "../components/icons/BackIcon";
import ShareIcon from "../components/icons/ShareIcon";
import SettingsIcon from "../components/icons/SettingsIcon";
import DoneIcon from "../components/icons/DoneIcon";
import DeleteIcon from "../components/icons/DeleteIcon";
import AddFriendIcon from "../components/icons/AddFriendIcon";
import { useTheme } from "../context/ThemeContext";

const StackNavigator = createStackNavigator<StackNavParamList>();

const HomeSection = (props: any) => {
  const {
    navigation,
    dispatch,
    updateCurrentUserImageAction,
    fetchCurrentUserProfileAction,
    fetchAllHabitsAction,
    fetchAllTodayHabitsAction,
    fetchAllHabitsOfSelectedUserAction,
    updateHabitCompletedDateAction,
    updateHabitSharedWithAction,
    updateHabitNameAction,
    sendFriendshipAction,
    deleteUserAction,
    sendFeedbackAction,
    deleteHabitAction,
    notificationSendAction,
    revertAll,
    revertAllHabit,
    currentUser,
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
    friendName,
    setFriendName,
    friendCurrentHabitWeekStreakState,
    friendAllHabitDatesDotsState,
    tempBarFilled,
    setTempBarFilled,
    shareWithFriendList,
    setShareWithFriendList,
    selectedItem,
    setSelectedItem,
    shareWithFriendListModal,
    setShareWithFriendListModal,
    showInfoText,
    setShowInfoText,
    acceptOrRemoveModalVisible,
    setAcceptOrRemoveModalVisible,
    selectedUser,
    setSelectedUser,
    editHabitSelected,
    setEditHabitSelected,
    habitNameState,
    setHabitNameState,
  } = props;
  const { theme } = useTheme();

  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerStyle: { height: 70, backgroundColor: theme.backgroundColor },
        headerTitleStyle: { color: theme.borderColor },
        cardStyle: { backgroundColor: theme.backgroundColor },
      }}
    >
      <StackNavigator.Screen
        name="Home"
        children={(props: any) => (
          <Home
            {...props}
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
            shareWithFriendListModal={shareWithFriendListModal}
            setShareWithFriendListModal={setShareWithFriendListModal}
            setEditHabitSelected={setEditHabitSelected}
            setHabitNameState={setHabitNameState}
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
                <NavbarLogo />
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
                  onPressIn={() => Vibration.vibrate(10)}
                  onPress={() => {
                    try {
                      setHomeEditBool(false);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  <BackIcon />
                </Pressable>
              </View>
            ),
          headerRight: () =>
            !homeEditBool ? (
              <Pressable
                onPressIn={() => Vibration.vibrate(10)}
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
                  disabled={habitNameState ? false : true}
                  onPressIn={() => Vibration.vibrate(10)}
                  onPress={() => {
                    try {
                      dispatch(
                        updateHabitNameAction({
                          _id: editHabitSelected,
                          name: habitNameState,
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
                    {/* <EditIcon /> */}
                    <DoneIcon />
                  </View>
                </Pressable>
                <Pressable
                  onPressIn={() => Vibration.vibrate(10)}
                  onPress={() => {
                    try {
                      setShareWithFriendListModal(!shareWithFriendListModal);
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
                    <AddFriendIcon />
                  </View>
                </Pressable>
                <Pressable
                  onPressIn={() => Vibration.vibrate(10)}
                  onPress={() => {
                    try {
                      dispatch(
                        deleteHabitAction({
                          _id: selectedItem,
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
                    <DeleteIcon />
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
            updateCurrentUserImageAction={updateCurrentUserImageAction}
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
            friendName={friendName}
            setFriendName={setFriendName}
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
              <NavbarLogo />
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
                  onPressIn={() => Vibration.vibrate(10)}
                  onPress={() => {
                    try {
                      onShare();
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  <ShareIcon />
                </Pressable>
              </View>
              <View style={{ flexBasis: "100%", height: 0 }}></View>
              <View style={{ paddingRight: 10, paddingLeft: 20 }}>
                <Pressable
                  onPressIn={() => Vibration.vibrate(10)}
                  onPress={() => {
                    try {
                      navigation.navigate("Settings");
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  <SettingsIcon />
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
            sendFeedbackAction={sendFeedbackAction}
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
                onPressIn={() => Vibration.vibrate(10)}
                onPress={() => {
                  try {
                    navigation.goBack();
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <BackIcon />
              </Pressable>
            </View>
          ),
        }}
      />
      <StackNavigator.Screen
        name="Friend"
        options={{ title: `${friendName}'s Habits` }}
        children={(props: any) => (
          <Friend
            {...props}
            dispatch={dispatch}
            fetchAllHabitsAction={fetchAllHabitsAction}
            fetchAllHabitsOfSelectedUserAction={
              fetchAllHabitsOfSelectedUserAction
            }
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
