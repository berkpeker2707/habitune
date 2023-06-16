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
    <View>
      {/* <Svg width={345} height={48} viewBox="0 0 345 48" fill="none" {...props}>
        <Rect
          x={0.25}
          y={0.25}
          width={344.5}
          height={39.5}
          rx={19.75}
          stroke="#968EB0"
          strokeWidth={0.5}
        />
        <Text x={20} y={25} fontSize="14" fontWeight={400} fill="#444">
          Task Name
        </Text> */}
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
      {/* </Svg> */}
    </View>
  );
};

export default TaskName;
