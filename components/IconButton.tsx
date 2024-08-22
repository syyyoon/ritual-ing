import React from "react";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Colors from "../constants/colors";

type MaterialIconsName = keyof typeof MaterialIcons.glyphMap;
type OcticonsName = keyof typeof Octicons.glyphMap;
type IconType = "MaterialIcons" | "Octicons";

type Props = {
  size?: "small" | "default"
  iconType: IconType;
  icon: MaterialIconsName | OcticonsName;
  onPress: () => void;
};

const IconButton = ({ size = "default", iconType, icon, onPress }: Props) => {
  const IconComponent = iconType === "MaterialIcons" ? MaterialIcons : Octicons;
  const iconSize = size === "default" ? 25 : 15
  const customStyle = size === 'default' ? { width: 70, height: 70, borderWidth: 6 } : { width: 30, height: 30, borderWidth: 4 }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.defaultStyle, customStyle]}>
        <IconComponent name={icon as any} size={iconSize} />
      </View>
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  defaultStyle: {
    borderColor: Colors.PRIMARY,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

});
