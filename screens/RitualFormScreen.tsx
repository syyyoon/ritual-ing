import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

const RitualFormScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.borderTop}></View>
      <View style={styles.mainSection}></View>
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
    borderWidth: 2,
    borderColor: "#F8CD2D",
    marginBottom: 10,
  },
  mainSection: {
    flexDirection: "row",
  },
});
