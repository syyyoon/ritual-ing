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
import { scheduleDailyPushNotification } from "../hook/usePushNotification";
import useUserStore from "../store/userStore";

type Props = {
  navigation: RitualSetup3rdNavigationProp;
};

const RitualSetup3rdScreen = ({ navigation }: Props) => {
  const { theme } = useTheme();
  const { userData, setUserData, loadUserData } = useUserStore();

  const carouselImages = [
    require("../assets/example/example5.jpg"),
    require("../assets/example/example6.jpg"),
    require("../assets/example/example7.jpg"),
  ];

  const isUserDataValid = (data: User | null): boolean => {
    if (!data) return false;
    return (
      data.id !== undefined &&
      data.nickname.length > 1 &&
      data.morningRitual.activity.length > 1 &&
      data.nightRitual.activity.length > 1
    );
  };

  const startHandler = async () => {
    if (isUserDataValid(userData)) {
      if (userData) {
        userData.setupDone = true;

        // 모닝 리추얼 알림 설정
        if (userData.morningRitual.isPushEnabled && userData.morningRitual.time) {
          const notificationId = await scheduleDailyPushNotification(
            userData.morningRitual.time,
            "morning",
            userData.morningRitual.activity
          );
          if (notificationId) {
            userData.morningRitual.notificationId = notificationId;
          } else {
            userData.morningRitual.notificationId = "";
          }
        }

        // 나이트 리추얼 알림 설정
        if (userData.nightRitual.isPushEnabled && userData.nightRitual.time) {
          const notificationId = await scheduleDailyPushNotification(
            userData.nightRitual.time,
            "night",
            userData.nightRitual.activity
          );
          if (notificationId) {
            userData.nightRitual.notificationId = notificationId;
          } else {
            userData.nightRitual.notificationId = "";
          }
        }

        await setUserData(userData);
        navigation.navigate("Main");
      }
    } else {
      Alert.alert("알림", "리추얼 양식을 완성하여주세요.");
    }
  };

  useEffect(() => {
    const initializeUserData = async () => {
      try {
        await loadUserData();
      } catch (error) {
        console.warn("Failed to load user data:", error);
        Alert.alert("알림", "유저 데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.", [{ text: "확인" }]);
      }
    };

    initializeUserData();
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
        <CustomButton label="Start" theme="dark" onPress={startHandler} />
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
