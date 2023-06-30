import * as React from "react";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import FrequencyWithPurpleIcon from "./FrequencyWithPurpleIcon";
import FrequencyOpened from "./FrequencyOpened";

const Frequency = (props: any) => {
  const [openFrequency, setOpenFrequency] = useState<boolean>(false);

  return (
    <>
      {!openFrequency ? (
        <TouchableOpacity
          style={{ width: 345 }}
          onPress={() => setOpenFrequency((openFrequency) => !openFrequency)}
          onBlur={() => setOpenFrequency((openFrequency) => !openFrequency)}
          onLongPress={() =>
            setOpenFrequency((openFrequency) => !openFrequency)
          }
        >
          <FrequencyWithPurpleIcon textInputTitle={"Frequency"} />
        </TouchableOpacity>
      ) : (
        <FrequencyOpened navigation={props.navigation} />
      )}
    </>
  );
};

export default Frequency;
