import * as React from "react";
import { TouchableOpacity } from "react-native";
import ShareWithPurpleIcon from "./ShareWithPurpleIcon";
import ShareOpened from "./ShareOpened";

const Share = (props: {
  currentUser: { friends: Array<object>; pending: boolean };
  shareWithFriendList: string[];
  setShareWithFriendList: Function;
  openShare: boolean;
  setOpenShare: Function;
}) => {
  const {
    currentUser,
    shareWithFriendList,
    setShareWithFriendList,
    openShare,
    setOpenShare,
  } = props;

  return (
    <>
      {!openShare ? (
        <TouchableOpacity
          style={{ width: 345 }}
          onPress={() => setOpenShare((openShare: boolean) => !openShare)}
          onBlur={() => setOpenShare((openShare: boolean) => !openShare)}
          onLongPress={() => setOpenShare((openShare: boolean) => !openShare)}
        >
          <ShareWithPurpleIcon textInputTitle={"Share With Your Friends"} />
        </TouchableOpacity>
      ) : (
        <ShareOpened
          currentUser={currentUser}
          shareWithFriendList={shareWithFriendList}
          setShareWithFriendList={setShareWithFriendList}
        />
      )}
    </>
  );
};

export default Share;
