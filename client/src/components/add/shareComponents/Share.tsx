import * as React from "react";
import { TouchableOpacity, Vibration } from "react-native";
import ShareWithPurpleIcon from "./ShareWithPurpleIcon";
import ShareOpened from "./ShareOpened";

const Share = (props: {
  currentUser: { friends: Array<object>; pending: boolean };
  shareWithFriendList: string[];
  setShareWithFriendList: Function;
  openShareHabit: boolean;
  setOpenShareHabit: Function;
}) => {
  const {
    currentUser,
    shareWithFriendList,
    setShareWithFriendList,
    openShareHabit,
    setOpenShareHabit,
  } = props;

  return (
    <>
      {!openShareHabit ? (
        <TouchableOpacity
          style={{ width: 345 }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            setOpenShareHabit((openShareHabit: boolean) => !openShareHabit)
          }
          onBlur={() =>
            setOpenShareHabit((openShareHabit: boolean) => !openShareHabit)
          }
          onLongPress={() =>
            setOpenShareHabit((openShareHabit: boolean) => !openShareHabit)
          }
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
