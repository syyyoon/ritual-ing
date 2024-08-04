import { Button, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import { login, logout, unlink, me } from "@react-native-kakao/user";
import Logo from "../components/Logo";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../type";
import {
  useFonts,
  BalooBhai2_400Regular,
  BalooBhai2_500Medium,
  BalooBhai2_600SemiBold,
  BalooBhai2_700Bold,
  BalooBhai2_800ExtraBold,
} from "@expo-google-fonts/baloo-bhai-2";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "RitualSetup1st">;
};
type UserData = {
  id: number;
  nickname: string;
  profileImageUrl: string;
};
const HomeScreen = ({ navigation }: Props) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  let [fontsLoaded] = useFonts({
    BalooBhai2_400Regular,
    BalooBhai2_500Medium,
    BalooBhai2_600SemiBold,
    BalooBhai2_700Bold,
    BalooBhai2_800ExtraBold,
  });

  const backgroundImage = require("../assets/bgImage.png");

  const loginHandler = async (): Promise<void> => {
    try {
      await login();
      const result = await me();
      // 유저 정보 저장
      const user = {
        id: result.id,
        nickname: result.nickname,
        profileImageUrl: result.profileImageUrl,
      };

      await AsyncStorage.setItem("userData", JSON.stringify(user));
      console.log("User data saved:", JSON.stringify(user));
      setUserData(user);
      navigation.navigate("RitualSetup1st");
    } catch (err) {
      console.error("login err", err);
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userDataJson = await AsyncStorage.getItem("userData");
        if (userDataJson) {
          setUserData(JSON.parse(userDataJson));
        }
      } catch (err) {
        console.error("Failed to load user data", err);
      }
    };

    loadUserData();
  }, []);

  if (!fontsLoaded) return null;
  return (
    <SafeAreaView style={styles.mainLayout}>
      <View style={styles.bgImageContainer}>
        <Image source={backgroundImage} style={styles.bgImage} />
      </View>
      <Logo />
      <Text style={styles.mainTitle}>내 삶의 주도권 찾기 프로젝트</Text>
      <Text style={styles.definition}>*Ritual : 매일 나 자신을 위해 반복적, 규칙적으로 하는 의식적 행위</Text>
      <View style={styles.buttonsContainer}>
        {/* 카카오로 시작하기 이미지 소스 필요 */}
        {/* <Image source={require("../assets/kakao_login_original_copy.png")} style={{ width: 200 }} /> */}

        <CustomButton label="Login" size="large" onPress={loginHandler} />
        {/* 개발 편의상 둔 버튼 추후 로그아웃/계정연동 해제 버튼은 setting 페이지에. */}
        {/* <CustomButton
          label="Logout"
          theme="dark"
          onPress={() => {
            logout().then(console.log).catch(console.error);
          }}
        /> */}
        {/* 계정 연동 해제하기 */}
      </View>
      {/* <View>
        <CustomButton
          label="Unlink"
          onPress={() => {
            unlink().then(console.log).catch(console.error);
          }}
        />
      </View> */}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bgImageContainer: {
    width: "90%",
    height: "50%",
  },
  bgImage: {
    borderRadius: 20,
    width: "100%",
    height: "100%",
  },
  mainTitle: { fontSize: 18, fontWeight: "200", marginBottom: 3 },
  definition: {
    fontSize: 13,
    fontWeight: "200",
    color: "#65645f",
  },
  buttonsContainer: {
    marginTop: 40,
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
  },
});
