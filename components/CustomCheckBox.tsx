import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Checkbox from "expo-checkbox";

const CustomCheckBox = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Checkbox
        style={styles.checkBox}
        value={isChecked}
        onValueChange={setIsChecked}
        color={isChecked ? "#666666" : undefined}
      />
      <Text style={styles.paragraph}>메세지 알림에 동의합니다.</Text>
    </View>
  );
};

export default CustomCheckBox;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontWeight: "200",
  },
  checkBox: {
    margin: 8,
  },
});
