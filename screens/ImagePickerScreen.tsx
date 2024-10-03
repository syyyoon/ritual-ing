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
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [showActionOptions, setShowActionOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
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


  // const checkFileExists = async (fileUri: string) => {
  //   const fileInfo = await FileSystem.getInfoAsync(fileUri);
  //   console.log("File exists:", fileInfo.exists);
  // };

  const pickImage = async () => {
    const permissionMediaLibray = await MediaLibrary.requestPermissionsAsync();

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


  const copyImageFile = async (sourceUri: string, destinationUri: string) => {
    try {
      const response = await fetch(sourceUri);
      const fileBlob = await response.blob();
      // console.log('blob', fileBlob)

      const reader = new FileReader();
      reader.onloadend = async () => {
        // fileBlob을 읽어낸 결과
        const base64data = reader.result as string;

        // 그 결과를 비동기로 destinationUri에 쓰는 작업을 수행
        await FileSystem.writeAsStringAsync(destinationUri, base64data, {
          encoding: FileSystem.EncodingType.Base64,
        });

        console.log("파일이 성공적으로 복사되었습니다.");
      };
      reader.readAsDataURL(fileBlob);
    } catch (error) {
      console.error("파일 복사 중 오류 발생:", error);
    }
  };



  const captureAndNavigate = async () => {
    if (imageRef.current) {
      // console.log(imageRef.current)
      try {

        // 스티커가 적용된 사진이기 때문에 캡쳐할 필요가 있는거구나
        let tempUri = await captureRef(imageRef.current, {
          format: "png",
          quality: 1,
        });

        tempUri = 'file://' + tempUri
        const newUri = imgDir + `${Date.now()}.png`
        const fileInfo = await FileSystem.getInfoAsync(tempUri)
        if (!fileInfo.exists) {
          throw new Error("Temporary file does not exist.")
        } else {
          console.log('file size:', fileInfo.size)
        }

        await FileSystem.copyAsync({
          from: tempUri,
          to: newUri,
        });

        console.log('newUri', newUri)



        // 복사가 성공하면 원본 파일 삭제
        // await FileSystem.deleteAsync(tempUri);

        //  위 작업이 성공할경우 리추얼폼 스크린으로 이동
        navigation.navigate("RitualForm", { imageUri: newUri });
      } catch (error) {
        console.error("Error capturing view:", error);
      }
    }
  };

  useEffect(() => {
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
          {/* <IconButton
            iconType="MaterialIcons"
            icon="auto-awesome"
            onPress={() => {
              setIsModalVisible(true);
            }}
          /> */}
          <IconButton iconType="MaterialIcons" icon="download" onPress={saveImageToLibrary} />
          {/* <IconButton iconType="MaterialIcons" icon="check" onPress={captureAndNavigate} /> */}
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

      <EmojiPicker
        isVisible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
        }}
        onColorSelected={colorSelectHandler}
      >
        <EmojiList onSelect={setPickedEmoji} pickedEmoji={pickedEmoji} selectedColor={selectedColor} />
      </EmojiPicker>
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
