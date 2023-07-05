import * as React from "react";
import { Text, View, TouchableOpacity, Pressable } from "react-native";
import { FlashList } from "@shopify/flash-list";
import HabitBar from "../components/home/HabitBar";
import HabitBarFilled from "../components/home/HabitBarFilled";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import TopNavbarBackButton from "../components/navbarComponents/TopNavbarComponents/TopNavbarBackButton";

const DATA = [
  {
    _id: "644a655e89ee2d787fb24fdd",

    owner: "643933a420ccb64a40e171a8",

    name: "habitTest1",
    color: "#968EB0",
    sharedWith: [
      {
        _id: "644a56d49328fd8dfb7eda91",

        id: 109227819228124180000,
        firstName: "Berk Peker",
        email: "berkpeker94@gmail.com",
        image:
          "https://lh3.googleusercontent.com/a/AGNmyxZnAMxUh01xKgQpdrfq2-28APhe1bKozXRPxZjn_A=s96-c",
        habits: [],
        friends: [],
        __v: 0,
      },
    ],
    firstDate: "2023-05-01T00:00:00.000Z",
    lastDate: "2023-05-10T00:00:00.000Z",

    dates: [
      "2023-05-01T21:00:00.000Z",
      "2023-05-30T21:00:00.000Z",
      "2023-06-01T21:00:00.000Z",
      "2023-06-02T21:00:00.000Z",
    ],
    upcomingDates: [
      "2023-04-26T21:00:00.000Z",
      ,
      "2023-04-27T21:00:00.000Z",
      ,
    ],
    __v: 0,
  },
  {
    _id: "6475e98537d8e8afe73d0b68",

    owner: "643933a420ccb64a40e171a8",

    name: "habitTest2",
    color: "#C04F43",
    sharedWith: [
      {
        _id: "644a56d49328fd8dfb7eda91",

        id: 109227819228124180000,
        firstName: "Berk Peker",
        email: "berkpeker94@gmail.com",
        image:
          "https://lh3.googleusercontent.com/a/AGNmyxZnAMxUh01xKgQpdrfq2-28APhe1bKozXRPxZjn_A=s96-c",
        habits: [],
        friends: [],
        __v: 0,
      },
    ],
    firstDate: "2023-04-27T12:03:36.973Z",

    lastDate: "2023-04-29T19:54:25.904Z",

    dates: ["2023-04-26T21:00:00.000Z", "2023-04-27T21:00:00.000Z"],
    upcomingDates: ["2023-04-26T21:00:00.000Z", "2023-04-27T21:00:00.000Z"],
    __v: 0,
  },
];

// name:string, color:string, sharedWith:[]

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

function isInArray(array: any[], value: Date) {
  return array.find((item) => {
    return new Date(item).getTime() == value.getTime();
  });
}

// const isInArray = useCallback((array: [], value: Date) => {
//   return array.find((item) => {
//     return new Date(item).getTime() == value.getTime();
//   });
// }, []);

const Home = (props: any) => {
  // const navigation = useNavigation();

  // console.log("🚀 ~ file: Home.tsx:110 ~ Home ~ props:", props.navigation);

  // const toggleEditButtons = () => {
  //   setHomeEditState(() => !homeEditState);
  // };

  // useEffect(() => {
  // navigation.setParams({ homeEditState: false });
  // console.log(navigation.getState().routes[0].params.homeEditState);
  // }, []);

  // const renderItem = ({ item }: { item: any }) => (
  //   <TouchableOpacity
  //     style={{
  //       display: "flex",
  //       height: "100%",
  //       backgroundColor: "#FFFFFF",
  //       justifyContent: "flex-start",
  //       alignItems: "center",
  //     }}
  //   >
  //     {/* <TouchableOpacity
  //       // onPress={() => {
  //       // console.log(item);
  //       // console.log(item.color);
  //       // console.log(item.sharedWith);
  //       // }}
  //       onPress={() =>
  //         setHomeEditState((homeEditState) => {
  //           return homeEditState;
  //         })
  //       }
  //       onLongPress={() => {
  //         // setHomeEditState((homeEditState) => !homeEditState);
  //         // navigation.setParams({ homeEditState: homeEditState });
  //         // console.log(navigation.getState()?.params);
  //       }}
  //     > */}
  //     {!isInArray(item.dates, todayLocal21) ? (
  //       <HabitBar item={item} />
  //     ) : (
  //       <HabitBarFilled item={item} />
  //     )}
  //     {/* </TouchableOpacity> */}
  //   </TouchableOpacity>
  // );

  useEffect(() => {
    props.navigation.getParent().setParams({ homeEditState: false });
  }, []);

  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Text>Habits</Text>
      <FlashList
        data={DATA}
        renderItem={({ item }: { item: any }) => (
          <TouchableOpacity
            style={{
              display: "flex",
              height: "100%",
              backgroundColor: "#FFFFFF",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
            onPress={() => {
              // console.log(item);
              // console.log(item.color);
              // console.log(item.sharedWith);
              props.navigation.getParent().getState().routes[0].params
                .homeEditState
                ? props.navigation.getParent().setParams({
                    homeEditState: false,
                  })
                : props.navigation.getParent().setParams({
                    homeEditState: true,
                  });
            }}
          >
            {/* <TouchableOpacity
        onPress={() => {
        console.log(item);
        console.log(item.color);
        console.log(item.sharedWith);
        }}
        onPress={() =>
          setHomeEditState((homeEditState) => {
            return homeEditState;
          })
        }
        onLongPress={() => {
          // setHomeEditState((homeEditState) => !homeEditState);
          // navigation.setParams({ homeEditState: homeEditState });
          // console.log(navigation.getState()?.params);
        }}
      > */}
            {!isInArray(item.dates, todayLocal21) ? (
              <HabitBar item={item} />
            ) : (
              <HabitBarFilled item={item} />
            )}
            {/* </TouchableOpacity> */}
          </TouchableOpacity>
        )}
        estimatedItemSize={20}
      />
    </View>
  );
};

export default Home;
