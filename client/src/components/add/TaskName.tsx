import * as React from "react";
import { View, TextInput } from "react-native";
import { useState, useEffect, memo } from "react";

const TaskName = memo((props: any) => {
  const [taskName, setTaskName] = useState<string>("");

  //updating params if taskName changes starts
  useEffect(() => {
    props.navigation.setParams({
      name: taskName,
    });
  }, [taskName]);
  //updating params if taskName changes ends

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
});

export default TaskName;
