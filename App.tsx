import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { initializeKakaoSDK } from "@react-native-kakao/core";
import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./navigator/AppNavigator";
import { ThemeProvider } from "./context/ThemeContext";

const kakaoSDKkey = process.env.EXPO_PUBLIC_KAKAO_SDK_KEY || "06f4334a34850c5d987422bb523d3a64"

const App: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {

      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);


  useEffect(() => {
    async function prepare() {
      try {
        // 스플래시 화면 자동 숨김 방지
        await SplashScreen.preventAutoHideAsync();
        await new Promise((resolve) => setTimeout(resolve, 2000));
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

  useEffect(() => {
    // kakaoSDK 초기화
    initializeKakaoSDK(kakaoSDKkey);
  }, []);


  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView onLayout={onLayoutRootView}>
      <ThemeProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
