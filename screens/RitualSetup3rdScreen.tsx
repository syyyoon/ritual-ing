import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Logo from "../components/Logo";
import StepTitle from "../components/StepTitle";
import CircleSticker from "../components/CircleSticker";
import CustomButton from "../components/CustomButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import StageBar from "../components/StageBar";
import Carousel from "../components/Carousel";
import { RootStackParamList } from "../type";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Main">;
};

const RitualSetup3rdScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <StepTitle mainTitle={"The Last Step"} subTitle="나의 ' 리추얼 ' 시작하기" />
      <StageBar stage={3} />
      <View style={styles.section}>
        <CircleSticker type="all" text="Well begun is half done." />
        <Text style={styles.comment}>
          단조롭고 무기력한 일상에서 벗어나 자신에게 맞는 리추얼을 찾아 작은 것부터 실천해보세요.
        </Text>
        {/* 예시 리추얼 활동 이미지 캐러셀로 보여주기 */}
        <View style={styles.carouselContainer}>
          <Carousel />
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
          onPress={() => {
            navigation.navigate("Main");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default RitualSetup3rdScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: {
    marginHorizontal: 35,
    paddingTop: 50,
    paddingBottom: 30,
  },
  carouselContainer: {
    marginTop: 20,
    height: 200,
  },
  comment: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "200",
  },
});
