import * as React from "react";
import { TouchableOpacity, Vibration, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import FriendBar from "./FriendBar";
import uuid from "react-native-uuid";
import { useAppDispatch, useSelector } from "../../../state/store";
import {
  shareWithFriendList,
  setShareWithFriendList,
} from "../../../state/habitSlice";

const FriendList = (props: {
  currentUser: { friends: Array<object>; pending: boolean };
}) => {
  const dispatch = useAppDispatch();
  const shareWithFriendListState = useSelector(shareWithFriendList);

  const { currentUser } = props;

  return (
    <ScrollView>
      {/* filter and map only pending is false, friendship accepted users */}
      {currentUser.friends && currentUser.friends.length > 0 ? (
        currentUser.friends
          .filter(
            (friendsItemPending: any) =>
              friendsItemPending.pending == false &&
              friendsItemPending.paired == true
          )
          .map((friendsItem: any) => {
            return (
              <View
                key={uuid.v4() as string}
                style={{
                  flex: 1,
                  height: 49,
                }}
              >
                <TouchableOpacity
                  onPressIn={() => Vibration.vibrate(10)}
                  onPress={() =>
                    shareWithFriendListState?.includes(friendsItem.friend._id)
                      ? dispatch(
                          setShareWithFriendList(
                            shareWithFriendListState.filter(
                              (item: any) => item !== friendsItem.friend._id
                            )
                          )
                        )
                      : dispatch(
                          setShareWithFriendList([friendsItem.friend._id])
                        )
                  }
                >
                  <FriendBar
                    friendProfilePicture={friendsItem.friend.image}
                    friendName={friendsItem.friend.firstName}
                    friendSelected={
                      shareWithFriendListState?.includes(friendsItem.friend._id)
                        ? true
                        : false
                    }
                    pending={friendsItem.pending}
                  />
                </TouchableOpacity>
              </View>
            );
          })
      ) : (
        <></>
      )}
    </ScrollView>
  );
};

export default FriendList;
