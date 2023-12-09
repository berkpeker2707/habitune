import * as React from "react";
import { memo, useCallback } from "react";
import { TouchableOpacity, Vibration, View } from "react-native";
import HabitBar from "./HabitBar";
import uuid from "react-native-uuid";
import { useAppDispatch, useSelector } from "../../state/store";
import { selectFetchCurrentUserProfile } from "../../state/userSlice";
import {
  updateHabitCompletedDateAction,
  selectHabitsToday,
} from "../../state/habitSlice";
import { notificationSendAction } from "../../state/notificationSlice";
import handleTempBarFilled from "../../helpers/handleTempBarFilled";

const HabitBarParent = memo((props: { tempBarFilled: [boolean] }) => {
  const { tempBarFilled } = props;
  const dispatch = useAppDispatch();
  const currentUserState = useSelector(selectFetchCurrentUserProfile);
  const allHabitsToday = useSelector(selectHabitsToday);

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
            firstName: currentUserState.firstName,
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
      handleTempBarFilled(index, dispatch, tempBarFilled);
    },
    [
      dispatch,
      updateHabitCompletedDateAction,
      notificationSendAction,
      currentUserState,
      tempBarFilled,
      handleTempBarFilled,
    ]
  );

  return (
    <View>
      {allHabitsToday.map((item: any, index: any) => (
        <TouchableOpacity
          onPress={() => handleHabitBarPress(item, index)}
          key={uuid.v4() as string}
        >
          <HabitBar
            filled={tempBarFilled[index]}
            item={item}
            itemStroke={0.5}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
});

export default HabitBarParent;
