import * as React from "react";
import { TouchableOpacity, Vibration } from "react-native";
import { useCallback, useState } from "react";
import ReminderWithPurpleIcon from "./ReminderWithPurpleIcon";
import { TimePickerModal } from "react-native-paper-dates";

const Reminder = () => {
  // const [openReminder, setReminderFrequency] = useState(true);
  const [visible, setVisible] = useState(false);
  const onDismiss = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = useCallback(
    ({ hours, minutes }: { hours: any; minutes: any }) => {
      setVisible(false);
    },
    [setVisible]
  );
  return (
    <>
      <TouchableOpacity
        style={{ width: 345 }}
        onPressIn={() => Vibration.vibrate(10)}
        onPress={() => setVisible(true)}
      >
        <ReminderWithPurpleIcon textInputTitle={"Reminder"} />
        <TimePickerModal
          visible={visible}
          onDismiss={onDismiss}
          onConfirm={onConfirm}
          hours={12}
          minutes={14}
        />
      </TouchableOpacity>
    </>
  );
};

export default Reminder;
