import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { RitualData } from "../ritualData";
import CustomText from "./CustomText";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../type";
import { images } from "../source/image";

type RitualCardProps = {
  item: RitualData;
  filter: "all" | "morning" | "night";
};

const RitualCard = ({ item, filter }: RitualCardProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "Detail">>();

  const marginValue = filter === "all" ? 1 : 10;

  const handleMoveDetail = () => {
    navigation.navigate("Detail", { item });
  };
  return (
    <View style={[styles.cardLayout, { marginHorizontal: marginValue }]}>
      {/*  TouchableOpacity 가 상단에서 감싸면 css 적용이 안됨.. 왜 안됨?*/}
      <TouchableOpacity onPress={handleMoveDetail}>
        <View style={styles.contentWrapper}>
          <Image source={images[item.imageUrl]} style={styles.image} />
          <View style={{ paddingLeft: 5 }}>
            <CustomText>{item.title}</CustomText>
            {filter !== "all" && <CustomText fontSize={12}>{item.content}</CustomText>}
            <View style={styles.date}>
              <MaterialCommunityIcons name="tag" size={12} color="#828080" />
              <CustomText fontSize={12} style={{ color: "#7c7d80" }}>
                {item.date}
              </CustomText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RitualCard;

const styles = StyleSheet.create({
  cardLayout: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
  },
  contentWrapper: {
    width: "100%",
  },
  image: {
    width: "100%",
    height: undefined, // aspectRatio 값에 따라 높이 자동으로 계산됨.
    aspectRatio: 1.5,
    // aspectRatio: 1, // 정사각형 타입
    marginBottom: 5,
  },
  date: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginTop: 5,
  },
});
