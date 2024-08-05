import { Button, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../type";
import { images } from "../source/image";
import Colors from "../constants/colors";

type RitualDetailScreenRouteProp = RouteProp<RootStackParamList, "Detail">;

const RitualDetailScreen = () => {
  const route = useRoute<RitualDetailScreenRouteProp>();

  const { item } = route.params;
  console.log(item);

  return (
    <View style={styles.container}>
      <View style={styles.topBorder}></View>
      <Image source={images[item.imageUrl]} style={styles.image} />
      <Text>{item.id}</Text>
      <Text>{item.title}</Text>
      <Text>{item.content}</Text>
    </View>
  );
};

export default RitualDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  topBorder: {
    borderTopWidth: 2,
    borderColor: Colors.PRIMARY,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.5,
  },
});
