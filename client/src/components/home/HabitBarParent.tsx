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
  selectHabitUpdated,
} from "../../state/habitSlice";
import { notificationSendAction } from "../../state/notificationSlice";

const HabitBarParent = memo((props: { habitsTodayBoolean: [boolean] }) => {
  const { habitsTodayBoolean } = props;
  const dispatch = useAppDispatch();
  const habitUpdated = useSelector(selectHabitUpdated);
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

      if (!habitsTodayBoolean[index] && item.sharedWith.length > 0) {
        dispatch(
          notificationSendAction({
            habitID: item._id,
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
    },
    [
      dispatch,
      updateHabitCompletedDateAction,
      notificationSendAction,
      currentUserState,
      habitUpdated,
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
            filled={habitsTodayBoolean[index]}
            item={item}
            itemStroke={0.5}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
});

export default HabitBarParent;
