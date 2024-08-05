import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import CustomButton from "./CustomButton";
import ImageViewer from "./ImageViewer";
import CustomText from "./CustomText";
import RitualTypeSelector from "./RitualTypeSelector";
import { formatDate } from "../utils/formatDate";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "../constants/colors";
import ModalCalendar from "./ModalCalendar";
import { getCurrentDate } from "../utils/currentDate";
import { ScrollView } from "react-native-gesture-handler";
import { getRitualType } from "../utils/ritualType";

type RitualType = "morning" | "night";

type RitualFormData = {
  type: RitualType;
  date: string;
  title: string;
  content: string;
  imgSrc: string;
};

type Props = {
  image: string | null;
  isEdit: boolean;
};

const Editor = ({ image, isEdit }: Props) => {
  console.log("img", image);
  // const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [ritualData, setRitualData] = useState<RitualFormData>({
    type: "morning",
    date: "",
    title: "",
    content: "",
    imgSrc: "",
  });
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const scrollViewRef = useRef<ScrollView>(null);
  const contentInputRef = useRef<TextInput>(null);

  useEffect(() => {
    setRitualData((prevData) => ({
      ...prevData,
      date: getCurrentDate(),
      type: getRitualType(),
    }));
    // setSelectedDate(getCurrentDate());
    // setRitualData((prevData) => ({ ...prevData, date: selectedDate }));
  }, []);

  const handleTypeSelect = (type: RitualType) => {
    setRitualData((prevData) => ({ ...prevData, type }));
  };

  const handleChange = (field: string, value: string) => {
    setRitualData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

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
          <ImageViewer selectedImage={image} />
        </View>

        {/* 컨텐츠 */}
        <View style={{ paddingVertical: 10 }}>
          <Text style={styles.label}>Content</Text>
          <TextInput
            ref={contentInputRef}
            onChangeText={(text) => handleChange("content", text)}
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
          <CustomButton
            label="OK"
            theme="dark"
            onPress={() => {
              console.log(ritualData);
            }}
            size="large"
          />
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
