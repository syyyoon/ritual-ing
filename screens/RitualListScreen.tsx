import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import RitualTypeFilter from "../components/RitualTypeFilter";
import FilterableCardList from "../components/FilterableCardList";
import Colors from "../constants/colors";
import { useFocusEffect } from "@react-navigation/native";
import { RitualData, RitualFilterValue } from "../types/ritual";
import { getRitualDataList } from "../service/ritualDataService";

const RitualListScreen = () => {
  const [filterValue, setFilterValue] = useState<RitualFilterValue>("all");
  const [rituals, setRituals] = useState<RitualData[]>([]);

  const loadData = async () => {
    let data = await getRitualDataList();
    if (!data) {
      setRituals([]);
    } else setRituals(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainSection}>
        <RitualTypeFilter filter={filterValue} setFilter={setFilterValue} />
        <FilterableCardList filter={filterValue} ritualDataList={rituals} />
      </View>
    </SafeAreaView>
  );
};

export default RitualListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },

  mainSection: {
    paddingTop: 10,
    flexDirection: "row",
  },
});
