import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RitualFilterValue } from "../types/ritual";
import { useConcertFontsHook } from "../hook/useCustomFonts";
import { useTheme } from "../context/ThemeContext";

type Props = {
  size?: "default" | "large";
  type: RitualFilterValue;
  text?: string;
  textSize?: number;
};

const CircleSticker = ({ size = "default", type, text, textSize = 20 }: Props) => {
  const { fontsLoaded } = useConcertFontsHook();
  const { theme } = useTheme()

  const color = type === "morning" ? theme.TYPE_MORNING : theme.TYPE_NIGHT;
  const circleSize = size === "default" ? 20 : 25;
  const borderRadius = circleSize / 2;
  const marginLeft = type === "all" ? 8 : 5;

  if (!fontsLoaded) return null;
  return (
    <View style={styles.container}>
      {/* twin circles */}
      {type === "all" ? (
        <View style={{ position: "relative", width: circleSize + 10 }}>
          <View
            style={[
              styles.circle,
              { backgroundColor: color, width: circleSize, height: circleSize, borderRadius: borderRadius },
            ]}
          ></View>
          <View
            style={[
              styles.circle,
              ,
              {
                backgroundColor: theme.TYPE_MORNING,
                width: circleSize,
                height: circleSize,
                position: "absolute",
                left: 10,
                borderRadius: borderRadius,
              },
            ]}
          ></View>
        </View>
      ) : (
        // single circle
        <View
          style={[
            styles.circle,
            { backgroundColor: color, width: circleSize, height: circleSize, borderRadius: borderRadius },
          ]}
        ></View>
      )}
      <Text style={[styles.text, { marginLeft: marginLeft, fontSize: textSize, color: theme.TEXT }]}>{text}</Text>
    </View>
  );
};

export default CircleSticker;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: { margin: 2 },
  text: {
    fontFamily: "ConcertOne_400Regular",
  },
});
