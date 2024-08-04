import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import ImageViewer from "./ImageViewer";

import CircleSticker from "./CircleSticker";
import CustomText from "./CustomText";

type RitualFormData = {
  type: "morning" | "night";
  date: string;
  title: string;
  content: string;
  imgSrc: string;
};

type Props = {
  image: string | null;
};

const Editor = ({ image }: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<RitualFormData>({
    type: "morning",
    date: "",
    title: "",
    content: "",
    imgSrc: "",
  });

  return (
    <View style={styles.container}>
      <View style={styles.formBody}>
        <View style={[styles.flexRow, { paddingVertical: 10 }]}>
          <CustomText fontFamily="NotoSansKR_400Regular" style={{ marginHorizontal: 10 }}>
            Type
          </CustomText>
          <View style={[styles.flexRow, { gap: 20 }]}>
            <TouchableOpacity style={[styles.flexRow, { opacity: 0.5 }]}>
              <CircleSticker type="morning" />
              <CustomText>Morning</CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.flexRow, { opacity: 0.5 }]}>
              <CircleSticker type="night" />
              <CustomText>Night</CustomText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.flexRow, { paddingVertical: 10 }]}>
          <CustomText fontFamily="NotoSansKR_500Medium" style={{ marginHorizontal: 10 }}>
            Date
          </CustomText>
          <TextInput placeholder="날짜를 입력하세요" placeholderTextColor="#4a4747" />
        </View>
        <View style={[styles.flexRow, { paddingVertical: 10 }]}>
          <CustomText fontFamily="NotoSansKR_500Medium" style={{ marginHorizontal: 10 }}>
            Title
          </CustomText>
          <TextInput placeholder="제목을 입력하세요" placeholderTextColor="#4a4747" />
        </View>

        <CustomText fontFamily="NotoSansKR_500Medium" style={{ margin: 10 }}>
          Image
        </CustomText>
        <View style={styles.imagePicker}>
          <ImageViewer selectedImage={image} />
        </View>
        <View style={{ paddingVertical: 10 }}>
          <CustomText fontFamily="NotoSansKR_500Medium" style={{ marginHorizontal: 10 }}>
            Content
          </CustomText>
          <TextInput
            style={styles.multilineTextInput}
            placeholder="오늘을 기록해봐요 :-)"
            multiline={true}
            numberOfLines={10}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <CustomButton label="Create" theme="dark" onPress={() => {}} size="large" />
        </View>
      </View>
    </View>
  );
};

export default Editor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    // backgroundColor: "skyblue",
    paddingHorizontal: 20,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  formBody: {
    // borderWidth: 1,
  },
  imagePicker: {
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
  multilineTextInput: {
    height: 120,
    marginVertical: 10,
    padding: 10,
    backgroundColor: "white",
    textAlignVertical: "top",
  },
});
