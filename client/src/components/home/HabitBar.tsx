import * as React from "react";
import { memo } from "react";
import Svg, {
  Path,
  G,
  Mask,
  Rect,
  Defs,
  Pattern,
  Use,
  Image,
  Text,
  Circle,
  LinearGradient,
  Stop,
} from "react-native-svg";
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
