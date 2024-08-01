import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = ({}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainSection}></View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfbef",
  },
  mainSection: {
    flexDirection: "row",
  },
});
