import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useComfortaaFontsHook } from "../hook/useCustomFonts";

type Props = {
  label: string;
  theme?: "light" | "dark";
  size?: "default" | "large";
  onPress: () => void;
};

const CustomButton = ({ label, theme = "light", size = "default", onPress }: Props) => {
  const { fontsLoaded } = useComfortaaFontsHook();

  const bgColor = theme === "light" ? "#fff" : "#000";
  const textColor = theme === "light" ? "#000" : "#fff";
  const buttonSize = size === "default" ? 150 : "80%";

  if (!fontsLoaded) return null;
  return (
    <View style={[styles.buttonContainer, { backgroundColor: bgColor, width: buttonSize }]}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={[styles.buttonLabel, { color: textColor }]}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    height: 50,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
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
