import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import FriendBar from "./FriendBar";
import { useEffect, useState } from "react";

import uuid from "react-native-uuid";

const FriendList = (props: any) => {
  const { currentUser } = props;

  const [shareWithFriendList, setShareWithFriendList] = useState<String[]>([]);

  //updating params if shareWithFriendList changes starts
  useEffect(() => {
    props.navigation.setParams({
      friendList: shareWithFriendList,
    });
  }, [shareWithFriendList]);
  //updating params if shareWithFriendList changes ends

  return (
    <ScrollView>
      {currentUser.friends
        .filter(
          (friendsItemPending: { pending: boolean }) =>
            friendsItemPending.pending == false
        )
        .map((friendsItem: any, friendsIndex: number) => {
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
                  shareWithFriendList.includes(friendsItem.friend._id)
                    ? setShareWithFriendList(() =>
                        shareWithFriendList.filter(
                          (item) => item !== friendsItem.friend._id
                        )
                      )
                    : setShareWithFriendList(() =>
                        //prevState
                        [
                          //...prevState,
                          friendsItem.friend._id,
                        ]
                      )
                }
              >
                <FriendBar
                  friendProfilePicture={friendsItem.friend.image}
                  friendName={friendsItem.friend.firstName}
                  friendSelected={
                    shareWithFriendList.includes(friendsItem.friend._id)
                      ? true
                      : false
                  }
                  pending={friendsItem.pending}
                />
              </TouchableOpacity>
            </View>
          );
        })}
    </ScrollView>
  );
};

export default FriendList;
