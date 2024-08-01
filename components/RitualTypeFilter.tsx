import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CircleSticker from "./CircleSticker";
import CustomText from "./CustomText";

interface FilterProps {
  filter: "all" | "morning" | "night";
  setFilter: (filter: "all" | "morning" | "night") => void;
}

const FILTER_TYPE = [{ label: "all" }, { label: "morning" }, { label: "night" }] as const;
const RitualTypeFilter = ({ filter, setFilter }: FilterProps) => {
  return (
    <View style={styles.container}>
      {FILTER_TYPE.map(({ label }) => (
        <TouchableOpacity
          key={label}
          style={[
            styles.button,
            {
              opacity: filter === label ? 1 : 0.5,
            },
          ]}
          onPress={() => setFilter(label)}
        >
          <CircleSticker type={label} />
          <CustomText fontSize={12}>{label.charAt(0).toLocaleUpperCase() + label.slice(1)} </CustomText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    // justifyContent: "flex-end",
    // marginRight: 30,
    // borderRightWidth: 0.5,
    // borderColor: "gray",
    marginTop: 10,
  },
  button: {
    paddingLeft: 10,
    flexDirection: "row",
  },
});

export default RitualTypeFilter;
