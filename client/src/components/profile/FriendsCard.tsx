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
        <View>
          <FriendBar
            friendProfilePicture={"https://i.pravatar.cc/300"}
            friendName={"İrem"}
            barPositionLevel={49 * 0}
            friendSelected={false}
          />
        </View>
        {/* <FriendBar
          friendProfilePicture={"https://i.pravatar.cc/300"}
          friendName={"Tuğçe"}
          friendSelected={false}
          barPositionLevel={49 * 1}
        />
        <FriendBar
          friendProfilePicture={"https://i.pravatar.cc/300"}
          friendName={"Sümeyye"}
          friendSelected={true}
          barPositionLevel={49 * 2}
        />
        <FriendBar
          friendProfilePicture={"https://i.pravatar.cc/300"}
          friendName={"Doğa"}
          friendSelected={false}
          barPositionLevel={49 * 3}
        />
        <FriendBar
          friendProfilePicture={"https://i.pravatar.cc/300"}
          friendName={"Merve"}
          friendSelected={false}
          barPositionLevel={49 * 4}
        />
        <FriendBar
          friendProfilePicture={"https://i.pravatar.cc/300"}
          friendName={"Özden"}
          friendSelected={false}
          barPositionLevel={49 * 5}
        /> */}
      </View>
    </ScrollView>
  );
};

export default FriendsCard;
