import { Button, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import { login, logout, unlink, me } from "@react-native-kakao/user";
import Logo from "../components/Logo";
import { HomeScreenNavigationProp } from "../types/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomText from "../components/CustomText";
import { generateUniqueId } from "../utils/uniqueId";
import { saveUserData } from "../service/userDataService";
import Layout from "../components/Layout";

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({ navigation }: Props) => {
  const backgroundImage = require("../assets/bgImage.png");

  const handleLogin = async (): Promise<void> => {
    try {
      // npx expo run: ios
      await login();
      const result = await me();
      console.log(result)
      const user = {
        id: result.id,
        nickname: result.nickname,
        profileImageUrl: result.profileImageUrl,
      };


      // npx expo  start 로 실행할때
      // const user = {
      //   id: generateUniqueId(),
      //   nickname: "윤선영",
      //   profileImageUrl: undefined,
      // };

      await AsyncStorage.setItem("user", JSON.stringify(user));
      navigation.navigate("RitualSetup1st");
    } catch (err) {
      console.error("login err", err);
    }
  };


  return (
    <Layout style={styles.homeLayout}>
      <View style={styles.bgImageContainer}>
        <Image source={backgroundImage} style={styles.bgImage} />
      </View>
      <Logo />

      <CustomText style={{ marginBottom: 5 }} fontSize={18} >내 삶의 주도권 찾기 프로젝트</CustomText>
      <CustomText fontSize={12}>*Ritual : 매일 나 자신을 위해 반복적, 규칙적으로 하는 의식적 행위</CustomText>



      <View style={styles.buttonsContainer}>
        <CustomButton theme="light" label="Login" size="large" onPress={handleLogin} />
      </View>
    </Layout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeLayout: {
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

  buttonsContainer: {
    marginTop: 40,
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
  },
});
