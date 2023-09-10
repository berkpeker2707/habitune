# README STILL IN PROGRESS...

## APP PREVIEW

<details>
  <summary>Home</summary>
  
  <img src="https://github.com/berkpeker2707/habitune/assets/15816386/3dfa7f49-3de3-490f-8acd-f363031859a7" width="400" title="Home">
  
</details>
<details>
  <summary>Home Edit</summary>
  
  <img src="https://github.com/berkpeker2707/habitune/assets/15816386/e1b426b4-8fe9-48a9-8d36-9ff668cb824d" width="400" title="Home">
  
</details>
<details>
  <summary>Login</summary>
  
  <img src="https://github.com/berkpeker2707/habitune/assets/15816386/f519ca61-4f0e-4381-8704-33ba23324af9" width="400" title="Home">
  
</details>
<details>
  <summary>Add</summary>
  
  <img src="https://github.com/berkpeker2707/habitune/assets/15816386/4897a737-c4c7-4bf9-9d87-9fb64941fbee" width="400" title="Home">
  
</details>
<details>
  <summary>Add Calendar</summary>
  
  <img src="https://github.com/berkpeker2707/habitune/assets/15816386/e4ebfac7-d2ad-4140-9b4f-28e8abd21467" width="400" title="Home">
  
</details>
<details>
  <summary>Overview</summary>
  
  <img src="https://github.com/berkpeker2707/habitune/assets/15816386/cb39fef9-a8a8-4c6f-914c-631a773cab2f" width="400" title="Home">
  
</details>
<details>
  <summary>Settings</summary>
  
  <img src="https://github.com/berkpeker2707/habitune/assets/15816386/7f0c95c0-8910-4751-ada7-d61c1fea9673" width="400" title="Home">
  
</details>

## API SIDE NOTES

To Run Docker Image
(change version :1.0 of new images)

- docker build -t habitunecontainer:1.0 .

To Build the Docker Image

- docker run -d -p 1111:1111 habitunecontainer:1.0
  (docker port is usually same with the api, but you can expose different port)

## Google Integration Links:

https://www.habitune.net

https://www.habitune.net/api/user/google/callback

http://localhost:1111/api

http://localhost:1111/api/user/google/callback

## CLIENT SIDE NOTES

// color1: #968EB0
// color2: #9DB2CE
// color3: #C04F43
// color4: #A5D2AC
// color5: #99BB42
// color6: #F59732
// color7: #F1867E
// color8: #FCCA1B
// color9: #4D6691
// color10: #6EA8D8
// color11: #DEB4CF
// color12: #F6AF90

### Client Side Development Notes:

"ipconfig" to check netowork
setx /M REACT_NATIVE_PACKAGER_HOSTNAME 192.168.1.66

Extra libraries to "create-expo-app ." fresh start:
npm install @react-native-async-storage/async-storage @react-navigation/bottom-tabs @react-navigation/native @react-navigation/stack @reduxjs/toolkit axios expo-application expo-auth-session expo-web-browser react-native-gesture-handler react-native-paper react-native-paper-dates react-native-render-html react-native-safe-area-context react-native-screens react-native-svg react-native-webview react-redux redux-persist expo-linear-gradient
npx expo install expo-linear-gradient
npm i moti --legacy-peer-deps
npm install lottie-react-native @types/react-lottie
expo install react-native-svg

Expo Dev Client Deployment (Stream)

1. npx create-expo-app .
2. eas configure
   Select "all" then check, eas.json file for "developmentClient": true".
3. npx expo prebuild
4. eas build --profile development --platform android
   Then install the apk file.
5. npx expo start --dev-client
6. Then scan QR code and check if live server is connected to expo go build project.
   Sources: https://docs.expo.dev/develop/development-builds/create-a-build/?redirected
   https://blog.expo.dev/the-new-expo-cli-f4250d8e3421

If device does not have app:
npx expo start
https://docs.expo.dev/get-started/expo-go/

If app cannot find development server, probably network adress is changed:
https://stackoverflow.com/questions/42064283/could-not-connect-to-react-native-development-server-on-android/42064719#42064719
