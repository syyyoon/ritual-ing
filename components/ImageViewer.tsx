import React from "react";
import { Image, StyleSheet } from "react-native";
import Colors from "../constants/colors";

type Props = {
  selectedImage: string | null;
};

const ImageViewer = ({ selectedImage }: Props) => {
  if (!selectedImage)
    return (
      <Image source={require("../assets/default.png")} style={[styles.image, { backgroundColor: Colors.BACKGROUND }]} />
      // <View style={styles.defaultImage}>
      //   <FontAwesome6 name="images" size={24} color="#5c5a56" />
      //   <CustomText style={{ color: "#5c5a56" }}>No Image</CustomText>
      // </View>
    );
  return <Image source={{ uri: selectedImage }} style={styles.image} />;
};

export default ImageViewer;

const styles = StyleSheet.create({
  image: {
    width: "95%",
    height: undefined,
    aspectRatio: 1.5,
  },
});
