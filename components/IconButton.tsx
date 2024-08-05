import React from "react";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "./CustomText";
import Colors from "../constants/colors";

type MaterialIconsName = keyof typeof MaterialIcons.glyphMap;
type OcticonsName = keyof typeof Octicons.glyphMap;
type IconType = "MaterialIcons" | "Octicons";

type Props = {
  iconType: IconType;
  icon: MaterialIconsName | OcticonsName;
  label?: string;
  onPress: () => void;
};

const IconButton = ({ iconType, icon, label, onPress }: Props) => {
  const IconComponent = iconType === "MaterialIcons" ? MaterialIcons : Octicons;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.iconButton}>
        <IconComponent name={icon as any} size={25} />
      </View>
      {label && (
        <CustomText fontFamily={"NotoSansKR_700Bold"} fontSize={16} style={styles.iconButtonLabel}>
          {label}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  iconButton: {
    width: 70,
    height: 70,
    borderWidth: 6,
    borderColor: Colors.PRIMARY,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    textAlign: "center",
    fontWeight: 500,
    color: Colors.PRIMARY,
  },
});
