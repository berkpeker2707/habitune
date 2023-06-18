import * as React from "react";
import { View } from "react-native";
import ShareWithNumber from "./ShareWithNumber";
import FriendList from "./FriendList";

const ShareOpened = () => {
  return (
    <>
      <View
        style={{
          backgroundColor: "#FFFFFF",
          width: 345,
          height: 189,
          borderRadius: 20,
          borderColor: "#968EB0",
          borderWidth: 0.5,
          marginBottom: 10,
        }}
      >
        <ShareWithNumber shareWithNum={1} />
        <FriendList />
      </View>
    </>
  );
};

export default ShareOpened;
