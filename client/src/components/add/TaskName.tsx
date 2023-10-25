import * as React from "react";
import { View, TextInput } from "react-native";
import { memo } from "react";

const TaskName = memo((props: { taskName: string; setTaskName: Function }) => {
  const { taskName, setTaskName } = props;

  return (
    <View style={{ width: 345 }}>
      <TextInput
        style={{
          height: 39.5,
          borderWidth: 0.5,
          borderRadius: 20,
          paddingLeft: 20,
          marginBottom: 10,
          borderColor: taskName.length > 0 ? "#968EB0" : "red",
        }}
        placeholder="Task Name"
        onChangeText={(text) => setTaskName(text)}
        maxLength={30}
      />
    </View>
  );
});

export default TaskName;
