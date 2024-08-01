import { StyleSheet, Text, TextStyle } from "react-native";
import React from "react";
import {
  useFonts,
  NotoSansKR_100Thin,
  NotoSansKR_300Light,
  NotoSansKR_400Regular,
  NotoSansKR_500Medium,
  NotoSansKR_700Bold,
  NotoSansKR_900Black,
} from "@expo-google-fonts/noto-sans-kr";

type CustomTextProps = {
  fontFamily?: string;
  fontSize?: number;
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
};

const CustomText = ({ fontFamily = "NotoSansKR_300Light", fontSize, style, children }: CustomTextProps) => {
  let [fontsLoaded] = useFonts({
    NotoSansKR_100Thin,
    NotoSansKR_300Light,
    NotoSansKR_400Regular,
    NotoSansKR_500Medium,
    NotoSansKR_700Bold,
    NotoSansKR_900Black,
  });

  if (!fontsLoaded) return null;

  return (
    <Text numberOfLines={2} ellipsizeMode="tail" style={[{ fontFamily, fontSize }, styles.defaultStyle, style]}>
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  defaultStyle: {},
});
