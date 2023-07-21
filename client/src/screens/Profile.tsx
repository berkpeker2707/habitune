import * as React from "react";
import { ScrollView, TextInput, View } from "react-native";
import ProfileCard from "../components/profile/ProfileCard";
import FriendsCard from "../components/profile/FriendsCard";
import FriendList from "../components/add/shareComponents/FriendList";
import ShareWithNumber from "../components/add/shareComponents/ShareWithNumber";
import AddFriendsButton from "../components/profile/AddFriendsButton";

export function Profile(props: any) {
  return (
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
      >
        <ProfileCard />
        {/* <FriendsCard /> */}
        <View
          style={{
            width: 345,
            backgroundColor: "yellow",
          }}
        >
          <AddFriendsButton />
          <FriendList navigation={props.navigation} />
        </View>
      </ScrollView>
    </View>
  );
}
