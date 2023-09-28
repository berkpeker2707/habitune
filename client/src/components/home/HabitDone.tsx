import * as React from "react";
import { memo, useEffect, useState } from "react";
import { TextInput, View, Image, Text as RText } from "react-native";
import Svg, {
  G,
  Rect,
  Text,
  Circle,
  LinearGradient,
  Stop,
  Path,
} from "react-native-svg";

const HabitDone = memo((props: any) => {
  const { item, itemStroke, nameChangable, navigation } = props;
  const [text, onChangeText] = useState("");

  useEffect(() => {
    navigation.setParams({
      name: text,
    });
  }, [text]);

  return (
    <Svg width={372} height={48} fill="none" viewBox="0 0 372 48">
      <G filter="url(#filter0_d_386_5008)">
        <Rect
          width={370}
          height={45}
          x={1}
          y={1}
          stroke={itemStroke == 2 ? item.color : ""}
          strokeWidth={itemStroke == 2 ? 2 : 0}
          fill="url(#paint0_linear_386_5008)"
          rx={22.5}
        />
      </G>
      {/* mark starts */}
      <G filter="url(#filter1_d_386_5008)">
        <Circle cx={22} cy={23} r={9} fill={item.color} />
        <Circle
          cx={22}
          cy={23}
          r={9.25}
          stroke="#fff"
          strokeWidth={item.itemStroke}
        />
      </G>
      <Path
        fill="#fff"
        d="M20.26 26.172l-2.432-2.433-.828.823 3.26 3.26 7-7-.822-.822-6.177 6.172z"
      />
      {/* mark ends */}

      {!nameChangable ? (
        <Text fill="#000" fontSize="19" x={40} y={30}>
          {item.name}
        </Text>
      ) : (
        <TextInput
          placeholder={item.name}
          style={{
            height: 45,
            width: 370,
            paddingLeft: 40,
            borderRadius: 20,
            fontSize: 19,
          }}
          maxLength={30}
          onChangeText={onChangeText}
          value={text}
          autoFocus={true}
        />
      )}
      {/* right side starts */}
      <>
        <LinearGradient
          id="paint0_linear_386_5008"
          x1={4.5}
          x2={371}
          y1={23}
          y2={23}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor={item.color} />
        </LinearGradient>
        {item && item.sharedWith && item.sharedWith.length > 2 ? (
          <View style={{ flex: 1, zIndex: 30 }}>
            <View
              style={{
                width: 34,
                height: 34,
                marginLeft: 326,
                marginTop: 6,
                borderColor: "#FFFFFF",
                backgroundColor: item.color,
                borderWidth: 1,
                borderRadius: 25,
              }}
            >
              <RText
                style={{
                  width: 34,
                  height: 34,
                  marginLeft: 8,
                  marginTop: item.sharedWith.length > 11 ? 10 : 8,
                  fontSize: item.sharedWith.length > 11 ? 8 : 12,
                  fontWeight: "600",
                  color: "#FFFFFF",
                }}
              >
                +{item.sharedWith.length - 2}
              </RText>
            </View>
          </View>
        ) : (
          <></>
        )}
        {item &&
        item.sharedWith[item.sharedWith.length - 1] &&
        item.sharedWith[item.sharedWith.length - 1].image ? (
          <View
            style={{
              flex: 1,
              zIndex: 20,
            }}
          >
            <Image
              style={{
                width: 34,
                height: 34,
                marginLeft: item.sharedWith.length <= 2 ? 326 : 306,
                marginTop: 6,
                borderColor: "#FFFFFF",
                borderWidth: 1,
                borderRadius: 25,
              }}
              source={{
                uri: item.sharedWith[item.sharedWith.length - 1].image,
              }}
            />
          </View>
        ) : (
          <></>
        )}
        {item &&
        item.sharedWith[item.sharedWith.length - 2] &&
        item.sharedWith[item.sharedWith.length - 2].image ? (
          <View style={{ flex: 1, zIndex: 10 }}>
            <Image
              style={{
                width: 34,
                height: 34,
                marginLeft: item.sharedWith.length < 3 ? 306 : 286,
                marginTop: 6,
                borderColor: "#FFFFFF",
                borderWidth: 1,
                borderRadius: 25,
              }}
              source={{
                uri: item.sharedWith[item.sharedWith.length - 2].image,
              }}
            />
          </View>
        ) : (
          <></>
        )}
      </>
      {/* right side ends */}
    </Svg>
  );
});

export default HabitDone;
