import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import DrawerNavigator from "./components/DrawerNavigator";
import "react-native-gesture-handler";
import { initializeKakaoSDK } from "@react-native-kakao/core";
import { useCallback, useEffect, useState } from "react";
import { getAccessToken, isLogined, login, logout, me } from "@react-native-kakao/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RitualSetup1stScreen from "./screens/RitualSetup1stScreen";
import * as SplashScreen from "expo-splash-screen";
import RitualSetup2ndScreen from "./screens/RitualSetup2ndScreen";
import RitualSetup3rdScreen from "./screens/RitualSetup3rdScreen";
import HomeScreen from "./screens/HomeScreen";
import RitualListScreen from "./screens/RitualListScreen";
import RitualFormScreen from "./screens/RitualFormScreen";
import { RootStackParamList } from "./type";
import SearchScreen from "./screens/SearchScreen";
import RitualDetailScreen from "./screens/RitualDetailScreen";
import ImagePickerScreen from "./screens/ImagePickerScreen";
import { Button, Text, Touchable, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { TouchableOpacity } from "react-native-gesture-handler";
import CustomText from "./components/CustomText";
import { Navigator, useNavigation } from "expo-router";

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  // 로그인
  // const signInWithKakao = async (): Promise<void> => {
  //   try {
  //     const token = await login();
  //     setResult(JSON.stringify(token));
  //   } catch (err) {
  //     console.error("login err", err);
  //   }
  // };
  // 로그아웃
  // const signOutWithKakao = async (): Promise<void> => {
  //   try {
  //     await logout();
  //     setResult("");
  //   } catch (err) {
  //     console.error("signOut error", err);
  //   }
  // };

  // const getProfile = async (): Promise<void> => {
  //   try {
  //     const profile = await me();
  //     setResult(JSON.stringify(profile));
  //   } catch (err) {
  //     console.error("signOut error", err);
  //   }
  // };

  useEffect(() => {
    // kakaoSDK 초기화
    initializeKakaoSDK("06f4334a34850c5d987422bb523d3a64");
  }, []);

  return (
    <RootStack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleStyle: {
          fontFamily: "NotoSansKR_400Regular",
          fontSize: 15,
        },

        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
          </TouchableOpacity>
        ),
      })}
    >
      {/* <RootStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /> */}
      {/* <RootStack.Screen name="RitualSetup1st" component={RitualSetup1stScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="RitualSetup2nd" component={RitualSetup2ndScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="RitualSetup3rd" component={RitualSetup3rdScreen} options={{ headerShown: false }} /> */}
      <RootStack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
      <RootStack.Screen
        name="ImagePicker"
        component={ImagePickerScreen}
        options={({ navigation }) => ({
          headerTitle: "Add an image",
          // headerRight: () => (
          //   <TouchableOpacity
          //     onPress={() => navigation.navigate("RitualForm", { imageUri: null })}
          //     style={{ flexDirection: "row", alignItems: "center" }}
          //   >
          //     <Text>Skip</Text>
          //     <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          //   </TouchableOpacity>
          // ),
        })}
      />
      <RootStack.Screen
        name="RitualForm"
        component={RitualFormScreen}
        options={{
          headerTitle: "New",
        }}
      />
      <RootStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          presentation: "modal",
        }}
      />
      <RootStack.Screen name="Detail" component={RitualDetailScreen} />
    </RootStack.Navigator>
  );
};

const App: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // 스플래시 화면 자동 숨김 방지
        await SplashScreen.preventAutoHideAsync();

        // 필요한 리소스 로드 (예: 폰트)
        // await Font.loadAsync({
        //   // 여기에 필요한 폰트를 추가
        //   // 'Roboto': require('path/to/Roboto.ttf'),
        // });

        // 기타 초기화 작업
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        // 리소스 로드 완료 후 스플래시 화면 숨기기
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null; // 스플래시 화면이 표시되는 동안 렌더링X
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
