import * as React from "react";
import { View, TextInput } from "react-native";
import { memo } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAppDispatch, useSelector } from "../../state/store";
import { taskName, setTaskName } from "../../state/habitSlice";

const TaskName = memo(() => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const taskNameState = useSelector(taskName);

  return (
    <View style={{ width: 345 }}>
      <TextInput
        style={{
          height: 39.5,
          borderWidth: 0.5,
          borderRadius: 20,
          paddingLeft: 20,
          marginBottom: 10,
          borderColor:
            taskNameState.length > 0 ? theme.borderColor : theme.warningColor,
          color: theme.primaryText,
        }}
        placeholder="Task Name"
        onChangeText={(text) => dispatch(setTaskName(text))}
        maxLength={30}
        placeholderTextColor={theme.fadedPrimaryText}
      />
    </View>
  );
});

export default TaskName;
