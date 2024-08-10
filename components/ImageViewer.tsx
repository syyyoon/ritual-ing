import React, { useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import Colors from "../constants/colors";

type Props = {
  selectedImage: string | undefined;
};

const ImageViewer = React.memo(({ selectedImage }: Props) => {
  useEffect(() => {
    console.log("ImageViewer URI:", selectedImage);
  }, [selectedImage]);

  if (!selectedImage) {
    console.log("이미지 없음");
    return (
      <Image source={require("../assets/default.png")} style={[styles.image, { backgroundColor: Colors.BACKGROUND }]} />
    );
  } else {
    console.log("이미지 존재");
    return <Image source={{ uri: selectedImage }} style={styles.image} />;
  }
});

export default ImageViewer;

const styles = StyleSheet.create({
  image: {
    width: "95%",
    height: undefined,
    aspectRatio: 1.5,
  },
});
