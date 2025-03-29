import { Alert, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import CircleSticker from "./CircleSticker";
import FlexRowTexts from "./FlexRowTexts";
import CustomText from "./CustomText";
import IconButton from "./IconButton";
import useUserStore from "../store/userStore";
import { RitualType } from "../types/ritual";
import { useTheme } from "../context/ThemeContext";
import CustomButton from "./CustomButton";
import Dropdown from "./DropDown";
import { formattedMorningTimes, formattedNightTimes } from "../utils/timeList";
import { scheduleDailyPushNotification } from "../hook/usePushNotification";
import Colors from "../constants/colors";

type Props = {
  type: "morning" | "night";
  qty: number;
};
type AlertType = {
  type: "success" | "info" | "error";
  text: string;
};

const UserRitualDataForm = ({ type, qty }: Props) => {
  const { userData, setUserData } = useUserStore();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<AlertType>({ type: "info", text: "" });
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { theme } = useTheme();

  // 공통 데이터 설정
  const ritualData = type === "morning" ? userData.morningRitual : userData.nightRitual;
  const ritualName = type === "morning" ? "모닝" : "나이트";
  const stickerText = type === "morning" ? "Morning Ritual" : "Night Ritual";

  // const handleTimeChange = (time: string) => {
  //     console.log('handeTimeChange', time)
  //     setSelectedTime(time)
  // }

  const handleOkButtonPress = async () => {
    // if (!userData) {
    //     setMessage({ type: "error", text: "사용자 데이터를 찾을 수 없습니다." });
    //     return;
    // };

    // 사용자가 시간을 선택하지 않은 경우 처리
    if (!userData || !selectedTime) {
      console.log("사용자가 시간을 선택하지 않았음!");
      setMessage({ type: "info", text: "선택한 값이 없습니다." });
      hideMessage();
      return;
    }

    if (selectedTime === ritualData.time) {
      setMessage({ type: "info", text: "기존에 설정했던 시간과 동일합니다." });
      hideMessage();
      return;
    }

    // 유저 데이터 업데이트
    const updatedUserData = {
      ...userData,
      [`${type}Ritual`]: {
        ...userData[`${type}Ritual`],
        time: selectedTime,
      },
    };

    setUserData(updatedUserData); // 시간 설정 업데이트

    // 알림 예약 처리
    if (ritualData.isPushEnabled) {
      // 푸시 기능 on
      const notificationId = await scheduleDailyPushNotification(selectedTime, type, ritualData.activity);
      const updatedUserDataWithNotification = {
        ...updatedUserData,
        [`${type}Ritual`]: {
          ...updatedUserData[`${type}Ritual`],
          notificationId, // 알림 ID 업데이트
        },
      };
      setUserData(updatedUserDataWithNotification); // 유저 데이터 업데이트
      setMessage({ type: "success", text: "시간 설정이 성공적으로 변경되었습니다!" }); // 성공 메시지
    } else {
      setMessage({ type: "success", text: " 설정 > 푸쉬 기능 ON으로 바꾸어 리추얼 알림을 받아보세요!" }); // 성공 메시지
    }

    hideMessage();
    setSelectedTime(null); // 선택값 초기화
    setModalVisible(false); // 모달 닫기
  };

  const modalHandler = () => {
    setModalVisible(false);
  };

  // 메시지를 일정 시간 후에 숨기는 함수
  const hideMessage = () => {
    setTimeout(() => {
      setMessage({ type: "info", text: "" });
    }, 5000); // 3초 후에 메시지를 숨김
  };

  return (
    <View style={styles.section}>
      <CircleSticker type={type} text={stickerText} />
      <View style={styles.marginLeft}>
        <FlexRowTexts
          gap={10}
          first={<CustomText> ◦ 나의 {ritualName} 리추얼 :</CustomText>}
          second={<CustomText>{ritualData.activity}</CustomText>}
        />
        <CustomText> ◦ 리추얼 달성 : {qty} days</CustomText>
        <FlexRowTexts
          gap={5}
          first={<CustomText> ◦ 리추얼 시간 : </CustomText>}
          second={
            <CustomText>
              {" "}
              {ritualData.time
                ? `${ritualData.time.slice(0, 2)}시 ${ritualData.time.slice(2, 4)}분`
                : "설정한 데이터 없음"}
            </CustomText>
          }
          // 설정 아이콘 클릭 시 time picker open
          third={
            <TouchableOpacity>
              <IconButton
                iconType="MaterialIcons"
                icon="settings"
                onPress={() => {
                  setModalVisible(true);
                }}
                size="small"
              />
            </TouchableOpacity>
          }
        />

        {/* 타임피커 표시 */}
        <Modal visible={isModalVisible} transparent={true} animationType="slide" onRequestClose={modalHandler}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: theme.BACKGROUND }]}>
              <Text style={[styles.modalTitle, { color: theme.TEXT }]}>{ritualName} 리추얼 시간 설정</Text>
              <View
                style={{
                  paddingTop: 10,
                  alignItems: "center",
                }}
              >
                <Dropdown
                  data={type === "morning" ? formattedMorningTimes : formattedNightTimes}
                  // onChange={(item) => { handleTimeChange(item.value) }}
                  onChange={(item) => {
                    setSelectedTime(item.value);
                  }}
                  placeholder="시간을 선택하세요"
                />
              </View>

              {/* 메시지 안내 추가 */}
              <View style={{ height: 43 }}>
                {message.type === "info" && (
                  <Text style={[styles.message, { marginVertical: 10 }]}>{message.text}</Text>
                )}
              </View>

              <CustomButton label="OK" theme="dark" size="small" onPress={handleOkButtonPress} />
            </View>
          </View>
        </Modal>
      </View>
      {message.type === "success" && (
        <Text style={[styles.message, { padding: 5, fontSize: 13, textAlign: "center" }]}>{message.text}</Text>
      )}
    </View>
  );
};

export default UserRitualDataForm;

const styles = StyleSheet.create({
  section: {
    paddingTop: 5,
    minHeight: 130,
  },
  marginLeft: {
    marginLeft: 25,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 16,
  },
  message: {
    color: "tomato",
  },
});
