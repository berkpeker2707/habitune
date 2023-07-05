import * as React from "react";
import Svg, { Path, G, Defs } from "react-native-svg";

const TopNavbarAddFriendButton = () => {
  return (
    <Svg width={26} height={24} fill="none" viewBox="0 0 26 24">
      <Path
        stroke="#444"
        d="M15.181 7.226c0 3.157-2.526 5.701-5.622 5.701-3.097 0-5.623-2.544-5.623-5.701 0-3.158 2.526-5.702 5.623-5.702 3.096 0 5.622 2.544 5.622 5.702zm3.187 14.767c0 .596-.183.821-.399.956-.296.185-.814.294-1.657.3-.758.007-1.656-.067-2.7-.154l-.271-.022c-1.145-.094-2.429-.192-3.782-.192-1.353 0-2.638.098-3.782.192l-.272.022c-1.044.087-1.942.16-2.7.155-.842-.007-1.36-.116-1.657-.301-.215-.135-.398-.36-.398-.956 0-1.217.826-2.446 2.436-3.412 1.594-.957 3.846-1.573 6.373-1.573s4.778.616 6.373 1.573c1.61.966 2.436 2.195 2.436 3.412z"
      />
      <G fill="#444" filter="url(#filter0_d_583_4895)">
        <Path d="M17.53 11.553v-9.17c0-.461.368-.835.823-.835.455 0 .823.374.823.834v9.171c0 .46-.368.834-.823.834a.829.829 0 01-.824-.834z" />
        <Path d="M22.882 7.801h-9.059A.829.829 0 0113 6.968a.83.83 0 01.823-.834h9.06c.454 0 .823.373.823.834 0 .46-.369.833-.824.833z" />
      </G>
      <Defs></Defs>
    </Svg>
  );
};

export default TopNavbarAddFriendButton;