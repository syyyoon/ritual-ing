import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../constants/colors";

const SettingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainSection}></View>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },

  mainSection: {
    marginTop: 10,
    flexDirection: "row",
  },
});
