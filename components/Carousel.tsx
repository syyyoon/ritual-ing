import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import PagerView from "react-native-pager-view";

const Carousel = () => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
      >
        <View key="1" style={styles.page}>
          <Image style={styles.image} source={require("../assets/bgImage_2.png")} />
        </View>
        <View key="2" style={styles.page}>
          <Image style={styles.image} source={require("../assets/bgImage_2.png")} />
        </View>
        <View key="3" style={styles.page}>
          <Image style={styles.image} source={require("../assets/bgImage_2.png")} />
        </View>
      </PagerView>
      <View style={styles.indicatorContainer}>
        {[0, 1, 2].map((index) => (
          <View key={index} style={[styles.indicator, currentPage === index && styles.activeIndicator]} />
        ))}
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
    backgroundColor: "white",
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
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
    backgroundColor: "gray",
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: "black",
  },
});