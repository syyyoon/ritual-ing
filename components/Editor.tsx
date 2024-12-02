import {
  Alert,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "./CustomButton";
import ImageViewer from "./ImageViewer";
import RitualTypeSelector from "./RitualTypeSelector";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from '@expo/vector-icons/Entypo';
import Colors from "../constants/colors";
import ModalCalendar from "./ModalCalendar";
import { getCurrentDate } from "../utils/currentDate";
import { getRitualType } from "../utils/ritualType";
import { generateUniqueId } from "../utils/uniqueId";
import { RitualFormScreenNavigation } from "../types/navigation";
import { RitualData, RitualType } from "../types/ritual";
import { getRitualDataList, saveRitualDataList, deleteRitualData } from "../service/ritualDataService";
import FlexRowTexts from "./FlexRowTexts";
import CustomText from "./CustomText";
import { useTheme } from "../context/ThemeContext";

type Props = {
  image: string | null;
  isEdit: boolean;
  originData?: RitualData;
};

const Editor = ({ image, isEdit, originData }: Props) => {
  const [ritualData, setRitualData] = useState<RitualData>({
    id: generateUniqueId(),
    type: "morning",
    date: "",
    title: "",
    imageUrl: "",
    content: "",
    like: false
  });
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const navigation = useNavigation<RitualFormScreenNavigation>();
  const scrollViewRef = useRef<ScrollView>(null);
  const contentInputRef = useRef<TextInput>(null);
  const { theme } = useTheme()


  const handleTypeSelect = (type: RitualType) => {
    setRitualData((prevData) => ({ ...prevData, type }));
  };

  const handleChange = (field: string, value: string) => {
    setRitualData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const toggleLike = () => {
    setRitualData((prevData) => ({ ...prevData, like: !prevData.like }));
  };


  const saveRitualData = async () => {
    try {
      const ritualDataList = await getRitualDataList();

      if (!isEdit) {
        // 새로운 리추얼 데이터 추가
        const updatedRituals = [ritualData, ...ritualDataList];
        await saveRitualDataList(updatedRituals, "create");
      } else if (originData) {
        // 기존 리추얼 데이터 업데이트
        const updatedRituals = ritualDataList.map((ritual) => (ritual.id === originData.id ? ritualData : ritual));
        await saveRitualDataList(updatedRituals, "update");
      }
      navigation.navigate("List");
    } catch (e) {
      Alert.alert("알림", "리추얼 저장 중 오류가 발생했습니다.");
    }
  };

  const confirmDeleteRitualLog = async () => {
    Alert.alert(
      "삭제 확인",
      "이 리추얼 로그를 정말로 삭제하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "삭제",
          style: "destructive",
          onPress: async () => {
            try {
              if (originData) {
                deleteRitualData(originData.id);
                navigation.navigate("List")
              }
            } catch (error) {
              console.error("오류 발생:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    if (isEdit && originData) {
      setRitualData(originData);
    } else {
      setRitualData((prevData) => ({
        ...prevData,
        date: getCurrentDate("ENG"),
        type: getRitualType(),
        imageUrl: image ?? "",
      }));
    }
  }, [isEdit, originData, image]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      if (contentInputRef.current?.isFocused()) {
        contentInputRef.current.measure((fx, fy, width, height, px, py) => {
          scrollViewRef.current?.scrollTo({ y: py, animated: true });
        });
      }
    });

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} ref={scrollViewRef}>
        {/* <ScrollView> */}
        {/* 리추얼 타입 */}
        <FlexRowTexts
          first={<CustomText fontFamily="NotoSansKR_500Medium" style={styles.label}>Type</CustomText>}
          second={<RitualTypeSelector type={ritualData.type} onTypeSelect={handleTypeSelect} />}
          gap={5}
          style={styles.common}
        />
        {/* 날짜 + 모달 캘린더 */}
        <View style={{ flexDirection: "row", gap: 20, width: "95%" }}>
          <FlexRowTexts
            first={<CustomText fontFamily="NotoSansKR_500Medium" style={styles.label}>Date</CustomText>}
            second={<TextInput style={{ color: theme.TEXT }} placeholderTextColor={Colors.BORDER} value={ritualData.date} editable={false} />}
            third={<MaterialIcons name="calendar-month" size={20} onPress={() => setShowDatePicker(true)} color={theme.TEXT} />}
            gap={5}
            style={styles.common}
          />
        </View>
        <ModalCalendar
          visible={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          onSelectDate={(date) => handleChange("date", date)}
          selectedDate={ritualData.date}
        />
        {/* 타이틀 */}
        <FlexRowTexts
          first={<CustomText fontFamily="NotoSansKR_500Medium" style={styles.label}>Title</CustomText>}
          second={
            <TextInput
              style={[styles.title, { color: theme.TEXT }]}
              value={ritualData.title}
              onChangeText={(text) => handleChange("title", text)}
              placeholder="제목을 입력하세요"
              placeholderTextColor={Colors.BORDER}
            />
          }
          gap={5}
          style={styles.common}
        />

        {/* 이미지 */}
        <CustomText fontFamily="NotoSansKR_500Medium" style={[styles.label, { margin: 10 }]}>Image</CustomText>
        <View style={styles.imagePicker}>
          <ImageViewer selectedImage={isEdit && originData ? originData.imageUrl : image ?? undefined} />
        </View>

        {/* 컨텐츠 */}
        <View style={{ paddingVertical: 10 }}>
          <View style={{ flexDirection: "row", paddingVertical: 3 }}>
            <CustomText fontFamily="NotoSansKR_500Medium" style={styles.label}>Content</CustomText>
            {/* 좋아요 */}
            <Entypo
              style={{ marginRight: 10 }}
              name={ritualData.like ? "heart" : "heart-outlined"}
              size={20}
              color={ritualData.like ? "#f15b5b" : theme.TEXT}
              onPress={toggleLike}
            />
          </View>

          <TextInput
            ref={contentInputRef}
            value={ritualData.content}
            onChangeText={(content) => handleChange("content", content)}
            // style={styles.multilineTextInput}
            style={[styles.multilineTextInput, { color: theme.TEXT }]}
            placeholder="오늘을 기록해봐요 :-)"
            multiline={true}
            numberOfLines={10}
            placeholderTextColor={Colors.BORDER}
            onFocus={() => {
              contentInputRef.current?.measure((fx, fy, width, height, px, py) => {
                scrollViewRef.current?.scrollTo({ y: py, animated: true });
              });
            }}
          />
        </View>
        <View style={styles.buttonWrapper}>
          {originData && isEdit ? (
            <FlexRowTexts
              first={<CustomButton label="OK" theme="dark" onPress={saveRitualData} />}
              second={<CustomButton label="Delete" theme="light" onPress={confirmDeleteRitualLog} />}
              style={{ marginTop: 10, justifyContent: "space-between" }}
            />
          ) : (
            <CustomButton label="OK" theme="dark" onPress={saveRitualData} />
          )}
        </View>
        {/* </ScrollView> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Editor;

const styles = StyleSheet.create({

  scrollContainer: {
    padding: 10,
  },

  imagePicker: {
    alignItems: "center",
  },
  title: {
    width: "80%",
    borderColor: Colors.PRIMARY,
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 0,
    paddingHorizontal: 5,
    margin: 0,
    height: 40,
    // backgroundColor: "white",
    lineHeight: 20,
  },
  multilineTextInput: {
    minHeight: 95,
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    borderColor: Colors.PRIMARY,
    borderWidth: 2,
    borderRadius: 5,

  },
  label: {
    marginHorizontal: 10,
  },
  common: {
    paddingVertical: 8,
  },
  buttonWrapper: {
    alignItems: "center",
    marginBottom: 50
  },
});
