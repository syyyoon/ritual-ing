import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import CircleSticker from "./CircleSticker";
import { RitualFilterValue } from "../types/ritual";
import CustomText from "./CustomText";

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
            styles.typeButton,
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
  typeButton: {
    paddingLeft: 10,
    flexDirection: "row",
    marginBottom: 5,
  },
});

export default RitualTypeFilter;
