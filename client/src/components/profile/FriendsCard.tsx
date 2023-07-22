import * as React from "react";
import { View, ScrollView } from "react-native";
import FriendBar from "../add/shareComponents/FriendBar";

const FriendsCard = (props: any) => {
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          height: 49 * (5 + 1),
        }}
      >
        <FriendBar
          friendProfilePicture={"https://i.pravatar.cc/300"}
          friendName={"İrem"}
          barPositionLevel={49 * 0}
          friendSelected={false}
        />
      </View>
    </ScrollView>
  );
};

export default FriendsCard;
