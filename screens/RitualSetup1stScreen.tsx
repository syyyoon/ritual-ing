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


type Props = {
  navigation: RitualSetup1stNavigationProp;
};

const RitualSetup1stScreen = ({ navigation }: Props) => {
  const [activity, setActivity] = useState<string>("")
  const [time, setTime] = useState<string>("")

  const getTime = (time: string) => {
    setTime(time)
  }

  const saveAndNavigateHandler = async () => {
    try {
      const userData = await getUserData();
      if (userData) {
        userData.morningRitual = {
          activity,
          time,
        };
        await saveUserData(userData);
        navigation.navigate("RitualSetup2nd");
      }
    } catch (error) {
      console.warn("Failed to save user data:", error);
      Alert.alert(
        "알림",
        "유저 데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.",
        [{ text: "확인" }]
      )
    }
  };


  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await getUserData();
        if (userData?.morningRitual) {
          setActivity(userData.morningRitual.activity || "");
          setTime(userData.morningRitual.time || "");
        }
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


