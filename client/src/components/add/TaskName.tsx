import * as React from "react";
// import Svg, { Rect, Text } from "react-native-svg";
import { View, TextInput } from "react-native";
import { useState, useEffect } from "react";

const TaskName = (props: any) => {
  const [taskName, setTaskName] = useState<string>("");

  useEffect(() => {
    props.sendNewHabitNameState(taskName);
  }, [taskName]);
  return (
    <View style={{ width: 345 }}>
      <TextInput
        style={{
          height: 39.5,
          borderWidth: 0.5,
          borderRadius: 20,
          paddingLeft: 20,
          marginBottom: 10,
        }}
        placeholder="Task Name"
        onChangeText={(text) => setTaskName(text)}
        maxLength={30}
      />
    </View>
  );
};

export default TaskName;
