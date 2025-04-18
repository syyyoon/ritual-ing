import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import CustomText from "./CustomText";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ListScreenNavigationProp, SearchScreenNavigationProp } from "../types/navigation";
import { images } from "../source/image";
import { RitualData, RitualFilterValue } from "../types/ritual";
import Colors from "../constants/colors";
import { useTheme } from "../context/ThemeContext";
import Entypo from "@expo/vector-icons/Entypo";
import * as FileSystem from "expo-file-system";

type RitualCardProps = {
  item: RitualData;
  filter: RitualFilterValue;
};

const RitualCard = ({ item, filter }: RitualCardProps) => {
  const navigation = useNavigation<ListScreenNavigationProp>();

  const { theme } = useTheme();
  const marginValue = filter === "all" ? 1 : 10;
  const imageRatio = filter === "all" ? 1 : 1.5;

  // console.log("1!", FileSystem.documentDirectory + `${item.imageUrl}`);

  const handleMoveDetail = () => {
    navigation.navigate("Detail", { item });
  };
  const defaultImage = require("../assets/default.png");

  useEffect(() => {
    console.log("1!", FileSystem.documentDirectory + `${item.imageUrl}`);
  }, []);

  return (
    <View style={[styles.cardLayout, { marginHorizontal: marginValue }]}>
      <TouchableOpacity onPress={handleMoveDetail}>
        <View style={[styles.contentWrapper]}>
          {item.imageUrl && item.id > 10 ? (
            <Image
              // source={{ uri: item.imageUrl }}
              source={{ uri: FileSystem.documentDirectory + `${item.imageUrl}` }}
              style={[styles.image, { backgroundColor: theme.DEFAULT_IMG_BG, aspectRatio: imageRatio }]}
            />
          ) : (
            <Image
              source={item.imageUrl ? FileSystem.documentDirectory + `${images[item.imageUrl]}` : defaultImage}
              defaultSource={defaultImage}
              style={[styles.image, { backgroundColor: theme.DEFAULT_IMG_BG, aspectRatio: imageRatio }]}
            />
          )}

          <View style={{ paddingLeft: 5 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 3,
              }}
            >
              {item.title && (
                <CustomText fontFamily="NotoSansKR_400Regular" fontSize={12}>
                  {item.title}
                </CustomText>
              )}
              {!item.title && (
                <CustomText fontFamily="NotoSansKR_400Regular" fontSize={12}>
                  -
                </CustomText>
              )}
              {filter !== "all" && item.like && <Entypo name="heart" size={12} color="#f15b5b" />}
            </View>

            {filter !== "all" && item.content && <CustomText fontSize={12}>{item.content}</CustomText>}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={styles.date}>
                <MaterialCommunityIcons name="tag" size={12} color={Colors.BORDER} />
                <CustomText fontSize={12}>{item.date}</CustomText>
              </View>
              {filter === "all" && item.like && <Entypo name="heart" size={12} color="#f15b5b" />}
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
    // aspectRatio: 1.5,
    // aspectRatio: 1, // 정사각형 타입
    marginBottom: 5,
  },
  date: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    // marginTop: 5,
  },
});
