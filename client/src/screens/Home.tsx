import * as React from "react";
import { memo, useEffect, useState } from "react";

import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import HabitBar from "../components/home/HabitBar";

import { useAppDispatch } from "../state/store";

import { updateHabitCompletedDateAction } from "../state/habitSlice";

import uuid from "react-native-uuid";

const Home = memo((props: any) => {
  const { allHabits, habitUpdated, currentHabitDatesIncluded } = props;

  const dispatch = useAppDispatch();

  const [tempBarFilled, setTempBarFilled] = useState<Array<Boolean>>(() => [
    ...currentHabitDatesIncluded,
  ]);

  function handleHabitClicked(index: number) {
    const newHabitArray = tempBarFilled.map((nH, i) => {
      if (i === index) {
        return !nH;
      } else {
        return nH;
      }
    });
    setTempBarFilled(newHabitArray);
  }

  const [selectedItem, setSelectedItem] = useState("");
  const [nameChangable, setNameChangable] = useState(false);

  useEffect(() => {
    props.navigation.getParent().setParams({ homeEditState: false });
  }, []);

  useEffect(() => {
    if (
      props.navigation.getParent().getState().routes[0].params.homeEditState ===
      false
    ) {
      setSelectedItem(() => "");

      setNameChangable(() => false);
    }
  }, [props.navigation.getParent().getState().routes[0].params?.homeEditState]);

  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        backgroundColor: "#FFFFFF",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <ScrollView
        style={{
          marginBottom: 85,
        }}
      >
        <Text>Habits</Text>
        {allHabits?.map((item: any, index: any) => (
          <TouchableOpacity
            key={uuid.v4() as string}
            onPress={() => {
              // console.log(
              //   props.navigation.getParent().getState().routes[0].params
              //     .homeEditState
              // );
              // console.log(
              //   "🚀 ~ file: Home.tsx:851 ~ Home ~ item._id:",
              //   item._id
              // );

              dispatch(
                updateHabitCompletedDateAction({
                  _id: item._id,
                  date: Date.now(),
                })
              );

              handleHabitClicked(index);
            }}
            onLongPress={() => {
              setNameChangable(() => true);
              props.navigation.getParent().getState().routes[0].params
                .homeEditState
                ? props.navigation.getParent().setParams({
                    homeEditState: false,
                  })
                : props.navigation.getParent().setParams({
                    homeEditState: true,
                    _id: item._id,
                  });

              setSelectedItem(() =>
                selectedItem === item._id.toString() ? "" : item._id.toString()
              );
            }}
          >
            <HabitBar
              item={item}
              itemStroke={item._id.toString() === selectedItem ? 2 : 0.5}
              filled={tempBarFilled[index]}
              nameChangable={
                item._id.toString() === selectedItem ? nameChangable : false
              }
              navigation={props.navigation}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
});

export default Home;
