import * as React from "react";
import { memo } from "react";
import HabitBar from "./HabitBar";
import { TouchableOpacity } from "react-native";
import uuid from "react-native-uuid";

const HabitBarParent = memo(
  (props: {
    navigation: any;
    dispatch: Function;
    updateHabitCompletedDateAction: Function;
    notificationSendAction: Function;
    currentUser: { firstName: string };
    allHabits: any;
    tempBarFilled: any;
    homeEditBool: boolean;
    setHomeEditBool: Function;
    selectedItem: string;
    setSelectedItem: Function;
    handleHabitClicked: Function;
    nameChangable: boolean;
    setNameChangable: Function;
    text: string;
    onChangeText: Function;
  }) => {
    const {
      navigation,
      dispatch,
      updateHabitCompletedDateAction,
      notificationSendAction,
      currentUser,
      allHabits,
      tempBarFilled,
      homeEditBool,
      setHomeEditBool,
      selectedItem,
      setSelectedItem,
      handleHabitClicked,
      nameChangable,
      setNameChangable,
      text,
      onChangeText,
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
                      (sharedWithFriendImage: any) =>
                        sharedWithFriendImage.image
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
            homeEditBool ? setHomeEditBool(false) : setHomeEditBool(true);
            navigation.setParams({
              _id: item._id,
            });
            setSelectedItem(() =>
              selectedItem === item._id.toString() ? "" : item._id.toString()
            );
          }}
          key={uuid.v4() as string}
        >
          <HabitBar
            filled={tempBarFilled[index]}
            item={item}
            itemStroke={item._id.toString() === selectedItem ? 2 : 0.5}
            nameChangable={
              item._id.toString() === selectedItem ? nameChangable : false
            }
            text={text}
            onChangeText={onChangeText}
          />
        </TouchableOpacity>
      );
    });
  }
);

export default HabitBarParent;
