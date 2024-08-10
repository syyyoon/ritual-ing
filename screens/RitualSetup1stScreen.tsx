import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Logo from "../components/Logo";
import StepTitle from "../components/StepTitle";
import CircleSticker from "../components/CircleSticker";
import TimePicker from "../components/TimePicker";
import CustomButton from "../components/CustomButton";
import CustomCheckBox from "../components/CustomCheckBox";
import StageBar from "../components/StageBar";
import { RitualSetup1stNavigationProp } from "../types/navigation";

type Props = {
  navigation: RitualSetup1stNavigationProp;
};

const RitualSetup1stScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <StepTitle mainTitle={"1st Step"} subTitle="나의 모닝 ' 리추얼 ' 설정하기" />
      <StageBar stage={1} />
      <View style={styles.section}>
        <CircleSticker type="morning" text="Morning Ritual" />
        <Text style={styles.comment}>30분 일찍 일어나 나에게 집중하는 시간을 보내며 몸과 마음을 깨워보세요.</Text>
        <TextInput placeholder="예) 독서, 명상, 요가, 런닝 등" style={styles.inputStyle} />
        <View style={{ marginTop: 20 }}>
          <Text style={styles.comment}>모닝 리추얼 활동 시간을 정해보세요.</Text>
          <TimePicker time="morning" />
          <CustomCheckBox />
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <CustomButton
          label="Next"
          size="large"
          onPress={() => {
            navigation.navigate("RitualSetup2nd");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default RitualSetup1stScreen;

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
