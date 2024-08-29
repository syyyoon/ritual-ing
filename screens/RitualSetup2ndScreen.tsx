import { Alert, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RitualSetup2ndNavigationProp } from "../types/navigation";
import { User } from "../types/user";
import Layout from "../components/Layout";
import Logo from "../components/Logo";
import StepTitle from "../components/StepTitle";
import CustomButton from "../components/CustomButton";
import StageBar from "../components/StageBar";
import SetupForm from "../components/SetupForm";
import { getUserData, saveUserData } from "../service/userDataService";

type Props = {
  navigation: RitualSetup2ndNavigationProp;

};

const RitualSetup2ndScreen = ({ navigation }: Props) => {

  const [activity, setActivity] = useState<string>("")
  const [time, setTime] = useState<string>("")


  const getTime = (time: string) => {
    setTime(time)
  }

  const saveAndNavigateHandler = async () => {
    try {
      const userData = await getUserData()
      if (userData) {
        userData.nightRitual = {
          activity,
          time,
        };

        await saveUserData(userData)
        navigation.navigate("RitualSetup3rd");
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
        if (userData?.nightRitual) {
          setActivity(userData.nightRitual.activity || "");
          setTime(userData.nightRitual.time || "");
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
      <StepTitle mainTitle={"2nd Step"} subTitle="나의 나이트 ' 리추얼 ' 설정하기" />
      <StageBar stage={2} />
      <SetupForm type="night" activity={activity} onChangeText={setActivity} onTimeChange={getTime} />
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


