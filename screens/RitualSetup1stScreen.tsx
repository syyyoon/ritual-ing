import { Alert, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RitualSetup1stNavigationProp } from "../types/navigation";
import Logo from "../components/Logo";
import StepTitle from "../components/StepTitle";
import CustomButton from "../components/CustomButton";
import StageBar from "../components/StageBar";
import Layout from "../components/Layout";
import SetupForm from "../components/SetupForm";
import { getUserData, saveUserData } from "../service/userDataService";
import CustomCheckBox from "../components/CustomCheckBox";


type Props = {
  navigation: RitualSetup1stNavigationProp;
};

const RitualSetup1stScreen = ({ navigation }: Props) => {
  const [activity, setActivity] = useState<string>("")
  const [time, setTime] = useState<string>("")
  const [isPushEnabled, setIsPushEnabled] = useState<boolean>(false); // 알림 설정 상태


  const getTime = (time: string) => {
    setTime(time)
  }

  const saveAndNavigateHandler = async () => {
    try {
      const userData = await getUserData();
      if (userData) {
        // 리추얼 네이밍 2글자 이상 인지 확인 
        if (activity.trim().length < 2) {
          Alert.alert(
            "알림",
            "리추얼 네이밍을 두 글자 이상 입력해주세요.",
          );
          return;
        }
        //  푸시알림 동의와 시간 설정 여부  (체크박스에 체크했는데 시간 설정을 안했을 경우 알림)
        if (isPushEnabled && time === "" || isPushEnabled && time === "null") {
          Alert.alert(
            "알림",
            "푸시 알림을 받으려면 시간을 선택해야 합니다."
          );
          return;
        }
        // 양식 모두 완성된 경우 user data update
        userData.morningRitual = {
          activity,
          time,
          isPushEnabled
        };
        await saveUserData(userData);
        navigation.navigate("RitualSetup2nd");
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
    const loadUserData = async () => {
      try {
        // homeScreen에서 저장한 유저 데이터 (id,nickname,profileImageUrl)
        const userData = await getUserData();
        if (userData?.morningRitual) {
          console.log('moringRitual data 있으면 여기')
          setActivity(userData.morningRitual.activity || "");
          setTime(userData.morningRitual.time || "");
          setIsPushEnabled(userData.morningRitual.isPushEnabled)
        }
        console.log('user data 에 아직 morning ritual data 없음!')
      } catch (error) {
        console.warn("Failed to load user data:", error);
      }
    };
    loadUserData();
  }, []);

  return (
    <Layout>
      <Logo />
      <StepTitle mainTitle={"1st Step"} subTitle="나의 모닝 ' 리추얼 ' 설정하기" />
      <StageBar stage={1} />
      <SetupForm activity={activity} type="morning" onChangeText={setActivity} onTimeChange={getTime} />
      <CustomCheckBox onCheckChange={setIsPushEnabled} />


      <View style={{ alignItems: "center" }}>
        <CustomButton
          label="Next"
          size="large"
          onPress={saveAndNavigateHandler}
        />
      </View>
    </Layout>
  );
};

export default RitualSetup1stScreen;


