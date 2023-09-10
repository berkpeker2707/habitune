import * as React from "react";
import { memo, useEffect, useState } from "react";
import { TextInput } from "react-native";
import Svg, {
  Path,
  G,
  Mask,
  Rect,
  Defs,
  Pattern,
  Use,
  Image,
  Text,
} from "react-native-svg";

const HabitUndone = memo((props: any) => {
  const { item, itemStroke, nameChangable, navigation } = props;
  const [text, onChangeText] = useState("");

  useEffect(() => {
    navigation.getParent().setParams({
      name: text,
    });
  }, [text]);

  return (
    <Svg width={372} height={48} fill="none" viewBox="0 0 372 48">
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

      <G filter="url(#filter0_d_392_5163)">
        <Mask
          id="path-2-outside-1_392_5163"
          width={20}
          height={20}
          x={12}
          y={13}
          fill="#000"
          maskUnits="userSpaceOnUse"
        >
          <Path fill="#fff" d="M12 13H32V33H12z" />
          <Path d="M31 23a9 9 0 11-18 0 9 9 0 0118 0zm-16.014 0a7.013 7.013 0 1014.027 0 7.013 7.013 0 00-14.027 0z" />
        </Mask>
        <Path
          fill={item.color}
          d="M31 23a9 9 0 11-18 0 9 9 0 0118 0zm-16.014 0a7.013 7.013 0 1014.027 0 7.013 7.013 0 00-14.027 0z"
        />
        <Path
          stroke="#fff"
          d="M31 23a9 9 0 11-18 0 9 9 0 0118 0zm-16.014 0a7.013 7.013 0 1014.027 0 7.013 7.013 0 00-14.027 0z"
          mask="url(#path-2-outside-1_392_5163)"
        />
      </G>

      <G filter="url(#filter1_d_392_5163)">
        <Rect
          width={369.8}
          height={44.8}
          x={1.1}
          y={1.1}
          stroke={item.color}
          strokeWidth={itemStroke}
          rx={22.4}
        />
      </G>
      {item &&
      item.sharedWith[item.sharedWith.length - 2] &&
      item.sharedWith[item.sharedWith.length - 2].image ? (
        <G filter="url(#filter2_d_392_5163)" shapeRendering="crispEdges">
          <Rect
            width={34}
            height={34}
            x={288}
            y={6}
            fill="url(#pattern0)"
            rx={17}
          />
          <Rect
            width={34.5}
            height={34.5}
            x={287.75}
            y={5.75}
            stroke={item.color}
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
        <G filter="url(#filter3_d_392_5163)" shapeRendering="crispEdges">
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
                stroke={item.color}
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
                stroke={item.color}
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
          <G filter="url(#filter4_d_392_5163)">
            <Rect
              width={34}
              height={34}
              x={327}
              y={6}
              fill={item.color}
              rx={17}
            />
            <Rect
              width={34.5}
              height={34.5}
              x={326.75}
              y={5.75}
              stroke={item.color}
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
            <Use transform="scale(.0025)" xlinkHref="#image0_392_5163" />
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
              transform="matrix(.00095 0 0 .00093 -.015 0)"
              xlinkHref="#image1_392_5163"
            />
          </Pattern>
        ) : (
          <></>
        )}
        {item &&
        item.sharedWith[item.sharedWith.length - 2] &&
        item.sharedWith[item.sharedWith.length - 2].image ? (
          <Image
            id="image0_392_5163"
            width={399}
            height={399}
            href={{ uri: "https://i.pravatar.cc/300" }}
            // href={{ uri: item.sharedWith[item.sharedWith.length - 2].image }}
          />
        ) : (
          <></>
        )}
        {item &&
        item.sharedWith[item.sharedWith.length - 1] &&
        item.sharedWith[item.sharedWith.length - 1].image ? (
          <Image
            id="image1_392_5163"
            width={1080}
            height={1080}
            // href={{ uri: "https://i.pravatar.cc/300" }}
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

export default HabitUndone;
