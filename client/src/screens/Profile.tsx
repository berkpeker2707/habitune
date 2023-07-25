import * as React from "react";
import { ScrollView, View } from "react-native";
import ProfileCard from "../components/profile/ProfileCard";
import FriendsCard from "../components/profile/FriendsCard";
import AddFriendsButton from "../components/profile/AddFriendsButton";

const Profile = () => {
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
        <View
          style={{
            width: 345,
            backgroundColor: "#FFFFFF",
          }}
        >
          <AddFriendsButton />
          <FriendsCard />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
