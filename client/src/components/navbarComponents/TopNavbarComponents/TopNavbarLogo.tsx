import * as React from "react";
import Svg, { Path } from "react-native-svg";

const TopNavbarLogo = () => {
  return (
    <Svg width={46} height={32} fill="none" viewBox="0 0 46 32">
      <Path
        fill="#F0FFF2"
        d="M2.976 14.451c.002.004.001.008.001.012s.004.006.005.01C6.83 27.54 13.52 32.011 27.776 31.71c.748-.016.913-1.02.222-1.309-6.213-2.596-1.528-.509-8.317-5.294-3.624-2.555-8.96-9.556-10.57-12.946-.004-.007-.003-.013-.006-.02-.002-.003-.006-.005-.007-.01-1.243-3.075-1.941-4.42-3.05-4.783-.296-.107-.637-.136-1.057-.095-.702.07-1.66.346-2.242 1.264-.762 1.2-.684 3.253.227 5.934z"
      />
      <Path
        fill="#968EB0"
        d="M2.75 8.517c.582-.918 1.54-1.194 2.241-1.264.42-.041.761-.012 1.058.095 1.108.364 1.806 1.708 3.049 4.784 0 .002.002.004.004.005a.011.011 0 01.003.004l.003.01c0 .004 0 .007.002.01 1.612 3.39 6.947 10.39 10.571 12.946 3.643 2.567 3.982 3.156 4.474 3.552.41.33.928.526 3.56 1.624l.002.001.03.012.25.105c.692.29.527 1.293-.221 1.309l-.318.006h-.011C13.416 31.942 6.8 27.438 2.982 14.473l-.002-.005a.01.01 0 01-.003-.005v-.012c-.912-2.681-.99-4.733-.228-5.934zm1.592 5.56c1.877 6.368 4.375 10.396 7.932 12.849 2.904 2.002 6.667 3.063 11.727 3.312a4 4 0 01-.878-.59c-.097-.085-.21-.194-.314-.293l-.119-.113c-.15-.142-.345-.32-.628-.56-.57-.483-1.515-1.224-3.191-2.405-1.982-1.397-4.323-3.915-6.333-6.435-2.015-2.527-3.83-5.224-4.704-7.063l-.018-.038-.015-.036a1.66 1.66 0 01-.016-.039c-.624-1.546-1.07-2.544-1.467-3.194-.387-.634-.61-.735-.707-.767L5.593 8.7l-.018-.006c-.043-.015-.163-.047-.445-.019-.513.051-.946.23-1.188.612-.173.272-.324.763-.292 1.588.031.816.238 1.857.665 3.114a1.444 1.444 0 01.027.089z"
      />
      <Path
        fill="#9DB2CE"
        stroke="#9DB2CE"
        d="M43.169 11.11a14.947 14.947 0 01-.01 11.564h0c-2.54 6.097-9.596 8.99-15.723 6.47a9.433 9.433 0 01-5.15-5.13 9.385 9.385 0 01.005-7.257 7.436 7.436 0 014.066-4.04 7.499 7.499 0 015.748.003 5.831 5.831 0 013.193 3.176c.732 1.758-1.627 3.771-3.445 3.182a20.977 20.977 0 01-.22-.073c-3.041-1.024-5.351 1.889-3.253 4.306.313.36.702.656 1.164.78 2.708.723 5.63-.641 6.74-3.291a6.877 6.877 0 00-.002-5.309 6.888 6.888 0 00-3.77-3.751 8.553 8.553 0 00-6.563-.003 8.494 8.494 0 00-4.645 4.613 10.434 10.434 0 00-.005 8.067c.2.482-.471 1.116-.89.804-2.343-1.74-5.042-4.087-7.088-7.009-1.093-1.56-1.316-1.763-1.685-2.334a3.063 3.063 0 01-.125-3.092C16.055 4.21 25.867-.824 34.959 2.928a15.052 15.052 0 018.21 8.182z"
      />
      <Path
        fill="#968EB0"
        d="M43.075 11.146a14.816 14.816 0 01.575 9.816v.001a15.189 15.189 0 01-.585 1.667c-.23.553-.498 1.08-.8 1.578-2.998 4.958-9.294 7.122-14.827 4.849a9.375 9.375 0 01-5.118-5.096l-.001-.002a9.313 9.313 0 01.005-7.204 7.388 7.388 0 014.04-4.012h.001a7.458 7.458 0 015.713.002 5.793 5.793 0 013.174 3.155c.27.648.117 1.331-.275 1.904-.664.97-2.013 1.623-3.15 1.255a23.286 23.286 0 01-.219-.072c-3.021-1.017-5.317 1.876-3.232 4.276.31.357.698.651 1.156.774 2.693.72 5.596-.636 6.7-3.268a6.874 6.874 0 00.528-2.521 6.849 6.849 0 00-.53-2.75v-.001a6.843 6.843 0 00-3.746-3.724l-.002-.001a8.508 8.508 0 00-6.52-.003h-.002a8.44 8.44 0 00-4.616 4.582 10.345 10.345 0 00-.006 8.01l.001.003c.128.313-.112.689-.41.825-.158.073-.332.078-.476-.029a43.977 43.977 0 01-.999-.763c-2.07-1.63-4.298-3.703-6.046-6.197-.585-.837-.92-1.28-1.161-1.6a11.358 11.358 0 01-.514-.718 3.04 3.04 0 01-.124-3.072C16.126 4.295 25.878-.705 34.915 3.02c3.723 1.539 6.62 4.424 8.16 8.126zM21.813 26.712c-.61.327-1.527.525-2.42-.138-2.404-1.783-5.253-4.246-7.44-7.366a48.982 48.982 0 00-1.071-1.479l-.059-.078a12.416 12.416 0 01-.58-.814 4.796 4.796 0 01-.202-4.85c4.825-9.096 15.453-14.76 25.553-10.596h.001c4.157 1.718 7.4 4.946 9.119 9.08v.002a16.586 16.586 0 01-.01 12.829v.004c-2.9 6.958-10.953 10.253-17.944 7.38h-.002a11.156 11.156 0 01-4.945-3.974zM44.51 21.61zm-10.118-1.107c-.919.42-2.016.59-3.114.234a22.09 22.09 0 01-.239-.079c-.869-.292-1.374.025-1.555.26a.635.635 0 00-.137.431c.008.155.075.422.37.762.161.185.263.22.275.223 1.704.456 3.532-.303 4.4-1.831zM6.412 3.217c0-.3-.28-.546-.552-.382-.03.018-.059.038-.088.059a1.98 1.98 0 00-.543.627 3.521 3.521 0 00-.362.938 4.78 4.78 0 00-.128 1.107c0 .38.044.756.128 1.106.084.351.207.67.362.939.156.268.34.481.543.627l.088.058c.272.164.552-.082.552-.382v-.142c0-.222-.21-.403-.4-.539a1.236 1.236 0 01-.338-.391 2.197 2.197 0 01-.226-.586 2.984 2.984 0 01-.08-.69c0-.237.027-.472.08-.691a2.2 2.2 0 01.226-.585c.097-.168.212-.301.339-.392.19-.136.4-.317.4-.54v-.14zM.083 4.29c-.186-.312-.05-.718.323-.668l.067.01c.277.05.579.179.889.38.31.202.62.472.916.795.295.323.568.692.803 1.088.235.395.429.808.568 1.215.14.408.224.801.247 1.159.024.357-.014.671-.112.924a1.41 1.41 0 01-.024.06c-.146.332-.58.238-.767-.075L2.888 9c-.128-.214-.037-.5.052-.731.06-.158.084-.354.07-.577a2.818 2.818 0 00-.154-.723A4.196 4.196 0 002 5.532a3.023 3.023 0 00-.572-.496 1.537 1.537 0 00-.555-.237C.62 4.752.316 4.681.188 4.467L.083 4.29z"
      />
    </Svg>
  );
};

export default TopNavbarLogo;
