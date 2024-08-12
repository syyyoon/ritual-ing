import { Button, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import { login, logout, unlink, me } from "@react-native-kakao/user";
import Logo from "../components/Logo";
import { HomeScreenNavigationProp } from "../types/navigation";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/user";

type Props = {
  navigation: HomeScreenNavigationProp;
};

// type UserData = {
//   id: string;
//   nickname: string;
//   profileImageUrl: string;
// };

const HomeScreen = ({ navigation }: Props) => {
  const [userData, setUserData] = useState<User | null>(null);

  const backgroundImage = require("../assets/bgImage.png");

  // const findUser = async () => {
  //   const result = await AsyncStorage.getItem("user");
  //   setUserData(JSON.parse(result));

  //   console.log("user result", result);
  // };

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

      await AsyncStorage.setItem("user", JSON.stringify(user));
      console.log("User data saved:", JSON.stringify(user));
      // setUserData(user);
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

  useEffect(() => {
    console.log("find User 실행");
    // findUser();
  }, []);

  return (
    <SafeAreaView style={styles.mainLayout}>
      <View style={styles.bgImageContainer}>
        <Image source={backgroundImage} style={styles.bgImage} />
      </View>
      <Logo />
      <Text style={styles.mainTitle}>내 삶의 주도권 찾기 프로젝트</Text>
      <Text style={styles.definition}>*Ritual : 매일 나 자신을 위해 반복적, 규칙적으로 하는 의식적 행위</Text>
      <View style={styles.buttonsContainer}>
        <CustomButton label="Login" size="large" onPress={loginHandler} />
      </View>
      {/* 개발 중 사용할 버튼  */}
      <Button
        title="skip"
        onPress={() => {
          navigation.navigate("Main");
        }}
      />
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
