import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import DateEmoji from "./DateEmoji";


type Props = {
  selectedImage: string | undefined;
};



const ImageViewer = React.memo(({ selectedImage }: Props) => {
  const { theme } = useTheme()

  if (!selectedImage) {
    return (
      <Image source={require("../assets/default.png")} style={[styles.image, { backgroundColor: theme.DEFAULT_IMG_BG }]} />
    );
  } else {
    return (
      <Image source={{ uri: selectedImage }} style={styles.image} />
    )
  }
});

export default ImageViewer;

const styles = StyleSheet.create({
  image: {
    width: "95%",
    height: undefined,
    aspectRatio: 1.0,
  },
});
