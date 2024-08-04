import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { ritualDataList } from "../ritualData";
import RitualCard from "./RitualCard";
import CustomText from "./CustomText";

type Props = {
  filter: "all" | "morning" | "night";
};

const FilterableCardList = ({ filter }: Props) => {
  const filteredData = filter === "all" ? ritualDataList : ritualDataList.filter((ritual) => ritual.type === filter);

  const numColumns = filter === "all" ? 2 : 1;

  return (
    <View style={styles.listContainer}>
      {filteredData.length === 0 ? (
        <View style={styles.noContentContainer}>
          <CustomText>리추얼 데이터가 존재하지 않습니다. </CustomText>
          <CustomText>상단 '+'을 클릭하여 시작하세요.</CustomText>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={({ item }) => <RitualCard item={item} filter={filter} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          key={numColumns} // numColumns 값에 따라 key 속성을 설정하여 강제 재렌더링
        />
      )}
    </View>
  );
};

export default FilterableCardList;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  noContentContainer: {
    // paddingVertical: "70%",
  },
});
