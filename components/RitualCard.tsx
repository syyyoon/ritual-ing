import React from "react";
import { Image, StyleSheet, View } from "react-native";
import CustomText from "./CustomText";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ListScreenNavigationProp } from "../types/navigation";
import { images } from "../source/image";
import { RitualData, RitualFilterValue } from "../types/ritual";
import Colors from "../constants/colors";

type RitualCardProps = {
  item: RitualData;
  filter: RitualFilterValue;
};

const RitualCard = ({ item, filter }: RitualCardProps) => {
  const navigation = useNavigation<ListScreenNavigationProp>();
  const marginValue = filter === "all" ? 1 : 10;

  const handleMoveDetail = () => {
    navigation.navigate("Detail", { item });
  };
  const defaultImage = require("../assets/default.png");

  return (
    <View style={[styles.cardLayout, { marginHorizontal: marginValue }]}>
      <TouchableOpacity onPress={handleMoveDetail}>
        <View style={styles.contentWrapper}>
          {item.imageUrl && item.id > 10 ? (
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
          ) : (
            <Image
              source={item.imageUrl ? images[item.imageUrl] : defaultImage}
              defaultSource={defaultImage}
              style={[styles.image, { borderWidth: 0.5, borderColor: Colors.BORDER }]}
            />
          )}
          <View style={{ paddingLeft: 5 }}>
            {item.title && <CustomText>{item.title}</CustomText>}
            {filter !== "all" && item.content && <CustomText fontSize={12}>{item.content}</CustomText>}
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
