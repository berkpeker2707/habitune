import * as React from "react";
import DotGraphBarUnselected from "./DotGraphBarUnselected";
import DotGraphBarSelected from "./DotGraphBarSelected";

const DotGraphBar = (props: {
  name: string;
  color: string;
  allHabitDatesDots: Array<boolean>;
  habitID: any;
  isHidden: boolean;
  selected: boolean;
}) => {
  const { name, color, allHabitDatesDots, habitID, isHidden, selected } = props;

  if (selected) {
    return (
      <DotGraphBarSelected name={name} habitID={habitID} isHidden={isHidden} />
    );
  } else {
    return (
      <DotGraphBarUnselected
        name={name}
        color={color}
        allHabitDatesDots={allHabitDatesDots}
      />
    );
  }
};

export default DotGraphBar;
