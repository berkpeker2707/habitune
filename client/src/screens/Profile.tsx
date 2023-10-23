import * as React from "react";
import { memo, useCallback, useState } from "react";

import { useFocusEffect } from "@react-navigation/native";

import {
  View,
  ScrollView,
  RefreshControl,
  Text,
  Modal,
  Pressable,
} from "react-native";
import ProfileCard from "../components/profile/ProfileCard";
import FriendsCard from "../components/profile/FriendsCard";
import AddFriendsButton from "../components/profile/AddFriendsButton";
import {
  fetchCurrentUserProfileAction,
  sendFriendshipAction,
} from "../state/userSlice";
import { useAppDispatch } from "../state/store";

import uuid from "react-native-uuid";

const Profile = memo((props: any) => {
  const {
    navigation,
    homeEditState,
    dispatch,
    currentUser,
    userLoading,
    allHabits,
    allHabitsNumber,
    habitUpdated,
    habitLoading,
    currentHabitDatesIncluded,
    modalVisible,
    setModalVisible,
  } = props;

  const controller = new AbortController();

  const [showInfoText, setShowInfoText] = useState(false);
  const [acceptOrRemoveModalVisible, setAcceptOrRemoveModalVisible] =
    useState(false);
  const [selectedUser, setSelectedUser] = useState({
    email: "",
    name: "",
    pending: false,
  });

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchCurrentUserProfileAction());
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return currentUser.friends ? (
    <View
      style={{
        // display: "flex",
        height: "100%",
        backgroundColor: "#FFFFFF",
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
            />
          )}
        <View
          style={{
            width: 345,
            backgroundColor: "#FFFFFF",
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
              }}
            >
              <View
                style={{
                  margin: 20,
                  backgroundColor: "white",
                  borderRadius: 20,
                  padding: 35,
                  alignItems: "center",
                  shadowColor: "#000",
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
                      color: "#968EB0",
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
                      color: "#968EB0",
                      fontWeight: "bold",
                      textAlign: "center",
                      paddingBottom: 10,
                    }}
                  >
                    Remove {selectedUser?.name} from friends?
                  </Text>
                )}
                <Pressable
                  style={[
                    { borderRadius: 20, padding: 10, elevation: 2 },
                    { backgroundColor: "#968EB0" },
                  ]}
                  onPress={() => {
                    setAcceptOrRemoveModalVisible(!acceptOrRemoveModalVisible);
                    dispatch(
                      sendFriendshipAction({ userMail: selectedUser.email })
                    );
                  }}
                >
                  <Text
                    style={{
                      color: "white",
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
