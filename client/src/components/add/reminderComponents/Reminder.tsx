import * as React from "react";
import { TouchableOpacity } from "react-native";
import { useCallback, useState } from "react";
import ReminderWithPurpleIcon from "./ReminderWithPurpleIcon";
import { TimePickerModal } from "react-native-paper-dates";

function Reminder(props: any) {
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
      <TouchableOpacity style={{ width: 345 }} onPress={() => setVisible(true)}>
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
}

export default Reminder;
