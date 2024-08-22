import { StyleSheet, View, ViewStyle } from "react-native";
import React from "react";

type Props = {
  first: React.ReactNode;
  second: React.ReactNode;
  third?: React.ReactNode;
  gap?: number;
  style?: ViewStyle | ViewStyle[];
};
const FlexRowTexts = ({ first, second, third, gap, style }: Props) => {
  return (
    <View style={[styles.defaultLayout, { gap }, style]}>
      {first}
      {second}
      {third}
    </View>
  );
};

export default FlexRowTexts;

const styles = StyleSheet.create({
  defaultLayout: {
    flexDirection: "row",
    alignItems: "center",
  },
});
