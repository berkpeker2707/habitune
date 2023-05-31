import * as React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import HabitBar from "../components/home/HabitBar";
import HabitBarFilled from "../components/home/HabitBarFilled";

// color1: #968EB0
// color2: #9DB2CE
// color3: #C04F43
// color4: #A5D2AC
// color5: #99BB42
// color6: #F59732
// color7: #F1867E
// color8: #FCCA1B
// color9: #4D6691
// color10: #6EA8D8
// color11: #DEB4CF
// color12: #F6AF90

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

function isInArray(array: any[], value: Date) {
  return !!array.find((item) => {
    return new Date(item).getTime() == value.getTime();
  });
}

// name, color, sharedWith[i].image
// name:string, color:string,sharedWith:[]

// // check if today
// function isToday(date: Date) {
//   const today = new Date();
//   if (today.toDateString() === date.toDateString()) {
//     return true;
//   }
//   return false;
// }

var todayTemp = new Date();
var today = new Date(
  todayTemp.getFullYear(),
  todayTemp.getMonth(),
  todayTemp.getDate()
);

const renderItem = ({ item }: { item: any }) => (
  <TouchableOpacity
    onPress={() => {
      // console.log(
      //   item.dates.includes(new Date(Date.now()).toISOString().split("T")[0])
      // ),
      // console.log(item.dates),
      // const a = ['a', 'b', 'c'];
      // const b = ['c', 'a', 'd'];

      // var a = isInArray(item?.dates, today);
      // console.log(a);
      // console.log(today);
      // console.log(item.dates);

      console.log(item);
      console.log(item.color);
      console.log(item.sharedWith);

      // console.log(isToday(new Date(Date.now()))); // true
      // console.log(isToday(new Date("2023-05-30T00:10:00.000Z")));

      // console.log(item.upcomingDates[i].$date);
      // console.log("$$$$$$$$$$$$$$$$$$$$$$$$");
      // console.log("item.dates", item.dates);
      // console.log("########################");
      // console.log("found", found);
      // console.log(new Date(Date.now()).toISOString());
    }}
  >
    {!isInArray(item?.dates, today) ? (
      <>
        <HabitBar item={item} />
      </>
    ) : (
      <HabitBarFilled item={item} />
    )}
  </TouchableOpacity>
);

export function Home() {
  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        backgroundColor: "#F9F9F9",
      }}
    >
      <Text>Habits</Text>
      <FlashList data={DATA} renderItem={renderItem} estimatedItemSize={20} />
    </View>
  );
}
