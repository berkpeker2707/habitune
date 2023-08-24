import * as React from "react";
import { memo, useCallback, useEffect, useState } from "react";

import { useFocusEffect } from "@react-navigation/native";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import HabitBar from "../components/home/HabitBar";

import { useAppDispatch, useSelector } from "../state/store";

import {
  fetchAllHabitsAction,
  selectHabitUpdated,
  selectHabits,
} from "../state/habitSlice";

import uuid from "react-native-uuid";

const Home = memo((props: any) => {
  const controller = new AbortController();

  const dispatch = useAppDispatch();

  const allHabits = useSelector(selectHabits);

  const updated = useSelector(selectHabitUpdated);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchAllHabitsAction());

      return () => {
        controller.abort();
      };
    }, [updated])
  );

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

  //data stuff starts
  const todayTemp = new Date();
  const today = new Date(
    todayTemp.getFullYear(),
    todayTemp.getMonth(),
    todayTemp.getDate()
  );

  const userTimezoneOffset = today.getTimezoneOffset() * 60000;
  const todayLocal = new Date(today.getTime() - userTimezoneOffset);

  //need this for setting default hour 21
  //if backend is not 21 but 00, remove this
  const todayLocal21 = new Date(todayLocal.getTime() + 3600000 * 21);

  const isInArray = useCallback(
    (array: any[], value: Date) => {
      return array.find((item) => {
        return new Date(item).getTime() == value.getTime();
      });
    },
    [allHabits]
  );

  //data stuff ends

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
        {allHabits.map((item: any, index: any) => (
          <TouchableOpacity
            key={uuid.v4() as string}
            onPress={() => {
              // console.log(
              //   props.navigation.getParent().getState().routes[0].params
              //     .homeEditState
              // );
              console.log(
                "🚀 ~ file: Home.tsx:851 ~ Home ~ item._id:",
                item._id
              );
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
              filled={isInArray(item.dates, todayLocal21)}
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
