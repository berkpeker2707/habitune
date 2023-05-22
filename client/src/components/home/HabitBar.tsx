import * as React from "react";
import Svg, {
  Path,
  G,
  Mask,
  Rect,
  Defs,
  Pattern,
  Use,
  Image,
} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const HabitBar = (props: any) => {
  const { onPress } = props;

  return (
    <Svg width={372} height={48} fill="none" viewBox="0 0 372 48" {...props}>
      <Path
        fill="#000"
        d="M41.87 18.315V16.91h9.818v1.406H47.57V30h-1.585V18.315h-4.117zM55.482 30.23a3.99 3.99 0 01-1.694-.351 2.907 2.907 0 01-1.208-1.03c-.299-.451-.448-.997-.448-1.636 0-.562.111-1.018.333-1.368.221-.354.517-.63.888-.83.371-.201.78-.35 1.227-.448.452-.102.906-.183 1.362-.243.597-.077 1.08-.134 1.451-.173.375-.042.648-.113.818-.21.175-.099.262-.27.262-.512v-.051c0-.63-.172-1.12-.517-1.47-.341-.35-.86-.524-1.554-.524-.72 0-1.285.157-1.694.473-.409.315-.696.652-.863 1.01l-1.431-.512c.255-.596.596-1.061 1.022-1.393.43-.337.9-.571 1.407-.703a5.84 5.84 0 011.508-.205c.315 0 .678.038 1.087.115a3.48 3.48 0 011.195.454c.388.23.71.577.965 1.042.256.464.384 1.086.384 1.866V30h-1.509v-1.33h-.076a2.658 2.658 0 01-.512.684c-.239.243-.556.45-.952.62-.396.17-.88.256-1.451.256zm.23-1.355c.596 0 1.1-.117 1.508-.352a2.393 2.393 0 001.253-2.077v-1.38c-.064.076-.204.146-.422.21-.213.06-.46.113-.741.16a33.842 33.842 0 01-1.445.192 5.772 5.772 0 00-1.1.25c-.336.11-.608.278-.817.504-.205.222-.307.524-.307.908 0 .524.194.92.581 1.189.393.264.889.396 1.49.396zm13.978-6.494l-1.355.383a2.52 2.52 0 00-.377-.658 1.831 1.831 0 00-.665-.537c-.282-.14-.642-.211-1.08-.211-.601 0-1.102.138-1.503.415-.396.273-.594.62-.594 1.042 0 .375.136.671.409.889.273.217.699.398 1.278.543l1.458.358c.878.213 1.532.54 1.962.978.43.435.646.995.646 1.681 0 .563-.162 1.066-.486 1.509-.32.443-.767.792-1.343 1.048-.575.256-1.244.383-2.007.383-1.001 0-1.83-.217-2.486-.651-.656-.435-1.072-1.07-1.247-1.905l1.432-.358c.137.528.395.925.774 1.189.383.264.884.396 1.502.396.703 0 1.261-.15 1.675-.447.417-.303.626-.665.626-1.087 0-.341-.12-.627-.358-.857-.239-.234-.605-.409-1.1-.524l-1.636-.383c-.899-.213-1.56-.544-1.981-.991-.418-.452-.627-1.016-.627-1.694 0-.554.156-1.044.467-1.47.315-.426.743-.76 1.285-1.004.545-.243 1.163-.364 1.853-.364.972 0 1.735.213 2.289.64.558.425.954.988 1.189 1.687zm3.856 4.04l-.026-1.867h.307l4.295-4.372h1.867l-4.577 4.628h-.128l-1.738 1.61zM72.14 30V16.91h1.509V30H72.14zm6.24 0l-3.836-4.858 1.074-1.048L80.297 30h-1.918zm13.19-13.09V30h-1.585V18.571h-.076l-3.196 2.122v-1.61l3.272-2.174h1.586z"
      />
      <G filter="url(#filter0_d_386_5007)">
        <Mask
          id="a"
          width={20}
          height={20}
          x={12}
          y={13}
          fill="#000"
          maskUnits="userSpaceOnUse"
        >
          <Path fill="#fff" d="M12 13h20v20H12z" />
          <Path d="M31 23a9 9 0 11-18 0 9 9 0 0118 0zm-16.014 0a7.013 7.013 0 1014.027 0 7.013 7.013 0 00-14.027 0z" />
        </Mask>
        <Path
          fill="#C04F43"
          d="M31 23a9 9 0 11-18 0 9 9 0 0118 0zm-16.014 0a7.013 7.013 0 1014.027 0 7.013 7.013 0 00-14.027 0z"
        />
        <Path
          stroke="#fff"
          d="M31 23a9 9 0 11-18 0 9 9 0 0118 0zm-16.014 0a7.013 7.013 0 1014.027 0 7.013 7.013 0 00-14.027 0z"
          mask="url(#a)"
        />
      </G>
      <G filter="url(#filter1_d_386_5007)">
        <Rect
          width={369.8}
          height={44.8}
          x={1.1}
          y={1.1}
          stroke="#A5D2AC"
          rx={22.4}
        />
      </G>
      <G filter="url(#filter2_d_386_5007)">
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
          stroke="#fff"
          rx={17.25}
        />
      </G>
      <G filter="url(#filter3_d_386_5007)">
        <Rect
          width={33}
          height={34}
          x={308}
          y={6}
          fill="url(#pattern1)"
          rx={16.5}
        />
        <Rect
          width={33.5}
          height={34.5}
          x={307.75}
          y={5.75}
          stroke="#fff"
          rx={16.75}
        />
      </G>
      <G filter="url(#filter4_d_386_5007)">
        <Rect width={34} height={34} x={327} y={6} fill="#9890B2" rx={17} />
        <Rect
          width={34.5}
          height={34.5}
          x={326.75}
          y={5.75}
          stroke="#fff"
          rx={17.25}
        />
      </G>
      <Path
        fill="#000"
        d="M340.733 26.466V20.84h.955v5.625h-.955zm-2.335-2.335v-.955h5.625v.955h-5.625zm10.74-4.858V28h-1.057v-7.62h-.051l-2.131 1.416v-1.074l2.182-1.45h1.057z"
      />
      <Path
        fill="#fff"
        d="M340.733 26.466h-.5v.5h.5v-.5zm0-5.625v-.5h-.5v.5h.5zm.955 0h.5v-.5h-.5v.5zm0 5.625v.5h.5v-.5h-.5zm-3.29-2.335h-.5v.5h.5v-.5zm0-.955v-.5h-.5v.5h.5zm5.625 0h.5v-.5h-.5v.5zm0 .955v.5h.5v-.5h-.5zm-2.79 2.335V20.84h-1v5.625h1zm-.5-5.125h.955v-1h-.955v1zm.455-.5v5.625h1V20.84h-1zm.5 5.125h-.955v1h.955v-1zm-2.79-1.835v-.955h-1v.955h1zm-.5-.455h5.625v-1h-5.625v1zm5.125-.5v.955h1v-.955h-1zm.5.455h-5.625v1h5.625v-1zm5.115-4.358h.5v-.5h-.5v.5zm0 8.727v.5h.5V28h-.5zm-1.057 0h-.5v.5h.5V28zm0-7.62h.5v-.5h-.5v.5zm-.051 0v-.5h-.151l-.126.084.277.417zm-2.131 1.416h-.5v.932l.777-.516-.277-.416zm0-1.074l-.277-.417-.223.148v.269h.5zm2.182-1.45v-.5h-.151l-.126.084.277.417zm.557 0V28h1v-8.727h-1zm.5 8.228h-1.057v1h1.057v-1zm-.557.5v-7.62h-1V28h1zm-.5-8.12h-.051v1h.051v-1zm-.328.084l-2.131 1.415.554.833 2.13-1.415-.553-.833zm-1.354 1.832v-1.074h-1v1.073h1zm-.223-.658l2.181-1.449-.553-.833-2.182 1.45.554.832zm1.905-1.365h1.057v-1h-1.057v1z"
      />
      <Defs>
        <Pattern
          id="pattern0"
          width={1}
          height={1}
          patternContentUnits="objectBoundingBox"
        >
          <Use transform="scale(.0025)" />
        </Pattern>
        <Pattern
          id="pattern1"
          width={1}
          height={1}
          patternContentUnits="objectBoundingBox"
        >
          <Use transform="matrix(.00095 0 0 .00093 -.015 0)" />
        </Pattern>
        <Image id="image0_386_5007" width={399} height={399} />
        <Image id="image1_386_5007" width={1080} height={1080} />
      </Defs>
    </Svg>
  );
};

export default HabitBar;
