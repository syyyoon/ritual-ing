import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Colors from "../constants/colors";
import { login, logout, unlink, me } from "@react-native-kakao/user";
import CustomText from "../components/CustomText";
import SettingInfoBox from "../components/SettingInfoBox";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import InQuiryForm from "../components/InquiryForm";
import FlexRowTexts from "../components/FlexRowTexts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SettingScreenNavigation } from "../types/navigation";
import { useTheme } from "../context/ThemeContext";
import Layout from "../components/Layout";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { deleteAllRitualData } from "../service/ritualDataService";
import { cancelAllScheduledNotifications, getScheduledNotifications, scheduleDailyPushNotification } from "../hook/usePushNotification";
import CustomToggleButton from "../components/CustomToggleButton";
import useUserStore from "../store/userStore";





type Push = {
  morning: boolean,
  night: boolean
}
type Props = {
  navigation: SettingScreenNavigation
}
const SettingScreen = ({ navigation }: Props) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  const { userData, setUserData, clearUserData } = useUserStore();

  // 초기 알림 상태를 userData로부터 설정
  const initialPushState = {
    morning: userData?.morningRitual?.isPushEnabled ?? false,
    night: userData?.nightRitual?.isPushEnabled ?? false,
  };

  const [isActivePush, setIsActivePush] = useState<Push>(initialPushState);

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
      await cancelAllScheduledNotifications(); // 설정된 푸시 기능 초기화
      await deleteAllRitualData(); // 리추얼 데이터 전체 삭제
      await clearUserData();
      // await removeUserData("user"); // async storage에서 유저 데이터 삭제

      await unlink(); // 카카오 연결 해제
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (error) {
      console.warn("Failed to remove user data:", error);
      Alert.alert("알림", "계정 삭제가 실패하였습니다. 다시 시도해주세요.", [{ text: "OK" }]);
    }
  };
  // const handleLogout = async () => {
  //   try {
  //     await cancelAllScheduledNotifications() // 설정된 푸시 기능 초기화
  //     await deleteAllRitualData() // 리추얼 데이터 전체 삭제
  //     await removeUserData('user') // async storage에서 유저 데이터 삭제

  //     try {
  //       const userInfo = await me();
  //       if (!userInfo) {
  //         await getScheduledNotifications()
  //         await login();// 세션 만료로 유저 정보가 없으면 재로그인 시도
  //       }
  //     } catch (error) {
  //       console.warn("Failed to get user info:", error);
  //       await login();
  //     }
  //     await unlink()  // 카카오 연결 해제

  //     navigation.reset({
  //       index: 0, routes: [{ name: "Home" }]
  //     })
  //   } catch (error) {
  //     console.warn("Failed to remove user data:", error);
  //     Alert.alert(
  //       "알림",
  //       "계정 삭제가 실패하였습니다. 다시 시도해주세요.",
  //       [{ text: "OK" }]
  //     );
  //   }

  // }


  const handleMemberWithdrow = () => {
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




  // const toggleNotification = (type: "morning" | "night", value: boolean) => {
  //   setIsActivePush((prevState) => ({ ...prevState, [type]: value }));

  //   setUserData((prevData) => {
  //     if (!prevData) return null;

  //     const updatedData = {
  //       ...prevData,
  //       [`${type}Ritual`]: {
  //         ...prevData[`${type}Ritual`],
  //         isPushEnabled: value,
  //       },
  //     };

  //     console.log('??', updatedData)

  //     // TODO: 필요 시 서비스나 스토리지에 업데이트된 데이터 저장
  //     // updateUserData(updatedData); // 예시: async 저장 함수 호출

  //     return updatedData;
  //   });
  // };


  const toggleNotification = async (type: "morning" | "night", value: boolean) => {
    setIsActivePush((prevState) => ({ ...prevState, [type]: value }));
    const updatedUserData = {
      ...userData,
      [`${type}Ritual`]: {
        ...userData?.[`${type}Ritual`],
        isPushEnabled: value,
        time: userData?.[`${type}Ritual`]?.time ?? (type === "morning" ? "0700" : "2200"),
      },
    };

    setUserData(updatedUserData);


    // setUserData((prevData) => {
    //   if (!prevData) return null;

    //   const existingTime = prevData[`${type}Ritual`]?.time;
    //   const time = existingTime ? existingTime : type === "morning" ? "0700" : "2200";


    //   const hour = parseInt(time.slice(0, 2), 10);
    //   const minute = parseInt(time.slice(2, 4), 10);

    //   console.log(hour, minute)

    //   const updatedData = {
    //     ...prevData,
    //     [`${type}Ritual`]: {
    //       ...prevData[`${type}Ritual`],
    //       isPushEnabled: value,
    //       time: time, // 시간을 설정
    //     },
    //   };
    //   saveUserData(updatedData);
    //   getScheduledNotifications()
    //   return updatedData;
    // });
  };


  // const fetchUserData = React.useCallback(async () => {
  //   try {
  //     // 사용자 데이터를 가져와서 상태를 업데이트
  //     const fetchedUserData = await getUserData();

  //     setUserData(fetchedUserData);
  //     setIsActivePush({
  //       morning: fetchedUserData?.morningRitual?.isPushEnabled ?? false,
  //       night: fetchedUserData?.nightRitual?.isPushEnabled ?? false,
  //     });
  //   } catch (error) {
  //     console.warn("Failed to fetch user data:", error);
  //   }
  // }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     fetchUserData();
  //   }, [fetchUserData])
  // );

  return (
    <Layout>
      <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={150}>
        <View style={styles.mainSection}>
          {/* <SettingInfoBox
            name="앱 정보"
            content={
              <View style={[styles.content, {
                backgroundColor: theme.FORM_BG,
                borderColor: Colors.BORDER,
              }]}>
                <FlexRowTexts
                  gap={20}
                  first={<CustomText>앱 이름</CustomText>}
                  second={<CustomText fontFamily="NotoSansKR_400Regular">Ritual +ing</CustomText>}
                />
                <FlexRowTexts
                  gap={20}
                  first={<CustomText>앱 버전</CustomText>}
                  second={<CustomText fontFamily="NotoSansKR_400Regular">1.0</CustomText>}
                />
                <FlexRowTexts
                  gap={20}
                  first={<CustomText>개발자</CustomText>}
                  second={<CustomText fontFamily="NotoSansKR_400Regular">YOONCOMOU</CustomText>}
                />

              </View>
            }
          /> */}
          <SettingInfoBox name="앱" content="Ritual +ing" />
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
                  first={<CustomText>닉네임</CustomText>}
                  second={<CustomText fontFamily="NotoSansKR_400Regular">{userData?.nickname}</CustomText>}
                />
                <FlexRowTexts
                  gap={20}
                  first={<CustomText>가입방법</CustomText>}
                  second={<CustomText fontFamily="NotoSansKR_400Regular">카카오톡으로 가입</CustomText>}
                />
                <FlexRowTexts
                  gap={20}
                  first={<CustomText>카카오 아이디</CustomText>}
                  second={<CustomText fontFamily="NotoSansKR_400Regular">{userData?.id}</CustomText>}
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
                    <TouchableOpacity onPress={handleMemberWithdrow}>
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
          <SettingInfoBox name="리추얼 알림 푸쉬" content={<View style={[styles.content, {
            backgroundColor: theme.FORM_BG,
            borderColor: Colors.BORDER,
          }]}>
            <FlexRowTexts first={<CustomToggleButton
              text={`모닝 ${isActivePush.morning ? "ON  " : "OFF"}`}
              isActive={isActivePush.morning}
              onChange={(value) => toggleNotification("morning", value)}
            />} second={<CustomToggleButton
              text={`나이트 ${isActivePush.night ? "ON  " : "OFF"}`}
              isActive={isActivePush.night}
              onChange={(value) => toggleNotification("night", value)}
            />}
              style={{ justifyContent: 'space-evenly' }} />
            <CustomText fontSize={12} style={{ marginLeft: 5 }}> - 알림 시간 변경 은 'Profile' 에서 변경 가능합니다.</CustomText>
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
