import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import RitualTypeFilter from "../components/RitualTypeFilter";
import FilterableCardList from "../components/FilterableCardList";

const RitualListScreen = () => {
  const [filterValue, setFilterValue] = useState<"all" | "morning" | "night">("all");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainSection}>
        <RitualTypeFilter filter={filterValue} setFilter={setFilterValue} />
        <FilterableCardList filter={filterValue} />
      </View>
    </SafeAreaView>
  );
};

export default RitualListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfbef",
  },

  mainSection: {
    marginTop: 10,
    flexDirection: "row",
  },
});
