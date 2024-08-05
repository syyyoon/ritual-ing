import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../constants/colors";

type Props = { stage: number };
const StageBar = ({ stage }: Props) => {
  const getStageWidth = () => {
    switch (stage) {
      case 1:
        return "33%";
      case 2:
        return "66%";
      case 3:
        return "100%";
      default:
        return "0%";
    }
  };

  return (
    <View style={styles.barBackground}>
      <View style={[styles.stageStatus, { width: getStageWidth() }]}></View>
    </View>
  );
};

export default StageBar;

const styles = StyleSheet.create({
  barBackground: {
    height: 6,
    backgroundColor: "#dddbdb",
  },
  stageStatus: { height: 6, backgroundColor: Colors.PRIMARY },
});
