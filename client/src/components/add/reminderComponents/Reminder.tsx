import * as React from "react";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import ReminderWithPurpleIcon from "./ReminderWithPurpleIcon";

function Reminder(props: any) {
  const [openReminder, setReminderFrequency] = useState(true);
  return (
    <>
      {openReminder ? (
        <TouchableOpacity
          style={{ width: 345 }}
          onPress={() => setReminderFrequency((openReminder) => !openReminder)}
          onBlur={() => setReminderFrequency((openReminder) => !openReminder)}
          onLongPress={() =>
            setReminderFrequency((openReminder) => !openReminder)
          }
        >
          <ReminderWithPurpleIcon textInputTitle={"Reminder"} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{ width: 345 }}
          onPress={() => setReminderFrequency((openReminder) => !openReminder)}
          onBlur={() => setReminderFrequency((openReminder) => !openReminder)}
          onLongPress={() =>
            setReminderFrequency((openReminder) => !openReminder)
          }
        >
          <ReminderWithPurpleIcon textInputTitle={"Reminder"} />
        </TouchableOpacity>
      )}
    </>
  );
}

export default Reminder;
