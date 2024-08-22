import { ActivityIndicator, SafeAreaView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import RitualTypeFilter from "../components/RitualTypeFilter";
import FilterableCardList from "../components/FilterableCardList";

import { useFocusEffect } from "@react-navigation/native";
import { RitualData, RitualFilterValue } from "../types/ritual";
import { getRitualDataList } from "../service/ritualDataService";
import Layout from "../components/Layout";


const RitualListScreen = () => {
  const [filterValue, setFilterValue] = useState<RitualFilterValue>("all");
  const [rituals, setRituals] = useState<RitualData[]>([]);


  const loadRitualListData = async () => {
    let data = await getRitualDataList();
    if (!data) {
      setRituals([]);
    } else setRituals(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadRitualListData();
    }, [])
  );

  if (!rituals) {
    return (
      <Layout>
        <ActivityIndicator />
      </Layout>)
  }


  if (!rituals) {
    return (
      <Layout>
        <ActivityIndicator />
      </Layout>

    );
  }
  return (
    <Layout>
      <View style={styles.mainSection}>
        <RitualTypeFilter filter={filterValue} setFilter={setFilterValue} />
        <FilterableCardList filter={filterValue} ritualDataList={rituals} />
      </View>
    </Layout>
  );
};

export default RitualListScreen;

const styles = StyleSheet.create({
  mainSection: {
    paddingTop: 10,
    flexDirection: "row",
  },
});
