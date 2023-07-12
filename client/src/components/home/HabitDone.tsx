import * as React from "react";
import { memo, useEffect, useState } from "react";
import { TextInput } from "react-native";
import Svg, {
  G,
  Rect,
  Defs,
  Pattern,
  Use,
  Image,
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
    navigation.getParent().setParams({
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
      {item &&
      item.sharedWith[item.sharedWith.length - 2] &&
      item.sharedWith[item.sharedWith.length - 2].image ? (
        <G filter="url(#filter2_d_386_5008)" shapeRendering="crispEdges">
          <Rect
            width={34}
            height={34}
            x={286}
            y={6}
            fill="url(#pattern0)"
            rx={17}
          />
          <Rect
            width={34.5}
            height={34.5}
            x={285.75}
            y={5.75}
            stroke="#fff"
            strokeWidth={1}
            rx={17.25}
          />
        </G>
      ) : (
        <></>
      )}
      {item &&
      item.sharedWith[item.sharedWith.length - 1] &&
      item.sharedWith[item.sharedWith.length - 1].image ? (
        <G filter="url(#filter3_d_386_5008)" shapeRendering="crispEdges">
          {item && item.sharedWith && item.sharedWith.length > 1 ? (
            <>
              <Rect
                width={33}
                height={34}
                x={306}
                y={6}
                fill="url(#pattern1)"
                rx={16.5}
              />
              <Rect
                width={33.5}
                height={34.5}
                x={305.75}
                y={5.75}
                stroke="#fff"
                strokeWidth={1}
                rx={16.75}
              />
            </>
          ) : (
            ///if shared with single, use style below
            <>
              <Rect
                width={34}
                height={34}
                x={325}
                y={6}
                fill="url(#pattern1)"
                rx={17}
              />
              <Rect
                width={34.5}
                height={34.5}
                x={324.75}
                y={5.75}
                stroke="#fff"
                strokeWidth={1}
                rx={17.25}
              />
            </>
          )}
        </G>
      ) : (
        <></>
      )}
      {item && item.sharedWith && item.sharedWith.length > 1 ? (
        <>
          <G filter="url(#filter4_d_386_5008)">
            <Rect
              width={34}
              height={34}
              x={325}
              y={6}
              fill={item.color}
              rx={17}
            />
            <Rect
              width={34.5}
              height={34.5}
              x={324.75}
              y={5.75}
              stroke="#fff"
              strokeWidth={1}
              rx={17.25}
            />
          </G>
          <Text fill="#fff" fontSize="14" fontWeight={600} x={336} y={29}>
            +{item.sharedWith.length}
          </Text>
        </>
      ) : (
        <></>
      )}
      {/* right side starts */}
      <Defs>
        {item &&
        item.sharedWith[item.sharedWith.length - 2] &&
        item.sharedWith[item.sharedWith.length - 2].image ? (
          <Pattern
            id="pattern0"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox"
          >
            <Use transform="scale(.0025)" xlinkHref="#image0_386_5008" />
          </Pattern>
        ) : (
          <></>
        )}
        {item &&
        item.sharedWith[item.sharedWith.length - 1] &&
        item.sharedWith[item.sharedWith.length - 1].image ? (
          <Pattern
            id="pattern1"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox"
          >
            <Use
              // transform="matrix(.00095 0 0 .00093 -.015 0)"
              transform="matrix(.00095 0 0 .00093 -.015 0)"
              xlinkHref="#image1_386_5008"
            />
          </Pattern>
        ) : (
          <></>
        )}
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
        {item &&
        item.sharedWith[item.sharedWith.length - 2] &&
        item.sharedWith[item.sharedWith.length - 2].image ? (
          <Image
            id="image0_386_5008"
            width={399}
            height={399}
            href={{ uri: item.sharedWith[item.sharedWith.length - 2].image }}
          />
        ) : (
          <></>
        )}
        {item &&
        item.sharedWith[item.sharedWith.length - 1] &&
        item.sharedWith[item.sharedWith.length - 1].image ? (
          <Image
            id="image1_386_5008"
            width={1080}
            height={1080}
            href={{ uri: item.sharedWith[item.sharedWith.length - 1].image }}
          />
        ) : (
          <></>
        )}
      </Defs>
      {/* right side ends */}
    </Svg>
  );
});

export default HabitDone;
