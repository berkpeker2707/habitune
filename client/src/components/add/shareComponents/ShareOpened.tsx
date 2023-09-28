import * as React from "react";
import { View } from "react-native";
import ShareWithNumber from "./ShareWithNumber";
import FriendList from "./FriendList";

const ShareOpened = (props: any) => {
  const { currentUser } = props;

  return (
    <>
      <View
        style={{
          backgroundColor: "#FFFFFF",
          width: 345,
          height: 190,
          borderRadius: 20,
          borderColor: "#968EB0",
          borderWidth: 0.5,
          marginBottom: 10,
        }}
      >
        <ShareWithNumber
          shareWithNum={currentUser.friends ? currentUser.friends.length : ""}
        />
        <FriendList navigation={props.navigation} currentUser={currentUser} />
      </View>
    </>
  );
};

export default ShareOpened;
