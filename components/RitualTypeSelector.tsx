import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CircleSticker from "./CircleSticker";
import CustomText from "./CustomText";

type TypeSelectorProps = {
  type: "morning" | "night";
  onTypeSelect: (type: "morning" | "night") => void;
};

const RitualTypeSelector = ({ type, onTypeSelect }: TypeSelectorProps) => {
  return (
    <View style={styles.layout}>
      <TouchableOpacity
        onPress={() => onTypeSelect("morning")}
        style={[styles.flexRow, type === "morning" && styles.selected]}
      >
        <CircleSticker type="morning" />
        <Text>Morning</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onTypeSelect("night")}
        style={[styles.flexRow, type === "night" && styles.selected]}
      >
        <CircleSticker type="night" />
        <Text>Night</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RitualTypeSelector;

const styles = StyleSheet.create({
  layout: { flexDirection: "row", gap: 20 },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    opacity: 0.3,
  },
  selected: {
    opacity: 1,
  },
});
