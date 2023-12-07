import * as React from "react";
import { View } from "react-native";
import ShareWithNumber from "./ShareWithNumber";
import FriendList from "./FriendList";
import { useTheme } from "../../../context/ThemeContext";
import { useSelector } from "../../../state/store";
import { selectFetchCurrentUserProfile } from "../../../state/userSlice";

const ShareOpened = () => {
  const { theme } = useTheme();
  const currentUserState = useSelector(selectFetchCurrentUserProfile);

  return (
    <>
      <View
        style={{
          backgroundColor: theme.backgroundColor,
          width: 345,
          height: 190,
          borderRadius: 20,
          borderColor: theme.borderColor,
          borderWidth: 0.5,
          marginBottom: 10,
        }}
      >
        <ShareWithNumber
          shareWithNum={
            currentUserState.friends ? currentUserState.friends.length : 0
          }
        />
        <FriendList currentUser={currentUserState} />
      </View>
    </>
  );
};

export default ShareOpened;
