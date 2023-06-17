import * as React from "react";
import { View } from "react-native";
import DayCircle from "./DayCircle";
import DayBetween from "./DayBetween";
import Daily from "./Daily";

const FrequencyOpened = () => {
  return (
    <View>
      <View
        style={{
          backgroundColor: "#FFFFFF",
          width: 345,
          height: 189,
          borderRadius: 20,
          borderColor: "#968EB0",
          borderWidth: 0.5,
        }}
      >
        <Daily />
        <DayCircle day={"M"} left={20} backgroundColor="#968EB0" />
        <DayCircle day={"Tu"} left={65} backgroundColor="#FFFFFF" />
        <DayCircle day={"W"} left={110} backgroundColor="#FFFFFF" />
        <DayCircle day={"Th"} left={155} backgroundColor="#968EB0" />
        <DayCircle day={"F"} left={200} backgroundColor="#FFFFFF" />
        <DayCircle day={"Sa"} left={245} backgroundColor="#968EB0" />
        <DayCircle day={"Su"} left={290} backgroundColor="#968EB0" />
        <DayBetween day={"Between Aug 17 - Aug 27"} />
      </View>
    </View>
  );
};

export default FrequencyOpened;
