import * as React from "react";
import HabitBar from "./HabitBar";
import { TouchableOpacity, View, Text } from "react-native";
import uuid from "react-native-uuid";
import { memo } from "react";

const HabitBarParent = memo((props: any) => {
  const {
    habitLoading,
    allHabitsNumber,
    dispatch,
    item,
    allHabits,
    index,
    tempBarFilled,
    currentUser,
    homeEditState,
    navigation,
    selectedItem,
    setSelectedItem,
    updateHabitCompletedDateAction,
    notificationSendAction,
    handleHabitClicked,
    nameChangable,
    setNameChangable,
  } = props;

  return allHabits.map((item: any, index: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(
            updateHabitCompletedDateAction({
              _id: item._id,
              date: Date.now(),
            })
          );
          //only if habit is checked send notification && item is shared with someone
          !tempBarFilled[index] && item.sharedWith.length > 0
            ? dispatch(
                notificationSendAction({
                  imageUrl: "image",
                  friend: item.sharedWith.map(
                    (sharedWithIds: any) => sharedWithIds._id
                  ),
                  firstName: currentUser.firstName,
                  friendImage: item.sharedWith.map(
                    (sharedWithFriendImage: any) => sharedWithFriendImage.image
                  ),
                  habitName: item.name,
                  tokens: item.sharedWith.map(
                    (sharedWithTokens: any) => sharedWithTokens.fcmToken
                  ),
                })
              )
            : "";
          handleHabitClicked(index);
        }}
        onLongPress={() => {
          setNameChangable(() => true);
          homeEditState
            ? navigation.setParams({
                homeEditState: false,
              })
            : navigation.setParams({
                homeEditState: true,
                _id: item._id,
              });
          setSelectedItem(() =>
            selectedItem === item._id.toString() ? "" : item._id.toString()
          );
        }}
        key={uuid.v4() as string}
      >
        <HabitBar
          item={item}
          itemStroke={item._id.toString() === selectedItem ? 2 : 0.5}
          filled={tempBarFilled[index]}
          nameChangable={
            item._id.toString() === selectedItem ? nameChangable : false
          }
          navigation={navigation}
        />
      </TouchableOpacity>
    );
  });
});

export default HabitBarParent;
