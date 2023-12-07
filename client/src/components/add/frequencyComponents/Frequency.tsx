import * as React from "react";
import { TouchableOpacity, Vibration } from "react-native";
import FrequencyWithPurpleIcon from "./FrequencyWithPurpleIcon";
import FrequencyOpened from "./FrequencyOpened";
import { useAppDispatch, useSelector } from "../../../state/store";
import { openFrequency, setOpenFrequency } from "../../../state/habitSlice";

const Frequency = () => {
  const dispatch = useAppDispatch();
  const openFrequencyState = useSelector(openFrequency);

  return (
    <>
      {!openFrequencyState ? (
        <TouchableOpacity
          style={{ width: 345 }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            dispatch(
              setOpenFrequency(
                (openFrequencyState: boolean) => !openFrequencyState
              )
            )
          }
          onBlur={() =>
            dispatch(
              setOpenFrequency(
                (openFrequencyState: boolean) => !openFrequencyState
              )
            )
          }
          onLongPress={() =>
            dispatch(
              setOpenFrequency(
                (openFrequencyState: boolean) => !openFrequencyState
              )
            )
          }
        >
          <FrequencyWithPurpleIcon textInputTitle={"Frequency"} />
        </TouchableOpacity>
      ) : (
        <FrequencyOpened />
      )}
    </>
  );
};

export default Frequency;
