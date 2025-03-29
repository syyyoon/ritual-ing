import { Image, StyleSheet, View } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";
import { login, me } from "@react-native-kakao/user";
import Logo from "../components/Logo";
import { HomeScreenNavigationProp } from "../types/navigation";
import CustomText from "../components/CustomText";
import { generateUniqueId } from "../utils/uniqueId";
import Layout from "../components/Layout";
import useUserStore from "../store/userStore";
import { User } from "../types/user";

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({ navigation }: Props) => {
  const backgroundImage = require("../assets/bgImage.png");
  const { userData, setUserData, loadUserData } = useUserStore();

  const handleLogin = async (): Promise<void> => {
    try {
      // npx expo run: ios
      // await login();
      // const result = await me();
      // const user: User = {
      //   id: result.id,
      //   nickname: result.nickname,
      //   profileImageUrl: result.profileImageUrl,
      //   morningRitual: {
      //     activity: "",
      //     time: "",
      //     isPushEnabled: false,
      //     notificationId: ""
      //   },
      //   nightRitual: {
      //     activity: "",
      //     time: "",
      //     isPushEnabled: false,
      //     notificationId: ""
      //   },
      //   setupDone: false,
      // };
      // console.log('login', user)
      // npx expo  start 로 실행할때 - 회원탈퇴나 로그아웃 기능은 사용 x
      const user = {
        id: generateUniqueId(),
        nickname: "윤선영",
        profileImageUrl: undefined,
        morningRitual: {
          activity: "",
          time: "",
          isPushEnabled: false,
        },
        nightRitual: {
          activity: "",
          time: "",
          isPushEnabled: false,
        },
        setupDone: false,
      };

      if (userData?.setupDone) {
        console.log("기존유저");
        navigation.navigate("Main");
      } else {
        console.log("new user");
        await setUserData(user);
        navigation.navigate("RitualSetup1st");
      }
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

      <CustomText style={{ marginBottom: 5 }} fontSize={18}>
        내 삶의 주도권 찾기 프로젝트
      </CustomText>
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
