import { ActivityIndicator, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import RitualTypeFilter from "../components/RitualTypeFilter";
import FilterableCardList from "../components/FilterableCardList";
import { useFocusEffect } from "@react-navigation/native";
import { RitualData, RitualFilterValue } from "../types/ritual";
import { getRitualDataList } from "../service/ritualDataService";
import Layout from "../components/Layout";
import Colors from "../constants/colors";
import { parse } from "date-fns";
import SortableButtons from "../components/SortableButtons";
import LoadingIcon from "../components/LoadingIcon";

type RitualListScreenProps = {
  rituals: RitualData[];
  setRituals: React.Dispatch<React.SetStateAction<RitualData[]>>;
};

const RitualListScreen = ({ rituals, setRituals }: RitualListScreenProps) => {
  const [filterValue, setFilterValue] = useState<RitualFilterValue>("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const sortRituals = (data: RitualData[], order: "newest" | "oldest") => {
    return [...data].sort((a, b) => {
      const dateA = parse(a.date, "MMM d, yyyy", new Date()).getTime();
      const dateB = parse(b.date, "MMM d, yyyy", new Date()).getTime();
      return order === "newest" ? dateB - dateA : dateA - dateB; // 최신순 또는 오래된 순 정렬
    });
  };

  const handleSortChange = (order: "newest" | "oldest") => {
    setSortOrder(order);
  };

  const loadRitualListData = async () => {
    const data = await getRitualDataList();

    if (data) {
      setRituals(sortRituals(data, sortOrder)); // 데이터 로드 후 정렬
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadRitualListData();
    }, [sortOrder, rituals])
  );

  if (!rituals) {
    return <LoadingIcon />;
  }
  return (
    <Layout>
      <SortableButtons currentSort={sortOrder} onSortChange={handleSortChange} />
      <View style={styles.mainSection}>
        <RitualTypeFilter filter={filterValue} setFilter={setFilterValue} />
        <FilterableCardList filter={filterValue} ritualDataList={rituals} />
      </View>
    </Layout>
  );
};

export default RitualListScreen;

const styles = StyleSheet.create({
  indicatorWrapper: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    margin: "30%",
  },
  mainSection: {
    flexDirection: "row",
  },
});
