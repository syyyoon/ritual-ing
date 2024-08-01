import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { ritualDataList } from "../ritualData";
import RitualCard from "./RitualCard";

type Props = {
  filter: "all" | "morning" | "night";
};

const FilterableCardList = ({ filter }: Props) => {
  const filteredData = filter === "all" ? ritualDataList : ritualDataList.filter((ritual) => ritual.type === filter);
  const numColumns = filter === "all" ? 2 : 1;
  console.log(numColumns);

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <RitualCard item={item} filter={filter} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        key={numColumns} // numColumns 값에 따라 key 속성을 설정하여 강제 재렌더링
      />
    </View>
  );
};

export default FilterableCardList;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 20,
  },
});
