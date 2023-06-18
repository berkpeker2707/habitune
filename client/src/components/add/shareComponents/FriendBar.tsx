import * as React from "react";
import { View, Image, Text } from "react-native";
import Svg, { Path } from "react-native-svg";

const FriendBar = (props: {
  friendProfilePicture: string;
  friendName: string;
  friendSelected: boolean;
  barPositionLevel: number;
}) => {
  const { friendProfilePicture, friendName, friendSelected, barPositionLevel } =
    props;

  return (
    <>
      <View
        style={{
          position: "absolute",
          width: 303,
          height: 45,
          left: 21,
          top: barPositionLevel,
          borderWidth: 0.5,
          borderColor: "#968EB0",
          borderRadius: 50,
          //   shadow starts
          overflow: "hidden",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 2,
          //   shadow ends
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            width: 303,
            height: 45,
          }}
        >
          <Image
            style={{
              width: 34,
              height: 34,
              borderRadius: 20,
              marginLeft: 8,
            }}
            source={{
              uri: friendProfilePicture,
            }}
          />
          {/* marking starts */}
          {friendSelected ? (
            <View style={{ position: "absolute", left: 15 }}>
              <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                <Path
                  fill="#fff"
                  stroke="#968EB0"
                  d="M7.038 12.475L2.714 7.996l-.18-.185-.18.185L.822 9.573l-.17.174.17.174 6.037 6.253.18.186.18-.186L20.18 2.75l.168-.174-.168-.173L18.657.826l-.18-.186-.18.186L7.038 12.475z"
                />
              </Svg>
            </View>
          ) : (
            <></>
          )}
          {/* marking ends */}
          <Text
            // style={{ backgroundColor: "#f4f4", width: 303, height: 45 }}
            style={{ position: "absolute", left: 50 }}
          >
            {friendName}
          </Text>
        </View>
      </View>
    </>
  );
};

export default FriendBar;
