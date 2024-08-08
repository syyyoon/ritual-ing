import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../type";
import IconButton from "../components/IconButton";
import ImageViewer from "../components/ImageViewer";
import Colors from "../constants/colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import EmojiPicker from "../components/EmojiPicker";
import EmojiList from "../components/EmojiList";
import DateEmoji from "../components/DateEmoji";
import { captureRef } from "react-native-view-shot";

const ImagePickerScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  // action box (사진 앨범에서 사진 선택 시 열리는 action icons)
  const [showActionOptions, setShowActionOptions] = useState<boolean>(false);
  // emoji modal
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  // pick date emoji
  const [pickedEmoji, setPickedEmoji] = useState<string | null>(null);

  const [selectedColor, setSelectedColor] = useState<string>("#ffff");

  const imageRef = useRef<View>(null);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "ImagePicker">>();

  // 이미지 앨범에서 pick
  const pickImage = async () => {
    const permissionMediaLibray = await MediaLibrary.requestPermissionsAsync();

    if (permissionMediaLibray.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        setShowActionOptions(true);
      } else {
        alert("선택한 사진이 없습니다.");
      }

      return result;
    }
  };

  // 사진촬영
  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    } else {
      const result = await ImagePicker.launchCameraAsync();

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        setShowActionOptions(true);
      }

      return result;
    }
  };

  //이미지 내 라이브러리에 저장
  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Successfully Saved!");
      }
    } catch (error) {
      alert("Failed! Try again.");
      console.log(error);
    }
  };

  // 처음으로 돌아가기
  const onReset = () => {
    setShowActionOptions(false);
    setImageUri(null);
    setPickedEmoji(null);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    // setIsModalVisible(false);
  };

  //
  const captureAndNavigate = async () => {
    if (imageRef.current) {
      try {
        const uri = await captureRef(imageRef.current, {
          format: "png",
          quality: 1,
        });
        console.log("uri", uri);
        navigation.navigate("RitualForm", { imageUri: uri });
      } catch (error) {
        console.error("Error capturing view:", error);
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View ref={imageRef} collapsable={false} style={{ position: "relative" }}>
        <ImageViewer selectedImage={imageUri} />
        {pickedEmoji && (
          <DateEmoji
            text={pickedEmoji}
            color={selectedColor}
            deleteEmoji={() => setPickedEmoji(null)}
            openModal={() => setIsModalVisible(true)}
          />
        )}
      </View>

      {showActionOptions ? (
        <View style={styles.buttonsContainer}>
          {/* 새로고침 */}
          <IconButton iconType="MaterialIcons" icon="refresh" onPress={onReset} />
          {/* 데이트 이모지 선택 */}
          <IconButton
            iconType="MaterialIcons"
            icon="auto-awesome"
            onPress={() => {
              setIsModalVisible(true);
            }}
          />
          <IconButton iconType="MaterialIcons" icon="download" onPress={onSaveImageAsync} />
          <IconButton iconType="MaterialIcons" icon="check" onPress={captureAndNavigate} />
        </View>
      ) : (
        <View style={styles.buttonsContainer}>
          <IconButton iconType="MaterialIcons" icon="add-a-photo" onPress={takePhoto} />
          <IconButton iconType="MaterialIcons" icon="photo-library" onPress={pickImage} />

          {/* skipt (사진 선택 x) */}
          <IconButton
            iconType="MaterialIcons"
            icon="skip-next"
            onPress={() => {
              navigation.navigate("RitualForm", { imageUri: null });
            }}
          />
        </View>
      )}

      <EmojiPicker
        // selectedColor={selectedColor}
        isVisible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
        }}
        onColorSelected={handleColorSelect}
      >
        <EmojiList onSelect={setPickedEmoji} pickedEmoji={pickedEmoji} selectedColor={selectedColor} />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
};

export default ImagePickerScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BACKGROUND_DARK,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonsContainer: {
    width: "100%",
    padding: 10,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
