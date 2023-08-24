import * as React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import HabitBar from "../components/home/HabitBar";
import { memo, useCallback, useEffect, useState } from "react";

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
    lastDate: "2023-07-10T00:00:00.000Z",

    dates: [
      "2023-05-01T21:00:00.000Z",
      "2023-05-30T21:00:00.000Z",
      "2023-07-07T21:00:00.000Z",
      "2023-07-08T21:00:00.000Z",
      "2023-07-09T21:00:00.000Z",
      "2023-07-10T21:00:00.000Z",
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
  {
    _id: "6475e98537d8e8afe73d0b69",

    owner: "643933a420ccb64a40e171a8",

    name: "habitTest3",
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
    firstDate: "2023-05-01T00:00:00.000Z",
    lastDate: "2023-07-10T00:00:00.000Z",

    dates: [
      "2023-05-01T21:00:00.000Z",
      "2023-05-30T21:00:00.000Z",
      "2023-07-09T21:00:00.000Z",
      "2023-07-10T21:00:00.000Z",
    ],

    upcomingDates: ["2023-04-26T21:00:00.000Z", "2023-04-27T21:00:00.000Z"],
    __v: 0,
  },
  {
    _id: "6475e98537d8e8afe73d0b70",

    owner: "643933a420ccb64a40e171a8",

    name: "habitTest4",
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
  {
    _id: "6475e98537d8e8afe73d0b71",

    owner: "643933a420ccb64a40e171a8",

    name: "habitTest5",
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
  {
    _id: "6475e98537d8e8afe73d0b72",

    owner: "643933a420ccb64a40e171a8",

    name: "habitTest6",
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
  {
    _id: "6475e98537d8e8afe73d0b73",

    owner: "643933a420ccb64a40e171a8",

    name: "habitTest7",
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
  {
    _id: "6475e98537d8e8afe73d0b74",

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
  {
    _id: "6475e98537d8e8afe73d0b75",

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
  {
    _id: "6475e98537d8e8afe73d0b76",

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
  {
    _id: "6475e98537d8e8afe73d0b77",

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
  {
    _id: "6475e98537d8e8afe73d0b78",

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
  {
    _id: "6475e98537d8e8afe73d0b79",

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
  {
    _id: "6475e98537d8e8afe73d0b80",

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
  {
    _id: "6475e98537d8e8afe73d0b81",

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
  {
    _id: "6475e98537d8e8afe73d0b82",

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
  {
    _id: "6475e98537d8e8afe73d0b83",

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
  {
    _id: "6475e98537d8e8afe73d0b84",

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
  {
    _id: "6475e98537d8e8afe73d0b85",

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
  {
    _id: "6475e98537d8e8afe73d0b86",

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
  {
    _id: "6475e98537d8e8afe73d0b87",

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
  {
    _id: "6475e98537d8e8afe73d0b88",

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
  {
    _id: "6475e98537d8e8afe73d0b89",

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
  {
    _id: "6475e98537d8e8afe73d0b90",

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
  {
    _id: "6475e98537d8e8afe73d0b91",

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
  {
    _id: "6475e98537d8e8afe73d0b92",

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

const Home = memo((props: any) => {
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
    [DATA]
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
        {DATA.map((item, index) => (
          <TouchableOpacity
            key={item._id}
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
