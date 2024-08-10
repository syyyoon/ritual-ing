import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Logo from "../components/Logo";
import StepTitle from "../components/StepTitle";
import CircleSticker from "../components/CircleSticker";
import TimePicker from "../components/TimePicker";
import CustomButton from "../components/CustomButton";
import CustomCheckBox from "../components/CustomCheckBox";
import StageBar from "../components/StageBar";
import { RitualSetup2ndNavigationProp } from "../types/navigation";

type Props = {
  navigation: RitualSetup2ndNavigationProp;
};

const RitualSetup2ndScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <StepTitle mainTitle={"2nd Step"} subTitle="나의 나이트 ' 리추얼 ' 설정하기" />
      <StageBar stage={2} />
      <View style={styles.section}>
        <CircleSticker type="night" text="Night Ritual" />
        <Text style={styles.comment}>
          자기 전 내일의 걱정, 미래의 불안 대신 긍정적 에너지로 채우며 잠들 준비해 보세요.
        </Text>
        <TextInput placeholder="예) 산책, 일기, 독서, 홈트 등" style={styles.inputStyle} />
        <View style={{ marginTop: 20 }}>
          <Text style={styles.comment}>나이트 리추얼 활동 시간을 정해보세요.</Text>
          <TimePicker time="afternoon" />
          <CustomCheckBox />
        </View>
      </View>
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
          onPress={() => {
            navigation.navigate("RitualSetup3rd");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default RitualSetup2ndScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: {
    marginHorizontal: 35,
    paddingTop: 50,
    paddingBottom: 30,
  },
  comment: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "200",
  },
  inputStyle: {
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
});
