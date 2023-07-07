import * as React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import HabitBar from "../components/home/HabitBar";
import { useCallback, useEffect, useState } from "react";

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
    _id: "6475e98537d8e8afe73d0b71",

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
    _id: "6475e98537d8e8afe73d0b72",

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
    _id: "6475e98537d8e8afe73d0b73",

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

const Home = (props: any) => {
  const [selectedItem, setSelectedItem] = useState("");

  // useEffect(() => {
  //   setSelectedItem(() => selectedItem);

  //   console.log(
  //     "🚀 ~ file: Home.tsx:91 ~ useEffect ~ selectedItem:",
  //     selectedItem
  //   );
  // }, [selectedItem, ref]);

  useEffect(() => {
    props.navigation.getParent().setParams({ homeEditState: false });
  }, []);

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

  const isInArray = useCallback((array: any[], value: Date) => {
    return array.find((item) => {
      return new Date(item).getTime() == value.getTime();
    });
  }, []);

  //data stuff ends

  return (
    <ScrollView
      style={{
        display: "flex",
        height: "100%",
        backgroundColor: "#FFFFFF",
        marginBottom: 64,
      }}
    >
      <Text>Habits</Text>
      {DATA.map((item, index) => (
        <View
          style={{
            display: "flex",
            // height: "100%",
            backgroundColor: "#FFFFFF",
            justifyContent: "center",
            alignItems: "center",
          }}
          key={item._id}
        >
          <>
            {item._id.toString() === selectedItem ? (
              <TouchableOpacity
                onPress={() => {
                  setSelectedItem(() => item._id.toString());
                }}
              >
                <HabitBar
                  item={item}
                  itemStroke={2}
                  filled={isInArray(item.dates, todayLocal21)}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setSelectedItem(() => item._id.toString());
                }}
              >
                <HabitBar
                  item={item}
                  itemStroke={0.5}
                  filled={isInArray(item.dates, todayLocal21)}
                />
              </TouchableOpacity>
            )}
          </>
        </View>
      ))}
    </ScrollView>
  );
};

export default Home;
