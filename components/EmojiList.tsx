import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { generateDateOptions } from "../utils/dateFormats";
import Octicons from "@expo/vector-icons/Octicons";
import { useBalooFontsHook } from "../hook/useCustomFonts";

type Props = {
  onSelect: (item: string) => void;
  pickedEmoji: string | null;
  selectedColor: string;
};
const EmojiList = ({ onSelect, pickedEmoji, selectedColor }: Props) => {
  const emojiList = generateDateOptions();
  const { fontsLoaded } = useBalooFontsHook();

  if (!fontsLoaded) return null;
  return (
    <FlatList
      data={emojiList}
      contentContainerStyle={styles.listContainer}
      keyExtractor={(item) => item}
      renderItem={({ item }) => {
        // 선택 여부 표시
        const isSelected = item === pickedEmoji;
        return (
          <Pressable
            style={styles.dateWrapper}
            onPress={() => {
              onSelect(item);
            }}
          >
            {isSelected && (
              <View style={styles.icon}>
                <Octicons name="dot-fill" size={20} color={selectedColor} />
              </View>
            )}
            {item.includes("+") ? (
              <View>
                <Text style={[styles.date, styles.firstLineText]}>{item.split("+")[0]}</Text>
                <Text style={[styles.date, styles.secondLineText]}>{item.split("+")[1]}</Text>
              </View>
            ) : (
              <Text style={styles.date}>{item}</Text>
            )}
          </Pressable>
        );
      }}
    />
  );
};

export default EmojiList;

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },

  dateWrapper: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontFamily: "BalooBhai2_700Bold",
    fontSize: 25,
    color: "#ffff",
    textAlign: "center",
  },
  icon: {
    position: "absolute",
    left: -20,
  },

  firstLineText: {
    fontSize: 30,
  },
  secondLineText: { fontSize: 23, marginTop: -15 },
});
