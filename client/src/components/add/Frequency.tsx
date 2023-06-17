import * as React from "react";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import FrequencyWithPurpleIcon from "./frequencyComponents/FrequencyWithPurpleIcon";
import FrequencyOpened from "./frequencyComponents/FrequencyOpened";

function Frequency(props: any) {
  const [openFrequency, setOpenFrequency] = useState(true);
  return (
    <>
      {openFrequency ? (
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
        <FrequencyOpened />
      )}
    </>
  );
}

export default Frequency;
