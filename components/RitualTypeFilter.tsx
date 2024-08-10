import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import CircleSticker from "./CircleSticker";
import CustomText from "./CustomText";
import { RitualFilterValue } from "../types/ritual";

interface FilterProps {
  filter: RitualFilterValue;
  setFilter: (filter: RitualFilterValue) => void;
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
    marginTop: 10,
  },
  button: {
    paddingLeft: 10,
    flexDirection: "row",
  },
});

export default RitualTypeFilter;
