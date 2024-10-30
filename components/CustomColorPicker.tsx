import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
// import ColorPicker, { Panel1, Swatches, Preview, HueSlider } from "reanimated-color-picker";
import CustomText from "./CustomText";
import { useTheme } from "../context/ThemeContext";


type Props = {
  isVisible: boolean;
  onClose: () => void;
  onColorSelected: (color: string) => void;
};

const CustomColorPicker = ({ isVisible, onClose, onColorSelected }: Props) => {

  const [selectedColor, setSelectedColor] = useState<string>("#ffff");
  const { theme } = useTheme()
  // const onSelectColor = ({ hex }: any) => {
  //   setSelectedColor(hex);
  // };

  const handleColorSelection = (color: string) => {
    console.log('color selected', color)
    setSelectedColor(color);
  };

  const handleSaveColor = () => {
    console.log('selected Button clicked!')
    onColorSelected(selectedColor);
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={[styles.colorPickerContainer, { backgroundColor: theme.TEXT }]}>
          <View style={styles.colorOptionsContainer}>
            <TouchableOpacity
              style={[styles.colorOption, { backgroundColor: "#FF0000" }]}
              onPress={() => handleColorSelection("#FF0000")}
            />
            <TouchableOpacity
              style={[styles.colorOption, { backgroundColor: "#FFFF00" }]}
              onPress={() => handleColorSelection("#FFFF00")}
            />
            <TouchableOpacity
              style={[styles.colorOption, { backgroundColor: "#FFC0CB" }]}
              onPress={() => handleColorSelection("#FFC0CB")}
            />
          </View>
          {/* <ColorPicker value={selectedColor} onComplete={onSelectColor}>
            <Panel1 style={{ marginBottom: 20 }} />
            <Swatches />
            <Preview />
            <HueSlider />
          </ColorPicker> */}

          <TouchableOpacity style={styles.buttonWrapper} onPress={handleSaveColor}>
            <CustomText fontSize={15} style={{ color: theme.BACKGROUND }}>
              SELECT
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomColorPicker;
const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  colorPickerContainer: {
    flexDirection: "column",
    gap: 20,
    width: "80%",
    borderRadius: 10,
    padding: 20,
  },
  colorOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "center"
  },

});
