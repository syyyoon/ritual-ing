import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import Editor from "../components/Editor";
import { RitualFormRouteProp } from "../type";
import { useRoute } from "@react-navigation/native";

const RitualFormScreen = () => {
  const route = useRoute<RitualFormRouteProp>();
  const { imageUri } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.borderTop}></View> */}
      <View style={styles.mainSection}>
        <Editor image={imageUri} />
      </View>
    </SafeAreaView>
  );
};

export default RitualFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfbef",
  },
  borderTop: {
    borderTopWidth: 2,
    borderColor: "#F8CD2D",
  },
  mainSection: {
    marginTop: 10,
    flexDirection: "row",
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 16,
  },
});
