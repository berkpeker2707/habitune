import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import FriendBar from "./FriendBar";

import uuid from "react-native-uuid";

const FriendList = (props: {
  currentUser: { friends: Array<object>; pending: boolean };
  shareWithFriendList: string[];
  setShareWithFriendList: Function;
}) => {
  const { currentUser, shareWithFriendList, setShareWithFriendList } = props;

  return (
    <ScrollView>
      {/* filter and map only pending is false, friendship accepted users */}
      {currentUser.friends && currentUser.friends.length > 0 ? (
        currentUser.friends
          .filter(
            (friendsItemPending: any) => friendsItemPending.pending == false
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
                  onPress={() =>
                    shareWithFriendList?.includes(friendsItem.friend._id)
                      ? setShareWithFriendList(() =>
                          shareWithFriendList.filter(
                            (item) => item !== friendsItem.friend._id
                          )
                        )
                      : setShareWithFriendList(() => [friendsItem.friend._id])
                  }
                >
                  <FriendBar
                    friendProfilePicture={friendsItem.friend.image}
                    friendName={friendsItem.friend.firstName}
                    friendSelected={
                      shareWithFriendList?.includes(friendsItem.friend._id)
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
