import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "./CustomButton";
import ImageViewer from "./ImageViewer";
import RitualTypeSelector from "./RitualTypeSelector";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "../constants/colors";
import ModalCalendar from "./ModalCalendar";
import { getCurrentDate } from "../utils/currentDate";
import { ScrollView } from "react-native-gesture-handler";
import { getRitualType } from "../utils/ritualType";
import { generateUniqueId } from "../utils/uniqueId";
import { RitualFormScreenNavigation } from "../types/navigation";
import { RitualData, RitualType } from "../types/ritual";
import { getRitualDataList, saveRitualDataList, deleteRitualData } from "../service/ritualDataService";

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
  });
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const navigation = useNavigation<RitualFormScreenNavigation>();
  const scrollViewRef = useRef<ScrollView>(null);
  const contentInputRef = useRef<TextInput>(null);

  const handleTypeSelect = (type: RitualType) => {
    setRitualData((prevData) => ({ ...prevData, type }));
  };

  const handleChange = (field: string, value: string) => {
    setRitualData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const saveRitualData = async () => {
    try {
      const ritualDataList = await getRitualDataList();

      if (!isEdit) {
        // 새로운 리추얼 데이터 추가
        const updatedRituals = [ritualData, ...ritualDataList];
        await saveRitualDataList(updatedRituals);
      } else if (originData) {
        // 기존 리추얼 데이터 업데이트
        const updatedRituals = ritualDataList.map((ritual) => (ritual.id === originData.id ? ritualData : ritual));
        saveRitualDataList(updatedRituals);
      }
      navigation.navigate("List");
    } catch (e) {
      console.error("오류 발생:", e);
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
                Alert.alert("삭제 완료", "리추얼 데이터가 성공적으로 삭제되었습니다.", [
                  { text: "OK", onPress: () => navigation.navigate("List") },
                ]);
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
    }
  }, [isEdit, originData, image]);

  useEffect(() => {
    setRitualData((prevData) => ({
      ...prevData,
      date: getCurrentDate("ENG"),
      type: getRitualType(),
      imageUrl: image ?? "",
    }));
  }, [image]);

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
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} ref={scrollViewRef}>
        {/* 리추얼 타입 */}
        <View style={styles.common}>
          <Text style={styles.label}>Type</Text>
          <RitualTypeSelector type={ritualData.type} onTypeSelect={handleTypeSelect} />
        </View>
        {/* 날짜 + 모달 캘린더 */}
        <View style={styles.common}>
          <Text style={styles.label}>Date</Text>
          <TextInput placeholderTextColor={Colors.BORDER} value={ritualData.date} editable={false} />
          <MaterialIcons name="calendar-month" size={22} onPress={() => setShowDatePicker(true)} />
        </View>
        <ModalCalendar
          visible={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          onSelectDate={(date) => handleChange("date", date)}
          selectedDate={ritualData.date}
        />
        {/* 타이틀 */}
        <View style={styles.common}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.title}
            value={ritualData.title}
            onChangeText={(text) => handleChange("title", text)}
            placeholder="제목을 입력하세요"
            placeholderTextColor={Colors.BORDER}
          />
        </View>
        {/* 이미지 */}
        <Text style={[styles.label, { margin: 10 }]}>Image</Text>
        <View style={styles.imagePicker}>
          {/* DetailScreen에서는 originData.imageUrl이 selectedImage로 전달  */}
          {/* RitualFormScreen에서는 image 가 null 일경우(이미지 선택 없이 넘어온 경우) undefined 로 전달 */}
          <ImageViewer selectedImage={isEdit && originData ? originData.imageUrl : image ?? undefined} />
        </View>

        {/* 컨텐츠 */}
        <View style={{ paddingVertical: 10 }}>
          <Text style={styles.label}>Content</Text>
          <TextInput
            ref={contentInputRef}
            value={ritualData.content}
            onChangeText={(content) => handleChange("content", content)}
            style={styles.multilineTextInput}
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
            <View style={{ flexDirection: "row" }}>
              <CustomButton label="OK" theme="dark" onPress={saveRitualData} />
              <CustomButton label="Delete" theme="light" onPress={confirmDeleteRitualLog} />
            </View>
          ) : (
            <CustomButton label="OK" theme="dark" onPress={saveRitualData} size="large" />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Editor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  scrollContainer: {
    // padding: 20,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  selectedType: {
    opacity: 1,
  },
  imagePicker: {
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
  title: {
    width: "80%",
    borderColor: Colors.PRIMARY,
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
  },
  multilineTextInput: {
    height: 120,
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,

    backgroundColor: "white",
    textAlignVertical: "top",
    borderColor: Colors.PRIMARY,
    borderWidth: 2,
    borderRadius: 5,
  },
  label: {
    marginHorizontal: 10,
    fontWeight: "bold",
  },
  common: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 5,
  },
  buttonWrapper: {
    alignItems: "center",
  },
});
