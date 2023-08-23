import React, { memo } from "react";
import { View, ScrollView } from "react-native";
import FriendBar from "../add/shareComponents/FriendBar";

const FriendsCard = memo((props: { name: string; image: string }) => {
  const { name, image } = props;

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          height: 49 * (5 + 1),
        }}
      >
        <FriendBar
          friendProfilePicture={image}
          friendName={name}
          barPositionLevel={49 * 0}
          friendSelected={false}
        />
      </View>
    </ScrollView>
  );
});

export default FriendsCard;
