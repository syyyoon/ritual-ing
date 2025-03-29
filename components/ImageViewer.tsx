import React from "react";
import { Image, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import * as FileSystem from "expo-file-system";

type Props = {
  selectedImage: string | undefined;
};

const ImageViewer = React.memo(({ selectedImage }: Props) => {
  const { theme } = useTheme();

  if (!selectedImage) {
    return (
      <Image
        source={require("../assets/default.png")}
        style={[styles.image, { backgroundColor: theme.DEFAULT_IMG_BG }]}
      />
    );
  } else {
    return (
      <Image
        resizeMethod="auto"
        source={{ uri: FileSystem.documentDirectory + `${selectedImage}` }}
        style={styles.image}
      />
    );
  }
});

export default ImageViewer;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.0,
  },
});
