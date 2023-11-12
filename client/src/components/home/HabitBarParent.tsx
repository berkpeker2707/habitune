import * as React from "react";
import { memo, useCallback } from "react";
import HabitBar from "./HabitBar";
import { TouchableOpacity, Vibration, View } from "react-native";
import uuid from "react-native-uuid";

const HabitBarParent = memo(
  (props: {
    dispatch: Function;
    updateHabitCompletedDateAction: Function;
    notificationSendAction: Function;
    currentUser: { firstName: string };
    allHabits: [];
    tempBarFilled: [boolean];
    setHomeEditBool: Function;
    selectedItem: string;
    setSelectedItem: Function;
    handleHabitClicked: Function;
    setEditHabitSelected: Function;
    setHabitNameState: Function;
  }) => {
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
      setEditHabitSelected,
      setHabitNameState,
    } = props;

    const handleHabitBarPress = useCallback(
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

    const handleHabitBarLongPress = useCallback(
      (item: any) => {
        setHomeEditBool((prev: any) => !prev);
        setHabitNameState(() => "");
        setEditHabitSelected(item._id);
        setSelectedItem((prev: any) =>
          prev === item._id.toString() ? "" : item._id.toString()
        );
      },
      [setHomeEditBool, setEditHabitSelected, setSelectedItem]
    );

    return (
      <View>
        {allHabits.map((item: any, index: any) => (
          <TouchableOpacity
            onPress={() => handleHabitBarPress(item, index)}
            onLongPress={() => handleHabitBarLongPress(item)}
            key={uuid.v4() as string}
          >
            <HabitBar
              filled={tempBarFilled[index]}
              item={item}
              itemStroke={item._id.toString() === selectedItem ? 2 : 0.5}
              nameChangable={
                item._id.toString() === selectedItem ? true : false
              }
              setHabitNameState={setHabitNameState}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  }
);

export default HabitBarParent;
