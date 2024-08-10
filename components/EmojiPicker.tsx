import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import CustomText from "./CustomText";
import CustomColorPicker from "./CustomColorPicker";

type Props = {
  isVisible: boolean;
  children?: React.ReactNode;
  onClose: () => void;
  onColorSelected: (color: string) => void;
};

const EmojiPicker = ({ isVisible, children, onClose, onColorSelected }: Props) => {
  const [isColorPickerVisible, setIsColorPickerVisible] = useState<boolean>(false);

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <CustomText fontFamily="NotoSansKR_500Medium">Choose a date sticker</CustomText>

          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => setIsColorPickerVisible(true)}>
              <MaterialIcons name="palette" size={22} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={22} />
            </TouchableOpacity>
          </View>
        </View>
        {/* EmojiList */}
        {children}
      </View>

      {/* Color Picker component */}
      {isColorPickerVisible && (
        <CustomColorPicker
          isVisible={isColorPickerVisible}
          onClose={() => setIsColorPickerVisible(false)}
          onColorSelected={onColorSelected}
        />
      )}
    </Modal>
  );
};

export default EmojiPicker;

const styles = StyleSheet.create({
  modalContent: {
    height: "35%",
    width: "100%",
    backgroundColor: "#363736",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: "15%",
    backgroundColor: "#fffffd",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    flexDirection: "row",
    gap: 30,
  },

  listContainer: {
    padding: 10,
  },
  dateContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
