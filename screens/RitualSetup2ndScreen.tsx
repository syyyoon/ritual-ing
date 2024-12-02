import { Alert, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RitualSetup2ndNavigationProp } from "../types/navigation";
import Layout from "../components/Layout";
import Logo from "../components/Logo";
import StepTitle from "../components/StepTitle";
import CustomButton from "../components/CustomButton";
import StageBar from "../components/StageBar";
import SetupForm from "../components/SetupForm";
import CustomCheckBox from "../components/CustomCheckBox";
import useUserStore from "../store/userStore";

type Props = {
  navigation: RitualSetup2ndNavigationProp;

};

const RitualSetup2ndScreen = ({ navigation }: Props) => {

  const [activity, setActivity] = useState<string>("")
  const [time, setTime] = useState<string>("")
  const [isPushEnabled, setIsPushEnabled] = useState<boolean>(false); // 알림 설정 상태
  const { userData, setUserData, loadUserData } = useUserStore()


  const getTime = (time: string) => {
    setTime(time)
  }

  const saveAndNavigateHandler = async () => {
    try {
      // const userData = await getUserData()
      if (userData) {
        if (activity.trim().length < 2) {
          Alert.alert(
            "알림",
            "리추얼 네이밍을 두 글자 이상 입력해주세요.",
          );
          return;
        }

        if (isPushEnabled && time === "" || isPushEnabled && time === "null") {
          Alert.alert(
            "알림",
            "푸시 알림을 받으려면 시간을 선택해야 합니다."
          );
          return;
        }

        userData.nightRitual = {
          activity,
          time,
          isPushEnabled
        };
        await setUserData(userData)
        navigation.navigate("RitualSetup3rd");
      }
    } catch (error) {
      console.warn("Failed to save user data:", error);
      Alert.alert(
        "알림",
        "유저 데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요."
      )
    }
  };

  useEffect(() => {
    const initializeUserData = async () => {
      try {
        // const userData = await getUserData();
        await loadUserData();
        if (userData?.nightRitual) {
          setActivity(userData.nightRitual.activity || "");
          setTime(userData.nightRitual.time || "");
          setIsPushEnabled(userData.nightRitual.isPushEnabled || false)
        }
      } catch (error) {
        console.warn("Failed to load user data:", error);
      }
    };
    initializeUserData();
  }, []);

  return (
    <Layout>
      <Logo />
      <StepTitle mainTitle={"2nd Step"} subTitle="나의 나이트 ' 리추얼 ' 설정하기" />
      <StageBar stage={2} />
      <SetupForm type="night" activity={activity} onChangeText={setActivity} onTimeChange={getTime} />

      <CustomCheckBox onCheckChange={setIsPushEnabled} />
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <CustomButton
          label="Prev"
          theme="light"
          onPress={() => {
            navigation.navigate("RitualSetup1st");
          }}
        />
        <CustomButton
          label="Next"
          theme="dark"
          onPress={saveAndNavigateHandler}
        />
      </View>
    </Layout>
  );
};

export default RitualSetup2ndScreen;


