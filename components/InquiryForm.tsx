import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../constants/colors";
import CustomText from "./CustomText";
import * as MailComposer from "expo-mail-composer";
import { useTheme } from "../context/ThemeContext";


const initialFormValue = {
  subject: "",
  body: "",
};
const InquiryForm = () => {
  const [formValue, setFormValue] = useState(initialFormValue);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [isCheckingAvailabilty, setIsCheckingAvailability] = useState<boolean>(true);

  const { theme } = useTheme();

  const sendMail = () => {
    if (formValue.subject.length > 0 && formValue.body.length > 0) {
      MailComposer.composeAsync({
        subject: formValue.subject,
        body: formValue.body,
        recipients: ["syyoon1022@gmail.com"],
      });
      setFormValue(initialFormValue);
    } else {
      Alert.alert("", "양식을 채워주세요.");
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormValue((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    async function checkAvailablility() {
      const isMailAvailable = await MailComposer.isAvailableAsync();
      setIsAvailable(isMailAvailable);
      setIsCheckingAvailability(false);
    }

    checkAvailablility();
  }, []);

  if (isCheckingAvailabilty) {
    return (
      <View style={styles.formContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!isAvailable) {
    return (
      <View style={[styles.formContainer, {
        backgroundColor: theme.FORM_BG,
        borderColor: Colors.BORDER,
      }]}>
        <Text style={styles.noticeText}>현재 이 디바이스에서는 이메일 전송이 불가능합니다.</Text>

        <CustomText fontSize={13}>
          - 디바이스에 기본 메일 앱이 설치되어있지 않은 경우에 해당됩니다. ( 예: iOS의 Mail 앱 )
        </CustomText>
        <CustomText fontSize={13}>
          - 디바이스 설정에서 기본 메일 앱이 비활성화되었거나 제한된 경우 해당됩니다.
        </CustomText>
      </View>
    );
  }

  return (
    <View style={[styles.formContainer, { backgroundColor: theme.FORM_BG, borderColor: Colors.BORDER, }]}>
      <CustomText>제목</CustomText>
      <TextInput
        autoFocus
        value={formValue.subject}
        onChangeText={(value) => handleChange("subject", value)}
        placeholder="문의 제목을 입력해주세요."
        placeholderTextColor={Colors.BORDER}
        style={styles.input}
      />

      <CustomText>내용</CustomText>
      <TextInput
        value={formValue.body}
        onChangeText={(value) => handleChange("body", value)}
        placeholder="문의할 내용을 입력해주세요."
        placeholderTextColor={Colors.BORDER}
        multiline={true}
        numberOfLines={10}
        style={styles.multilineText}
      />

      <TouchableOpacity onPress={sendMail} style={styles.buttonWrapper}>
        <CustomText>전송하기</CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default InquiryForm;

const styles = StyleSheet.create({
  formContainer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    gap: 10,
  },
  input: {
    borderColor: Colors.PRIMARY,
    borderWidth: 2,
    borderRadius: 5,
    // padding: 10,
    backgroundColor: "white",
    paddingVertical: 0,
    paddingHorizontal: 10,
    margin: 0,
    height: 40,
    lineHeight: 20,
  },
  multilineText: {
    height: 100,
    padding: 10,
    backgroundColor: "white",
    textAlignVertical: "top",
    borderColor: Colors.PRIMARY,
    borderWidth: 2,
    borderRadius: 5,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  noticeText: {
    color: "red",
    textAlign: "center",
  },
});
