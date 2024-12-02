import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import CustomText from "./CustomText";
import CustomColorPicker from "./CustomColorPicker";
import { useTheme } from "../context/ThemeContext";
import Colors from "../constants/colors";

type Props = {
  isVisible: boolean;
  children?: React.ReactNode;
  onClose: () => void;
  onColorSelected: (color: string) => void;
};

const EmojiPicker = ({ isVisible, children, onClose, onColorSelected }: Props) => {
  const [isColorPickerVisible, setIsColorPickerVisible] = useState<boolean>(false);
  const { theme } = useTheme()
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <CustomText fontFamily="NotoSansKR_500Medium">Choose a date sticker</CustomText>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => setIsColorPickerVisible(true)}>
              <MaterialIcons name="palette" size={22} color={theme.TEXT} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={22} color={theme.TEXT} />
            </TouchableOpacity>
          </View>
        </View>
        {children}
      </View>

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
    backgroundColor: Colors.IMAGE_PICKER_MODAL_BG,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: "15%",
    backgroundColor: Colors.IMAGE_PICKER_TITLE_BG,
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



});
