import * as React from "react";
import { memo } from "react";
import { View, ScrollView, TouchableOpacity, Vibration } from "react-native";
import FriendBar from "../add/shareComponents/FriendBar";
import { useAppDispatch, useSelector } from "../../state/store";
import {
  friendID,
  setAcceptOrRemoveFriendModalVisible,
  setFriendID,
  setFriendName,
  setSelectedUser,
} from "../../state/userSlice";

const FriendsCard = memo(
  (props: {
    navigation: any;
    friendElemID: any;
    name: string;
    image: string;
    email: string;
    pending: boolean;
  }) => {
    const { navigation, friendElemID, name, image, email, pending } = props;
    const dispatch = useAppDispatch();
    const friendIDState = useSelector(friendID);

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
              dispatch(setFriendID(friendElemID));
              dispatch(setFriendName(name));
              navigation.navigate("Friend", {
                name: name,
                friendID: friendIDState,
              });
            }}
            onLongPress={() => {
              dispatch(setAcceptOrRemoveFriendModalVisible(true));
              dispatch(setSelectedUser({ name, email, pending }));
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
