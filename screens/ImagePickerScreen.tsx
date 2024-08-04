import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../type";
import IconButton from "../components/IconButton";
import ImageViewer from "../components/ImageViewer";

const ImagePickerScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "ImagePicker">>();

  const pickImage = async () => {
    const permissionMediaLibray = await MediaLibrary.requestPermissionsAsync();
    console.log("?", permissionMediaLibray.granted);

    if (permissionMediaLibray.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        setShowAppOptions(true);
        navigation.navigate("RitualForm", { imageUri: result.assets[0].uri });
      } else {
        alert("You did not select any image");
      }

      console.log("result", result);

      return result;
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    console.log("takephoto granted", permissionResult.granted);

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    } else {
      const result = await ImagePicker.launchCameraAsync();

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        setShowAppOptions(true);
        navigation.navigate("RitualForm", { imageUri: result.assets[0].uri });
      }

      console.log("result", result);
      return result;
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
    setImageUri(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.topBorder}></View> */}
      <ImageViewer selectedImage={imageUri} />
      {showAppOptions ? (
        <View style={styles.buttonsContainer}>
          <IconButton iconType="MaterialIcons" icon="refresh" onPress={onReset} />
        </View>
      ) : (
        <View style={styles.buttonsContainer}>
          <IconButton iconType="MaterialIcons" icon="add-a-photo" onPress={takePhoto} />
          <IconButton iconType="MaterialIcons" icon="photo-library" onPress={pickImage} />
          {/* skip icon */}
          <IconButton
            iconType="MaterialIcons"
            icon="skip-next"
            onPress={() => {
              navigation.navigate("RitualForm", { imageUri: null });
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ImagePickerScreen;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fdfbef",
    backgroundColor: "#474545",
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
