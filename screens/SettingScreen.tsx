import { Alert, Button, SafeAreaView, StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Colors from "../constants/colors";
import { logout, unlink } from "@react-native-kakao/user";
import CustomText from "../components/CustomText";
import SettingInfoBox from "../components/SettingInfoBox";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { removeUserData } from "../service/userDataService";
import InQuiryForm from "../components/InquiryForm";
import FlexRowTexts from "../components/FlexRowTexts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SettingScreenNavigation } from "../types/navigation";
import { useTheme } from "../context/ThemeContext";
import Layout from "../components/Layout";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { deleteAllRitualData } from "../service/ritualDataService";




type Props = {
  navigation: SettingScreenNavigation
}
const SettingScreen = ({ navigation }: Props) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();


  const handleKakaoLogout = () => {
    logout()
      .then(() => {
        navigation.reset({
          index: 0, routes: [{ name: "Home" }]
        })

      })
      .catch((error) => console.log(error));
  };


  const handleLogout = async () => {
    try {
      await removeUserData('user') // async storage에서 유저 데이터 삭제
      await unlink()  // 해당 앱 연결 끊기
      navigation.reset({
        index: 0, routes: [{ name: "Home" }]
      })
    } catch (error) {
      console.warn("Failed to remove user data:", error);
      Alert.alert(
        "알림",
        "계정 삭제가 실패하였습니다. 다시 시도해주세요.",
        [{ text: "OK" }]
      );
    }

  }


  const confirmLogout = () => {
    Alert.alert(
      "회원탈퇴",
      "회원 탈퇴 하시겠습니까?",
      [
        { text: "취소" },
        { text: "확인", onPress: handleLogout },
      ]
    );
  };

  const confirmDeleteHandler = () => {
    Alert.alert("전체삭제", "모든 리추얼 데이터를 삭제하시겠습니까?", [
      { text: "취소" },
      {
        text: "확인", onPress: async () => {
          await deleteAllRitualData();
          navigation.navigate("List");
        },
      }
    ])
  }


  return (
    <Layout>
      <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={150}>
        <View style={styles.mainSection}>
          <SettingInfoBox name="버전 정보" content="현재 버전 1.0" />
          <SettingInfoBox
            name="모드 변경"
            content={
              <View style={[styles.content, {
                backgroundColor: theme.FORM_BG,
                borderColor: Colors.BORDER,
              }]}>
                {isDarkMode ? (
                  <TouchableOpacity onPress={toggleTheme} style={styles.modeButton}>
                    <MaterialIcons name="dark-mode" size={24} color={Colors.PRIMARY} />
                    <CustomText fontFamily="NotoSansKR_400Regular">DARK</CustomText>
                  </TouchableOpacity>

                ) : (
                  <TouchableOpacity onPress={toggleTheme} style={styles.modeButton}>
                    <Ionicons name="sunny" size={25} color={Colors.PRIMARY} />
                    <CustomText fontFamily="NotoSansKR_400Regular">LIGHT</CustomText>
                  </TouchableOpacity>
                )}
              </View>
            }
          />
          <SettingInfoBox
            name="계정관리"
            content={
              <View style={[styles.content, {
                backgroundColor: theme.FORM_BG,
                borderColor: Colors.BORDER,
              }]}>
                <FlexRowTexts
                  gap={20}
                  first={<CustomText>가입일자</CustomText>}
                  second={<CustomText fontFamily="NotoSansKR_400Regular">2024.07.30</CustomText>}
                />
                <FlexRowTexts
                  gap={20}
                  first={<CustomText>가입방법</CustomText>}
                  second={<CustomText fontFamily="NotoSansKR_400Regular">카카오톡으로 가입</CustomText>}
                />
                <FlexRowTexts
                  gap={20}
                  first={<CustomText>아이디</CustomText>}
                  second={<CustomText fontFamily="NotoSansKR_400Regular">syyoon1022@google.com</CustomText>}
                />
                <FlexRowTexts
                  style={{ justifyContent: "flex-end", paddingTop: 10 }}
                  gap={20}
                  first={
                    <TouchableOpacity onPress={handleKakaoLogout}>
                      <CustomText>로그아웃</CustomText>
                    </TouchableOpacity>
                  }
                  second={
                    <TouchableOpacity onPress={confirmLogout}>
                      <CustomText>회원탈퇴</CustomText>
                    </TouchableOpacity>
                  }
                />
              </View>
            }
          />

          <SettingInfoBox name="1:1 문의" content={<InQuiryForm />} />
          <SettingInfoBox name="리추얼 삭제" content={<View style={[styles.content, {
            backgroundColor: theme.FORM_BG,
            borderColor: Colors.BORDER,
          }]}>

            <TouchableOpacity onPress={confirmDeleteHandler} style={styles.modeButton}>
              <FontAwesome5 name="trash" size={20} color={Colors.BORDER} />
              <CustomText fontFamily="NotoSansKR_400Regular">데이터 전체 삭제</CustomText>
            </TouchableOpacity>

          </View>} />
        </View>
      </KeyboardAwareScrollView>
    </Layout >
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  mainSection: {
    marginVertical: 20,
  },

  content: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 10,
  },

  modeButton: {
    paddingHorizontal: 10,
    flexDirection: "row",
    gap: 10,
  },
});
