import { Image, ImageSourcePropType, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import PagerView from "react-native-pager-view";
import Colors from "../constants/colors";
import { useTheme } from "../context/ThemeContext";
import { RitualData } from "../types/ritual";

type CarouselProps = {
  images: ImageSourcePropType[];
  rituals?: RitualData[]
  onImagePress?: (item: RitualData) => void;
}

const Carousel = ({ images, rituals, onImagePress }: CarouselProps) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { theme } = useTheme()

  const handleImagePress = (index: number) => {
    console.log('index', index)
    if (rituals && onImagePress) {
      onImagePress(rituals[index]);
    }
  };

  return (
    <View style={styles.container}>
      <PagerView
        style={[styles.pagerView, { backgroundColor: theme.BACKGROUND }]}
        initialPage={0}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
      >
        {images.map((image, index) => (
          <TouchableOpacity
            key={index.toString()}
            style={styles.page}
            onPress={() => handleImagePress(index)}
            disabled={!rituals || !onImagePress}
          >
            <Image style={styles.image} source={image} />
          </TouchableOpacity>
        ))}

      </PagerView>
      <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <View key={index.toString()} style={[styles.indicator, currentPage === index && styles.activeIndicator]} />
        ))}
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10
  },
  pagerView: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",

  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  // page: {
  //   flexDirection: "row", // 두 개의 이미지를 가로로 나란히 배치
  //   justifyContent: "space-around", // 두 이미지 간의 간격을 동일하게 설정
  //   alignItems: "center",
  // },
  // image: {
  //   width: "48%", // 두 이미지가 균등하게 화면을 차지하도록 설정
  //   aspectRatio: 1, // 정사각형 비율로 유지
  //   // resizeMode: "contain",
  // },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.SECONDARY,
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: Colors.PRIMARY,
  },
});
