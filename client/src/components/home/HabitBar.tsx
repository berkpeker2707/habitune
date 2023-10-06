import * as React from "react";
import HabitDone from "./HabitDone";
import HabitUndone from "./HabitUndone";
import { memo } from "react";

const HabitBar = memo((props: any) => {
  const { item, itemStroke, filled, nameChangable, navigation } = props;

  return !filled ? (
    <HabitUndone
      item={item}
      itemStroke={itemStroke}
      nameChangable={nameChangable}
      navigation={navigation}
    />
  ) : (
    <HabitDone
      item={item}
      itemStroke={itemStroke}
      nameChangable={nameChangable}
      navigation={navigation}
    />
  );
});

export default HabitBar;
