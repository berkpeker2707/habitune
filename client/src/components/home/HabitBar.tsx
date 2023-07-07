import * as React from "react";
import HabitDone from "./HabitDone";
import HabitUndone from "./HabitUndone";

const HabitBar = (props: any) => {
  const { item, itemStroke, filled } = props;
  return !filled ? (
    <HabitUndone item={item} itemStroke={itemStroke} />
  ) : (
    <HabitDone item={item} itemStroke={itemStroke} />
  );
};

export default HabitBar;
