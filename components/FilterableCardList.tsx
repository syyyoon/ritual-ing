import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import RitualCard from "./RitualCard";
import CustomText from "./CustomText";
import { RitualData, RitualFilterValue } from "../types/ritual";

type Props = {
  filter: RitualFilterValue;
  ritualDataList: RitualData[];
};

const FilterableCardList = ({ filter, ritualDataList }: Props) => {
  const filteredData = filter === "all" ? ritualDataList : ritualDataList.filter((ritual) => ritual.type === filter);
  const numColumns = filter === "all" ? 2 : 1;


  return (
    <View style={styles.listContainer}>
      {filteredData.length === 0 ? (
        <View>
          <CustomText>리추얼 데이터가 존재하지 않습니다. </CustomText>
          <CustomText>상단 '+'을 클릭하여 시작하세요.</CustomText>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={({ item }) => <RitualCard item={item} filter={filter} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          key={numColumns}
        />
      )}
    </View>
  );
};

export default FilterableCardList;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    // padding: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
});
