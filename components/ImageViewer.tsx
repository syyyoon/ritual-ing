import React from "react";
import { Image, ImageProps, StyleSheet, Text, View } from "react-native";

type Props = {
  selectedImage: string | null;
};

const ImageViewer = ({ selectedImage }: Props) => {
  if (!selectedImage)
    return (
      <Image source={require("../assets/default.png")} style={[styles.image, { backgroundColor: "#fdfbef" }]} />
      // <View style={styles.defaultImage}>
      //   <FontAwesome6 name="images" size={24} color="#5c5a56" />
      //   <CustomText style={{ color: "#5c5a56" }}>No Image</CustomText>
      // </View>
    );
  return <Image source={{ uri: selectedImage }} style={styles.image} />;
};

export default ImageViewer;

const styles = StyleSheet.create({
  // defaultImage: {
  //   width: "95%",
  //   height: undefined,
  //   aspectRatio: 1.5,
  //   backgroundColor: "#eae8e3",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  image: {
    width: "95%",
    height: undefined,
    aspectRatio: 1.5,

    // width: 320,
    // height: 320,
  },
});
