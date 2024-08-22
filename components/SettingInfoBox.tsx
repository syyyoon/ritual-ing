import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import CustomText from "./CustomText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "../context/ThemeContext";

type Props = {
  name: string;
  content: string | React.ReactNode;
};
const SettingInfoBox = ({ name, content }: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { theme } = useTheme();

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <CustomText fontFamily="NotoSansKR_400Regular" fontSize={16}>{name}</CustomText>
        {typeof content === "string" ? (
          <CustomText fontSize={16}  >
            {content}
          </CustomText>
        ) : (
          <View>
            <TouchableOpacity onPress={toggleExpand}>
              {expanded ? (
                <MaterialIcons name="keyboard-arrow-up" size={24} color={theme.TEXT} />
              ) : (
                <MaterialIcons name="keyboard-arrow-down" size={24} color={theme.TEXT} />
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
      {expanded && <View>{content}</View>}
    </View>
  );
};

export default SettingInfoBox;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 30
  },
  boxContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

});
