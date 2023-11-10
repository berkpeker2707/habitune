import * as React from "react";
import { memo } from "react";
import { TextInput, View, Image, Text as RText } from "react-native";

const HabitBarInput = memo((props: any) => {
  const { name, habitNameState, setHabitNameState } = props;

  return (
    <TextInput
      placeholder={name}
      style={{
        height: 45,
        width: 370,
        paddingLeft: 40,
        borderRadius: 20,
        fontSize: 19,
      }}
      maxLength={30}
      onChangeText={setHabitNameState}
      value={habitNameState}
      autoFocus={true}
    />
  );
});

export default HabitBarInput;
