import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  useFonts,
  BalooBhai2_400Regular,
  BalooBhai2_500Medium,
  BalooBhai2_600SemiBold,
  BalooBhai2_700Bold,
  BalooBhai2_800ExtraBold,
} from "@expo-google-fonts/baloo-bhai-2";

const Logo = () => {
  let [fontsLoaded] = useFonts({
    BalooBhai2_400Regular,
    BalooBhai2_500Medium,
    BalooBhai2_600SemiBold,
    BalooBhai2_700Bold,
    BalooBhai2_800ExtraBold,
  });

  if (!fontsLoaded) return null;
  return (
    <View style={styles.logoContainer}>
      <Text style={[styles.logoStyle, { color: "#F8CD2D" }]}>Ritual </Text>
      <Text style={[styles.logoStyle, { color: "#6F737A" }]}> +ing</Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: "row",
    marginTop: 20,
    paddingVertical: 8,
    justifyContent: "center",
    // borderWidth: 1,
  },
  logoStyle: {
    fontSize: 35,
    fontFamily: "BalooBhai2_800ExtraBold",
  },
});
