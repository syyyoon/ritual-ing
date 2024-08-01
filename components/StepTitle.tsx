import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFonts, Comfortaa_400Regular, Comfortaa_700Bold } from "@expo-google-fonts/comfortaa";

type Props = {
  mainTitle: string;
  subTitle: string;
};

const StepTitle = ({ mainTitle, subTitle }: Props) => {
  let [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Comfortaa_700Bold,
  });

  if (!fontsLoaded) return null;
  return (
    <View style={styles.layout}>
      <Text style={styles.mainText}>{mainTitle}</Text>
      <Text style={styles.subText}>{subTitle}</Text>
    </View>
  );
};

export default StepTitle;

const styles = StyleSheet.create({
  layout: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    // borderBottomWidth: 4,
    // borderBottomColor: "#F8CD2D",
  },
  mainText: { fontFamily: "Comfortaa_700Bold", fontSize: 22, marginBottom: 10 },
  subText: { fontFamily: "Comfortaa_400Regular", fontSize: 20 },
});
