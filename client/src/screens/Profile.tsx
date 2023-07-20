import * as React from "react";
import { ScrollView, TextInput, View } from "react-native";
import ProfileCard from "../components/profile/ProfileCard";
import FriendsCard from "../components/profile/FriendsCard";
import FriendList from "../components/add/shareComponents/FriendList";
import ShareWithNumber from "../components/add/shareComponents/ShareWithNumber";

export function Profile(props: any) {
  return (
    <View
      style={{
        // display: "flex",
        // height: "100%",
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
            // justifyContent: "center",
            // alignItems: "center",
            backgroundColor: "red",
          }}
        >
          <View
            style={{
              backgroundColor: "#FFFFFF",
              width: 345,
              height: 189,
              marginBottom: 10,
            }}
          >
            <TextInput
              style={{
                height: 39.5,
                borderBottomWidth: 1,
                paddingLeft: 20,
                marginBottom: 5,
                borderColor: "#968EB0",
                color: "#444",
              }}
              editable={false}
              selectTextOnFocus={false}
            >
              Friends 1
            </TextInput>
            <FriendList navigation={props.navigation} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
