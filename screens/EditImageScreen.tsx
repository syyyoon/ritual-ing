import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import Layout from "../components/Layout";
import { EditImageScreenNavigation, EditImageScreenRouteProp } from "../types/navigation";
import ImageViewer from "../components/ImageViewer";
import DateEmoji from "../components/DateEmoji";
import * as FileSystem from "expo-file-system";
import { captureRef } from "react-native-view-shot";
import { useNavigation } from "@react-navigation/native";

import { useEffect, useRef, useState } from "react";
import EmojiPicker from "../components/EmojiPicker";
import EmojiList from "../components/EmojiList";
import IconButton from "../components/IconButton";

const EditImageScreen = () => {
  const route = useRoute<EditImageScreenRouteProp>();
  const { imageUri } = route.params;

  const [pickedEmoji, setPickedEmoji] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("#ffff");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const imageRef = useRef<View>(null);
  const navigation = useNavigation<EditImageScreenNavigation>();

  const imgDir = FileSystem.documentDirectory + "images/";

  const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);

    if (!dirInfo.exists) {
      console.log("img dirctory does not exist, creating... ");
      await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
    }
  };

  const onEmojiSelected = (emoji: string) => {
    setPickedEmoji(emoji);
  };

  const colorSelectHandler = (color: string) => {
    setSelectedColor(color);
    setTimeout(() => {
      setIsModalVisible(false);
    }, 1000);
  };

  const resetEmojiSelection = () => {
    setIsModalVisible(true);
    setPickedEmoji(null);
  };
  const navigateNextStep = async () => {
    if (imageRef.current) {
      try {
        let tempUri = await captureRef(imageRef.current, {
          format: "png",
          quality: 1,
        });
        if (tempUri) {
          tempUri = "file://" + tempUri;
          const newUri = imgDir + `${Date.now()}.png`;
          const fileInfo = await FileSystem.getInfoAsync(tempUri);
          if (!fileInfo.exists) {
            throw new Error("Temporary file does not exist.");
          }

          await FileSystem.copyAsync({
            from: tempUri,
            to: newUri,
          });
          navigation.navigate("RitualForm", { imageUri: newUri });
        } else {
          console.warn("Capture failed: tempUri is null");
        }
      } catch (error) {
        console.error("Error capturing view:", error);
      }
    } else {
      console.warn("imageRef is null when attempting to capture.");
    }
  };

  useEffect(() => {
    ensureDirExists();
  }, []);

  return (
    <Layout>
      <View style={styles.container}>
        <View ref={imageRef}>{imageUri && <ImageViewer selectedImage={imageUri} />}</View>
        {pickedEmoji && (
          <DateEmoji
            text={pickedEmoji}
            color={selectedColor}
            deleteEmoji={() => setPickedEmoji(null)}
            openModal={() => setIsModalVisible(true)}
          />
        )}
        <View style={styles.buttonsContainer}>
          <IconButton iconType="MaterialIcons" icon="refresh" onPress={() => {}} />

          <IconButton iconType="MaterialIcons" icon="auto-awesome" onPress={resetEmojiSelection} />
          <IconButton iconType="MaterialIcons" icon="keyboard-arrow-right" onPress={navigateNextStep} />
        </View>

        <EmojiPicker
          isVisible={isModalVisible}
          onClose={() => {
            setIsModalVisible(false);
          }}
          onColorSelected={colorSelectHandler}
        >
          <EmojiList onSelect={onEmojiSelected} pickedEmoji={pickedEmoji} selectedColor={selectedColor} />
        </EmojiPicker>
      </View>
    </Layout>
  );
};

export default EditImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "25%",
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
