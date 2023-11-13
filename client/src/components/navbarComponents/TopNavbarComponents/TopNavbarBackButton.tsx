import * as React from "react";
import Svg, { Path } from "react-native-svg";

const TopNavbarBackButton = () => {
  return (
    <Svg width={24} height={24} fill="none" viewBox="0 0 24 24">
      <Path
        fill="#444"
        stroke="#FFFFFF"
        d="M13.776 2.116l-8.208 8.207-.427.427H23.75v2.5H5.142l.426.427 8.194 8.208L12 23.646.354 12 12 .353l1.775 1.763z"
      />
    </Svg>
  );
};

export default TopNavbarBackButton;
