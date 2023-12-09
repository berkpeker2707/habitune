import * as React from "react";
import { TouchableOpacity, Vibration } from "react-native";
import ShareWithPurpleIcon from "./ShareWithPurpleIcon";
import ShareOpened from "./ShareOpened";
import { useAppDispatch, useSelector } from "../../../state/store";
import { openShareHabit, setOpenShareHabit } from "../../../state/habitSlice";

const Share = () => {
  const dispatch = useAppDispatch();
  const openShareHabitState = useSelector(openShareHabit);

  return (
    <>
      {!openShareHabitState ? (
        <TouchableOpacity
          style={{ width: 345 }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            dispatch(
              setOpenShareHabit(
                (openShareHabitState: boolean) => !openShareHabitState
              )
            )
          }
          onBlur={() =>
            dispatch(
              setOpenShareHabit(
                (openShareHabitState: boolean) => !openShareHabitState
              )
            )
          }
          onLongPress={() =>
            dispatch(
              setOpenShareHabit(
                (openShareHabitState: boolean) => !openShareHabitState
              )
            )
          }
        >
          <ShareWithPurpleIcon />
        </TouchableOpacity>
      ) : (
        <ShareOpened />
      )}
    </>
  );
};

export default Share;
