import { Alert, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { captureRef } from "react-native-view-shot";
import { useNavigation } from "@react-navigation/native";
import { ImagePickerScreenNavigation } from "../types/navigation";
import IconButton from "../components/IconButton";
import ImageViewer from "../components/ImageViewer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import EmojiPicker from "../components/EmojiPicker";
import EmojiList from "../components/EmojiList";
import DateEmoji from "../components/DateEmoji";
import { useTheme } from "../context/ThemeContext";





const ImagePickerScreen = () => {
  const [showActionOptions, setShowActionOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [pickedEmoji, setPickedEmoji] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("#ffff");

  const imageRef = useRef<View>(null);
  const navigation = useNavigation<ImagePickerScreenNavigation>();
  const { theme } = useTheme();

  const imgDir = FileSystem.documentDirectory + 'images/';

  const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);

    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true })
    }
  }



  const pickImage = async () => {
    const permissionMediaLibray = await MediaLibrary.requestPermissionsAsync();

    console.log(permissionMediaLibray)

    if (permissionMediaLibray.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.75,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        setShowActionOptions(true);
      } else {
        Alert.alert("알림", "선택한 사진이 없습니다.");
      }

      return result;
    }
  };

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

  const saveImageToLibrary = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        Alert.alert("성공적으로 저장되었습니다!");
      }
    } catch (error) {
      alert("다시 시도해주세요.");
      console.log(error);
    }
  };

  const onReset = () => {
    setShowActionOptions(false);
    setImageUri(null);
    setPickedEmoji(null);
  };

  const colorSelectHandler = (color: string) => {
    setSelectedColor(color);
    setIsModalVisible(false);
  };

  const onEmojiSelected = (emoji: string) => {
    console.log('selected emoji:', emoji)
    setPickedEmoji(emoji)
  }


  const captureAndNavigate = async () => {
    if (imageRef.current) {
      console.log('ImageRef 있음!')
      try {
        let tempUri = await captureRef(imageRef.current, {
          format: "png",
          quality: 1,
        });
        if (tempUri) {
          console.log('teme uri!!')
          // 정상적으로 캡쳐된 경우에만 아래 작업 실행
          tempUri = 'file://' + tempUri
          const newUri = imgDir + `${Date.now()}.png`
          const fileInfo = await FileSystem.getInfoAsync(tempUri)
          if (!fileInfo.exists) {
            throw new Error("Temporary file does not exist.")
          }
          console.log('fileInfo')

          await FileSystem.copyAsync({
            from: tempUri,
            to: newUri,
          });
          console.log('COpy 성공')

          navigation.navigate("RitualForm", { imageUri: newUri });
        } else {
          console.warn("Capture failed: tempUri is null")
        }
      } catch (error) {
        console.error("Error capturing view:", error);
      }
    } else {
      console.warn("imageRef is null when attempting to capture.")
    }
  };

  useEffect(() => {
    console.log('useEffect 실행!')
    ensureDirExists()
  }, [])


  return (
    <GestureHandlerRootView style={[styles.container, { backgroundColor: theme.BACKGROUND }]}>
      <View ref={imageRef} collapsable={false} style={{ position: "relative" }}>

        <ImageViewer selectedImage={imageUri ?? undefined} />

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
          <IconButton iconType="MaterialIcons" icon="refresh" onPress={onReset} />
          <IconButton
            iconType="MaterialIcons"
            icon="auto-awesome"
            // onPress={captureAndNavigate}
            onPress={() => {
              setIsModalVisible(true);
            }}
          />
          <IconButton iconType="MaterialIcons" icon="download" onPress={saveImageToLibrary} />
          <IconButton iconType="MaterialIcons" icon="check" onPress={captureAndNavigate} />

        </View>
      ) : (
        <View style={styles.buttonsContainer}>
          <IconButton iconType="MaterialIcons" icon="add-a-photo" onPress={takePhoto} />
          <IconButton iconType="MaterialIcons" icon="photo-library" onPress={pickImage} />
          <IconButton
            iconType="MaterialIcons"
            icon="skip-next"
            onPress={() => {
              navigation.navigate("RitualForm", { imageUri: null });
            }}
          />
        </View>
      )}

      {/* <EmojiPicker
        isVisible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
        }}
        onColorSelected={colorSelectHandler}
      >
        <EmojiList onSelect={onEmojiSelected} pickedEmoji={pickedEmoji} selectedColor={selectedColor} />


      </EmojiPicker> */}
    </GestureHandlerRootView>
  );
};

export default ImagePickerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  buttonsContainer: {
    width: "100%",
    padding: 10,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
