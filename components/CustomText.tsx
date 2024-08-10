import { Text, TextStyle } from "react-native";
import React from "react";
import { useNotoFontsHook } from "../hook/useCustomFonts";

type CustomTextProps = {
  fontFamily?: string;
  fontSize?: number;
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
};

const CustomText = ({ fontFamily = "NotoSansKR_300Light", fontSize, style, children }: CustomTextProps) => {
  const { fontsLoaded } = useNotoFontsHook();

  if (!fontsLoaded) return null;

  return (
    <Text numberOfLines={2} ellipsizeMode="tail" style={[{ fontFamily, fontSize }, style]}>
      {children}
    </Text>
  );
};

export default CustomText;
