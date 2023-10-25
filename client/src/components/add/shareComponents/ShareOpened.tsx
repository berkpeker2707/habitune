import * as React from "react";
import { View } from "react-native";
import ShareWithNumber from "./ShareWithNumber";
import FriendList from "./FriendList";

const ShareOpened = (props: {
  currentUser: { friends: Array<object>; pending: boolean };
  shareWithFriendList: string[];
  setShareWithFriendList: Function;
}) => {
  const { currentUser, shareWithFriendList, setShareWithFriendList } = props;

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
          shareWithNum={currentUser.friends ? currentUser.friends.length : 0}
        />
        <FriendList
          currentUser={currentUser}
          shareWithFriendList={shareWithFriendList}
          setShareWithFriendList={setShareWithFriendList}
        />
      </View>
    </>
  );
};

export default ShareOpened;
