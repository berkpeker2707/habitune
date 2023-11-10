import * as React from "react";
import { memo, useCallback } from "react";
import HabitBar from "./HabitBar";
import { TouchableOpacity, Vibration, View } from "react-native";
import uuid from "react-native-uuid";

const HabitBarParent = memo((props: any) => {
  const {
    dispatch,
    updateHabitCompletedDateAction,
    notificationSendAction,
    currentUser,
    allHabits,
    tempBarFilled,
    setHomeEditBool,
    selectedItem,
    setSelectedItem,
    handleHabitClicked,
    nameChangable,
    setNameChangable,
    setEditHabitSelected,
    habitNameState,
    setHabitNameState,
  } = props;

  const handlePress = useCallback(
    (item: any, index: any) => {
      Vibration.vibrate(10);
      dispatch(
        updateHabitCompletedDateAction({
          _id: item._id,
          date: Date.now(),
        })
      );

      if (!tempBarFilled[index] && item.sharedWith.length > 0) {
        dispatch(
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
        );
      }
      handleHabitClicked(index);
    },
    [
      dispatch,
      updateHabitCompletedDateAction,
      notificationSendAction,
      currentUser,
      tempBarFilled,
      handleHabitClicked,
    ]
  );

  const handleLongPress = useCallback(
    (item: any) => {
      setNameChangable(true);
      setHomeEditBool((prev: any) => !prev);
      setHabitNameState(() => "");
      setEditHabitSelected(item._id);
      setSelectedItem((prev: any) =>
        prev === item._id.toString() ? "" : item._id.toString()
      );
    },
    [setNameChangable, setHomeEditBool, setEditHabitSelected, setSelectedItem]
  );

  return (
    <View>
      {allHabits.map((item: any, index: any) => (
        <TouchableOpacity
          onPress={() => handlePress(item, index)}
          onLongPress={() => handleLongPress(item)}
          key={uuid.v4() as string}
        >
          <HabitBar
            filled={tempBarFilled[index]}
            item={item}
            itemStroke={item._id.toString() === selectedItem ? 2 : 0.5}
            nameChangable={
              item._id.toString() === selectedItem ? nameChangable : false
            }
            habitNameState={habitNameState}
            setHabitNameState={setHabitNameState}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
});

export default HabitBarParent;
