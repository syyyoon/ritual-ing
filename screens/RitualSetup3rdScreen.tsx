import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import StepTitle from "../components/StepTitle";
import CircleSticker from "../components/CircleSticker";
import CustomButton from "../components/CustomButton";
import StageBar from "../components/StageBar";
import Carousel from "../components/Carousel";
import { RitualSetup3rdNavigationProp } from "../types/navigation";
import { User } from "../types/user";
import { useTheme } from "../context/ThemeContext";
import Layout from "../components/Layout";
import { getUserData, saveUserData } from "../service/userDataService";
import { scheduleDailyPushNotification } from "../hook/usePushNotification";

type Props = {
  navigation: RitualSetup3rdNavigationProp;
};

const RitualSetup3rdScreen = ({ navigation }: Props) => {
  const [userData, setUserData] = useState<User | null>(null)
  const { theme } = useTheme()

  const carouselImages = [
    require("../assets/example/example1.jpg"),
    require("../assets/example/example2.jpg"),
    require("../assets/example/example3.jpg"),
    require("../assets/example/example4.jpg"),
  ];

  const isUserDataValid = (data: User | null): boolean => {
    if (!data) return false;
    return (
      data.id !== undefined && data.nickname.length > 1 && data.morningRitual.activity.length > 1 && data.nightRitual.activity.length > 1
    );
  };


  const startHandler = async () => {
    if (isUserDataValid(userData)) {
      if (userData) {
        userData.setupDone = true;
        await saveUserData(userData)

        // 모닝 리추얼 알림 설정
        if (userData.morningRitual.isPushEnabled && userData.morningRitual.time) {
          await scheduleDailyPushNotification(userData.morningRitual.time, "morning", userData.morningRitual.activity);
        }

        // 나이트 리추얼 알림 설정
        if (userData.nightRitual.isPushEnabled && userData.nightRitual.time) {
          await scheduleDailyPushNotification(userData.nightRitual.time, "night", userData.nightRitual.activity);
        }

        navigation.navigate('Main');
      }
    } else {
      Alert.alert(
        "알림",
        "리추얼 양식을 완성하여주세요.",
      );
    }
  };


  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await getUserData()
        if (userData) {
          setUserData(userData)
        }
      } catch (error) {
        console.warn("Failed to load user data:", error);
        Alert.alert(
          "알림",
          "유저 데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.",
          [{ text: "확인" }]
        )
      }
    };

    loadUserData();
  }, []);

  return (
    <Layout>
      <Logo />
      <StepTitle mainTitle={"The Last Step"} subTitle="나의 ' 리추얼 ' 시작하기" />
      <StageBar stage={3} />
      <View style={styles.section}>
        <CircleSticker type="all" text="Well begun is half done." />
        <Text style={[styles.comment, { color: theme.TEXT }]}>
          단조롭고 무기력한 일상에서 벗어나 자신에게 맞는 리추얼을 찾아 작은 것부터 실천해보세요.
        </Text>
        <View style={styles.carouselContainer}>
          <Carousel images={carouselImages} />
        </View>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <CustomButton
          label="Prev"
          onPress={() => {
            navigation.navigate("RitualSetup2nd");
          }}
        />
        <CustomButton
          label="Start"
          theme="dark"
          onPress={startHandler}
        />
      </View>
    </Layout>
  );
};

export default RitualSetup3rdScreen;

const styles = StyleSheet.create({
  section: {
    marginHorizontal: 35,
    paddingTop: 50,
    paddingBottom: 30,
  },
  carouselContainer: {
    height: 260,
  },
  comment: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "200",
  },
});
