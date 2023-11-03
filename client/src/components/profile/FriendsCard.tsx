import * as React from "react";
import { memo } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
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
    showInfoText: any;
    setShowInfoText: any;
    acceptOrRemoveModalVisible: any;
    setAcceptOrRemoveModalVisible: any;
    selectedUser: any;
    setSelectedUser: any;
    friendIDState: number;
    setFriendIDState: Function;
  }) => {
    const {
      navigation,
      friendID,
      name,
      image,
      email,
      i,
      pending,
      showInfoText,
      setShowInfoText,
      acceptOrRemoveModalVisible,
      setAcceptOrRemoveModalVisible,
      selectedUser,
      setSelectedUser,
      friendIDState,
      setFriendIDState,
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
            onPress={() => {
              // setShowInfoText(!showInfoText);
              setTimeout(() => {
                setShowInfoText(false);
              }, 5000);
              setFriendIDState(() => friendID);
              // console.log(selectedUser);
              navigation.navigate("Friend", {
                // currentUser: currentUser,
                // userUpdated: userUpdated,
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
