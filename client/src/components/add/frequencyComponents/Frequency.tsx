import * as React from "react";
import { TouchableOpacity, Vibration } from "react-native";
import FrequencyWithPurpleIcon from "./FrequencyWithPurpleIcon";
import FrequencyOpened from "./FrequencyOpened";

const Frequency = (props: {
  openFrequency: boolean;
  setOpenFrequency: Function;
  taskUpcomingDates: string[];
  setTaskUpcomingDates: Function;
  taskFirstDate: Date;
  setTaskFirstDate: Function;
  taskLastDate: Date;
  setTaskLastDate: Function;
  dateBetweenModalOpen: boolean;
  setDateBetweenModalOpen: Function;
}) => {
  const {
    openFrequency,
    setOpenFrequency,
    taskUpcomingDates,
    setTaskUpcomingDates,
    taskFirstDate,
    setTaskFirstDate,
    taskLastDate,
    setTaskLastDate,
    dateBetweenModalOpen,
    setDateBetweenModalOpen,
  } = props;
  return (
    <>
      {!openFrequency ? (
        <TouchableOpacity
          style={{ width: 345 }}
          onPressIn={() => Vibration.vibrate(10)}
          onPress={() =>
            setOpenFrequency((openFrequency: boolean) => !openFrequency)
          }
          onBlur={() =>
            setOpenFrequency((openFrequency: boolean) => !openFrequency)
          }
          onLongPress={() =>
            setOpenFrequency((openFrequency: boolean) => !openFrequency)
          }
        >
          <FrequencyWithPurpleIcon textInputTitle={"Frequency"} />
        </TouchableOpacity>
      ) : (
        <FrequencyOpened
          taskUpcomingDates={taskUpcomingDates}
          setTaskUpcomingDates={setTaskUpcomingDates}
          taskFirstDate={taskFirstDate}
          setTaskFirstDate={setTaskFirstDate}
          taskLastDate={taskLastDate}
          setTaskLastDate={setTaskLastDate}
          dateBetweenModalOpen={dateBetweenModalOpen}
          setDateBetweenModalOpen={setDateBetweenModalOpen}
        />
      )}
    </>
  );
};

export default Frequency;
