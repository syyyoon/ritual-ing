import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useComfortaaFontsHook } from "../hook/useCustomFonts";
import Colors from "../constants/colors";

type Props = {
  label: string;
  theme?: "light" | "dark";
  size?: "default" | "large" | "small";
  onPress: () => void;
};

const CustomButton = ({ label, theme = "light", size = "default", onPress }: Props) => {
  const { fontsLoaded } = useComfortaaFontsHook();
  const bgColor = theme === "light" ? "#fff" : Colors.PRIMARY;
  // const buttonSize = size === "default" ? 150 : "80%";
  const buttonSize = size === "default" ? 150 : size === "large" ? "80%" : 100; // small 버튼 크기 설정
  const borderColor = theme === "light" ? Colors.BORDER : Colors.PRIMARY

  if (!fontsLoaded) return null;
  return (
    <View style={[styles.buttonContainer, {
      backgroundColor: bgColor, width: buttonSize, borderColor: borderColor
    }]}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    borderWidth: 1,
    height: 50,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  border: {
    borderWidth: 1,
    borderColor: Colors.BORDER
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonLabel: {
    fontFamily: "Comfortaa_600SemiBold",
  },
});
