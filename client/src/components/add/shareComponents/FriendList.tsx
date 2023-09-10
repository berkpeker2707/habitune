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
      <View
        style={{
          flex: 1,
          height: 49 * (5 + 1),
        }}
      >
        {currentUser.friends.map((friendsItem: any, friendsIndex: number) => {
          return (
            <TouchableOpacity
              key={uuid.v4() as string}
              onPress={() =>
                shareWithFriendList.includes(friendsItem.friend._id)
                  ? setShareWithFriendList(() =>
                      shareWithFriendList.filter(
                        (item) => item !== friendsItem.friend._id
                      )
                    )
                  : setShareWithFriendList((prevState) => [
                      ...prevState,
                      friendsItem.friend._id,
                    ])
              }
            >
              <FriendBar
                friendProfilePicture={friendsItem.friend.image}
                friendName={friendsItem.friend.firstName}
                barPositionLevel={49 * friendsIndex}
                friendSelected={
                  shareWithFriendList.includes(friendsItem.friend._id)
                    ? true
                    : false
                }
              />
            </TouchableOpacity>
          );
        })}
        {/* <FriendBar
          friendProfilePicture={"https://i.pravatar.cc/300"}
          friendName={"Tuğçe"}
          friendSelected={false}
          barPositionLevel={49 * 1}
        />
        <FriendBar
          friendProfilePicture={"https://i.pravatar.cc/300"}
          friendName={"Sümeyye"}
          friendSelected={true}
          barPositionLevel={49 * 2}
        />
        <FriendBar
          friendProfilePicture={"https://i.pravatar.cc/300"}
          friendName={"Doğa"}
          friendSelected={false}
          barPositionLevel={49 * 3}
        />
        <FriendBar
          friendProfilePicture={"https://i.pravatar.cc/300"}
          friendName={"Merve"}
          friendSelected={false}
          barPositionLevel={49 * 4}
        />
        <FriendBar
          friendProfilePicture={"https://i.pravatar.cc/300"}
          friendName={"Özden"}
          friendSelected={false}
          barPositionLevel={49 * 5}
        /> */}
      </View>
    </ScrollView>
  );
};

export default FriendList;
