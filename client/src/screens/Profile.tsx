import * as React from "react";
import { memo, useCallback } from "react";

import {
  View,
  ScrollView,
  RefreshControl,
  Text,
  Modal,
  Pressable,
  Vibration,
} from "react-native";
import ProfileCard from "../components/profile/ProfileCard";
import FriendsCard from "../components/profile/FriendsCard";
import AddFriendsButton from "../components/profile/AddFriendsButton";

import uuid from "react-native-uuid";
import { useTheme } from "../context/ThemeContext";

const Profile = memo((props: any) => {
  const {
    navigation,
    dispatch,
    fetchCurrentUserProfileAction,
    sendFriendshipAction,
    updateCurrentUserImageAction,
    currentUser,
    refreshing,
    setRefreshing,
    showInfoText,
    setShowInfoText,
    acceptOrRemoveModalVisible,
    setAcceptOrRemoveModalVisible,
    selectedUser,
    setSelectedUser,
    friendIDState,
    setFriendIDState,
    friendName,
    setFriendName,
  } = props;
  const { theme } = useTheme();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(
      fetchCurrentUserProfileAction(
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          new Date().getHours(),
          new Date().getMinutes(),
          new Date().getSeconds()
        ).getTime()
      )
    );
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return currentUser.friends ? (
    <View
      style={{
        // display: "flex",
        height: "100%",
        backgroundColor: theme.backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView
        style={{
          marginBottom: 85,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {currentUser &&
          currentUser.firstName &&
          currentUser.email &&
          currentUser.image && (
            <ProfileCard
              name={currentUser.firstName}
              email={currentUser.email}
              image={currentUser.image}
              dispatch={dispatch}
              updateCurrentUserImageAction={updateCurrentUserImageAction}
            />
          )}
        <View
          style={{
            width: 345,
            backgroundColor: theme.backgroundColor,
          }}
        >
          <AddFriendsButton />
          {showInfoText ? (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>Press long to accept 🤝 or remove friend 💔</Text>
            </View>
          ) : (
            ""
          )}
          <Modal
            animationType="slide"
            transparent={true}
            visible={acceptOrRemoveModalVisible}
            onRequestClose={() => {
              setAcceptOrRemoveModalVisible(!acceptOrRemoveModalVisible);
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 22,
                backgroundColor: theme.fadedBackgroundColor,
              }}
            >
              <View
                style={{
                  margin: 20,
                  backgroundColor: theme.backgroundColor,
                  borderRadius: 20,
                  padding: 35,
                  alignItems: "center",
                  shadowColor: theme.fadedShadowColor,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                {selectedUser?.pending ? (
                  <Text
                    style={{
                      color: theme.primaryColor,
                      fontWeight: "bold",
                      textAlign: "center",
                      paddingBottom: 10,
                    }}
                  >
                    Accept friendship request from {selectedUser?.name}?
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: theme.primaryColor,
                      fontWeight: "bold",
                      textAlign: "center",
                      paddingBottom: 10,
                    }}
                  >
                    Remove {selectedUser?.name} from friends?
                  </Text>
                )}
                <Pressable
                  style={{
                    backgroundColor: theme.primaryColor,
                    borderRadius: 20,
                    padding: 10,
                    elevation: 2,
                  }}
                  onPressIn={() => Vibration.vibrate(10)}
                  onPress={() => {
                    setAcceptOrRemoveModalVisible(!acceptOrRemoveModalVisible);
                    dispatch(
                      sendFriendshipAction({ userMail: selectedUser.email })
                    );
                  }}
                >
                  <Text
                    style={{
                      color: theme.backgroundColor,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Yes
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          {currentUser &&
            currentUser.friends &&
            currentUser.friends.length > 0 &&
            currentUser.friends.map((friendElem: any, index: number) => (
              <FriendsCard
                navigation={navigation}
                friendID={friendElem.friend._id}
                name={friendElem.friend.firstName}
                image={friendElem.friend.image}
                email={friendElem.friend.email}
                i={index}
                key={uuid.v4() as string}
                pending={friendElem.pending}
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
            ))}
        </View>
      </ScrollView>
    </View>
  ) : (
    <></>
  );
});

export default Profile;
