import * as React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import FriendBar from "./FriendBar";

const FriendList = () => {
  return (
    <ScrollView>
      <View style={{ flex: 1, height: 49 * (5 + 1) }}>
        <FriendBar
          friendProfilePicture={"https://i.pravatar.cc/300"}
          friendName={"İrem"}
          friendSelected={false}
          barPositionLevel={49 * 0}
        />
        <FriendBar
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
        />
      </View>
    </ScrollView>
  );
};

export default FriendList;
