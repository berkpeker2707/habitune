import { setTempBarFilled } from "../state/habitSlice";

const handleTempBarFilled = (
  index: number,
  dispatch: Function,
  tempBarFilled: [boolean]
) => {
  // return (index: number) => {
  const newHabitArray = tempBarFilled?.map((nH: any, i: number) => {
    if (i === index) {
      return !nH;
    } else {
      return nH;
    }
  });
  dispatch(setTempBarFilled(newHabitArray));
};

export default handleTempBarFilled;
