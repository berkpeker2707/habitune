// import * as React from "react";
// import { memo } from "react";
// import { TextInput, View, Image, Text as RText } from "react-native";
// import Svg, { Path, G, Mask, Rect, Text } from "react-native-svg";

// const HabitUndone = memo(
//   (props: {
//     item: {
//       color: string;
//       itemStroke: string;
//       name: string;
//       sharedWith: [{ image: string }];
//     };
//     itemStroke: any;
//     nameChangable: any;
//     text: string;
//     onChangeText: any;
//   }) => {
//     const { item, itemStroke, nameChangable, text, onChangeText } = props;

//     return (
//       <Svg width={372} height={48} fill="none" viewBox="0 0 372 48">
//         {!nameChangable ? (
//           <Text fill="#000" fontSize="19" x={40} y={30}>
//             {item.name}
//           </Text>
//         ) : (
//           <TextInput
//             placeholder={item.name}
//             style={{
//               height: 45,
//               width: 370,
//               paddingLeft: 40,
//               borderRadius: 20,
//               fontSize: 19,
//             }}
//             maxLength={30}
//             onChangeText={onChangeText}
//             value={text}
//             autoFocus={true}
//           />
//         )}

//         <G filter="url(#filter0_d_392_5163)">
//           <Mask
//             id="path-2-outside-1_392_5163"
//             width={20}
//             height={20}
//             x={12}
//             y={13}
//             fill="#000"
//             maskUnits="userSpaceOnUse"
//           >
//             <Path fill="#fff" d="M12 13H32V33H12z" />
//             <Path d="M31 23a9 9 0 11-18 0 9 9 0 0118 0zm-16.014 0a7.013 7.013 0 1014.027 0 7.013 7.013 0 00-14.027 0z" />
//           </Mask>
//           <Path
//             fill={item.color}
//             d="M31 23a9 9 0 11-18 0 9 9 0 0118 0zm-16.014 0a7.013 7.013 0 1014.027 0 7.013 7.013 0 00-14.027 0z"
//           />
//           <Path
//             stroke="#fff"
//             d="M31 23a9 9 0 11-18 0 9 9 0 0118 0zm-16.014 0a7.013 7.013 0 1014.027 0 7.013 7.013 0 00-14.027 0z"
//             mask="url(#path-2-outside-1_392_5163)"
//           />
//         </G>

//         <G filter="url(#filter1_d_392_5163)">
//           <Rect
//             width={369.8}
//             height={44.8}
//             x={1.1}
//             y={1.1}
//             stroke={item.color}
//             strokeWidth={itemStroke}
//             rx={22.4}
//           />
//         </G>
//         {/* right side starts */}
//         <>
//           {item && item.sharedWith && item.sharedWith.length > 2 ? (
//             <View style={{ flex: 1, zIndex: 30 }}>
//               <View
//                 style={{
//                   width: 34,
//                   height: 34,
//                   marginLeft: 326,
//                   marginTop: 6,
//                   borderColor: "#FFFFFF",
//                   backgroundColor: item.color,
//                   borderWidth: 1,
//                   borderRadius: 25,
//                 }}
//               >
//                 <RText
//                   style={{
//                     width: 34,
//                     height: 34,
//                     marginLeft: 8,
//                     marginTop: item.sharedWith.length > 11 ? 10 : 8,
//                     fontSize: item.sharedWith.length > 11 ? 8 : 12,
//                     fontWeight: "600",
//                     color: "#FFFFFF",
//                   }}
//                 >
//                   +{item.sharedWith.length - 2}
//                 </RText>
//               </View>
//             </View>
//           ) : (
//             <></>
//           )}
//           {item &&
//           item.sharedWith[item.sharedWith.length - 1] &&
//           item.sharedWith[item.sharedWith.length - 1].image ? (
//             <View
//               style={{
//                 flex: 1,
//                 zIndex: 20,
//               }}
//             >
//               <Image
//                 style={{
//                   width: 34,
//                   height: 34,
//                   marginLeft: item.sharedWith.length <= 2 ? 326 : 306,
//                   marginTop: 6,
//                   borderColor: "#FFFFFF",
//                   borderWidth: 1,
//                   borderRadius: 25,
//                 }}
//                 source={{
//                   uri: item.sharedWith[item.sharedWith.length - 1].image,
//                 }}
//               />
//             </View>
//           ) : (
//             <></>
//           )}
//           {item &&
//           item.sharedWith[item.sharedWith.length - 2] &&
//           item.sharedWith[item.sharedWith.length - 2].image ? (
//             <View style={{ flex: 1, zIndex: 10 }}>
//               <Image
//                 style={{
//                   width: 34,
//                   height: 34,
//                   marginLeft: item.sharedWith.length < 3 ? 306 : 286,
//                   marginTop: 6,
//                   borderColor: "#FFFFFF",
//                   borderWidth: 1,
//                   borderRadius: 25,
//                 }}
//                 source={{
//                   uri: item.sharedWith[item.sharedWith.length - 2].image,
//                 }}
//               />
//             </View>
//           ) : (
//             <></>
//           )}
//         </>
//         {/* right side ends */}
//       </Svg>
//     );
//   }
// );

// export default HabitUndone;
