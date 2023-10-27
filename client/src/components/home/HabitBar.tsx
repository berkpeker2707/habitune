import * as React from "react";
import { memo } from "react";
import HabitDone from "./HabitDone";
import HabitUndone from "./HabitUndone";

const HabitBar = memo((props: any) => {
  const { filled, item, itemStroke, nameChangable, text, onChangeText } = props;

  return !filled ? (
    <HabitUndone
      item={item}
      itemStroke={itemStroke}
      nameChangable={nameChangable}
      text={text}
      onChangeText={onChangeText}
    />
  ) : (
    <HabitDone
      item={item}
      itemStroke={itemStroke}
      nameChangable={nameChangable}
      text={text}
      onChangeText={onChangeText}
    />
  );
});

export default HabitBar;
