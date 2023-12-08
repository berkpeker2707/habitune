import * as React from "react";
import { memo } from "react";
import { View, ScrollView, TouchableOpacity, Vibration } from "react-native";
import FriendBar from "../add/shareComponents/FriendBar";

const FriendsCard = memo(
  (props: {
    navigation: any;
    friendID: any;
    name: string;
    image: string;
    email: string;
    i: number;
    pending: boolean;
    acceptOrRemoveModalVisible: any;
    setAcceptOrRemoveModalVisible: any;
    selectedUser: any;
    setSelectedUser: any;
    friendIDState: number;
    setFriendIDState: Function;
    friendName: number;
    setFriendName: Function;
  }) => {
    const {
      navigation,
      friendID,
      name,
      image,
      email,
      pending,
      acceptOrRemoveModalVisible,
      setAcceptOrRemoveModalVisible,
      setSelectedUser,
      friendIDState,
      setFriendIDState,
      setFriendName,
    } = props;

    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            height: 49,
          }}
        >
          <TouchableOpacity
            onPressIn={() => Vibration.vibrate(10)}
            onPress={() => {
              setFriendIDState(() => friendID);
              setFriendName(() => name);
              navigation.navigate("Friend", {
                name: name,
                friendID: friendIDState,
              });
            }}
            onLongPress={() => {
              setAcceptOrRemoveModalVisible(!acceptOrRemoveModalVisible);
              setSelectedUser(() => ({ name, email, pending }));
            }}
          >
            <FriendBar
              friendProfilePicture={image}
              friendName={name}
              friendSelected={false}
              pending={pending}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
);

export default FriendsCard;
