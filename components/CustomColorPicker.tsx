import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import ColorPicker, { Panel1, Swatches, Preview, HueSlider } from "reanimated-color-picker";
import CustomText from "./CustomText";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onColorSelected: (color: string) => void;
};

const CustomColorPicker = ({ isVisible, onClose, onColorSelected }: Props) => {
  const [selectedColor, setSelectedColor] = useState<string>("#ffff");

  const onSelectColor = ({ hex }: any) => {
    setSelectedColor(hex);
  };

  const handleSaveColor = () => {
    onColorSelected(selectedColor);
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.colorPickerContainer}>
          <ColorPicker value={selectedColor} onComplete={onSelectColor}>
            <Panel1 style={{ marginBottom: 20 }} />
            <Swatches />
            <Preview />
            <HueSlider />
          </ColorPicker>

          <TouchableOpacity style={styles.buttonWrapper} onPress={handleSaveColor}>
            <CustomText fontFamily="NotoSansKR_700Bold" style={styles.button}>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  colorPickerContainer: {
    flexDirection: "column",
    gap: 20,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  buttonWrapper: { flexDirection: "row", justifyContent: "center" },
  button: {
    fontSize: 15,
  },
});
