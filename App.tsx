import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
// import { initializeKakaoSDK } from "@react-native-kakao/core";
import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./navigator/AppNavigator";

const App: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // 스플래시 화면 자동 숨김 방지
        await SplashScreen.preventAutoHideAsync();

        // 기타 초기화 작업
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);

        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
