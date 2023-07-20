import * as React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FriendBar from "../add/shareComponents/FriendBar";

const FriendsCard = () => {
  return (
    <ScrollView
      style={{
        // marginBottom: 85,
        // width: "100%",
        height: 700,
      }}
    >
      <View
        style={{
          // display: "flex",
          // height: 49 * (1 + 1),
          width: 324,
          right: 21,
          backgroundColor: "#FFF44F",
          // justifyContent: "center",
          // alignItems: "center",

          flex: 1,
          height: 49 * (5 + 1),
        }}
      >
        <TouchableOpacity onPress={() => console.log("1")}>
          <FriendBar
            friendProfilePicture={"https://i.pravatar.cc/300"}
            friendName={"Tuğçe"}
            friendSelected={false}
            barPositionLevel={49 * 0}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("2")}>
          <FriendBar
            friendProfilePicture={"https://i.pravatar.cc/300"}
            friendName={"Tuğçe"}
            friendSelected={false}
            barPositionLevel={49 * 1}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("3")}>
          <FriendBar
            friendProfilePicture={"https://i.pravatar.cc/300"}
            friendName={"Tuğçe"}
            friendSelected={false}
            barPositionLevel={49 * 2}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("4")}>
          <FriendBar
            friendProfilePicture={"https://i.pravatar.cc/300"}
            friendName={"Tuğçe"}
            friendSelected={false}
            barPositionLevel={49 * 3}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("5")}>
          <FriendBar
            friendProfilePicture={"https://i.pravatar.cc/300"}
            friendName={"Tuğçe"}
            friendSelected={false}
            barPositionLevel={49 * 4}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("6")}>
          <FriendBar
            friendProfilePicture={"https://i.pravatar.cc/300"}
            friendName={"Tuğçe"}
            friendSelected={false}
            barPositionLevel={49 * 5}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("7")}>
          <FriendBar
            friendProfilePicture={"https://i.pravatar.cc/300"}
            friendName={"Tuğçe"}
            friendSelected={false}
            barPositionLevel={49 * 6}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FriendsCard;
