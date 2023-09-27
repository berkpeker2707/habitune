import * as React from "react";
import { memo } from "react";

import { View, ScrollView } from "react-native";
import FriendBar from "../add/shareComponents/FriendBar";

const FriendsCard = memo(
  (props: { name: string; image: string; i: number; pending: boolean }) => {
    const { name, image, i, pending } = props;

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
            barPositionLevel={49 * i}
            friendSelected={false}
            pending={pending}
          />
        </View>
      </ScrollView>
    );
  }
);

export default FriendsCard;
