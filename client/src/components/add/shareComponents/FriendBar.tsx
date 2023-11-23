import * as React from "react";
import { memo } from "react";
import { View, Image, Text } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../../context/ThemeContext";

const FriendBar = memo(
  (props: {
    friendProfilePicture: string;
    friendName: string;
    friendSelected: boolean;
    pending: boolean;
  }) => {
    const { friendProfilePicture, friendName, friendSelected, pending } = props;
    const { theme } = useTheme();

    return (
      <>
        <View
          style={{
            position: "absolute",
            width: 303,
            height: 45,
            left: 21,
            borderWidth: 0.5,
            backgroundColor: theme.backgroundColor,
            borderColor: theme.borderColor,
            borderRadius: 50,
            //   shadow starts
            overflow: "hidden",
            shadowColor: theme.fadedShadowColor,
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
            {friendProfilePicture ? (
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
            ) : (
              ""
            )}
            {/* marking starts */}
            {friendSelected ? (
              <View style={{ position: "absolute", left: 15 }}>
                <Svg width={21} height={17} fill="none" viewBox="0 0 21 17">
                  <Path
                    fill={theme.color0}
                    stroke={theme.color1}
                    d="M7.038 12.475L2.714 7.996l-.18-.185-.18.185L.822 9.573l-.17.174.17.174 6.037 6.253.18.186.18-.186L20.18 2.75l.168-.174-.168-.173L18.657.826l-.18-.186-.18.186L7.038 12.475z"
                  />
                </Svg>
              </View>
            ) : (
              <></>
            )}
            {/* marking ends */}
            <Text
              style={{
                color: theme.primaryText,
                position: "absolute",
                left: 50,
              }}
            >
              {friendName}
              {pending ? " (pending)" : ""}
            </Text>
          </View>
        </View>
      </>
    );
  }
);

export default FriendBar;
