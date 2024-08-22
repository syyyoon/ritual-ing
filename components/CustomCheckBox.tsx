import { StyleSheet, View } from "react-native";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import Colors from "../constants/colors";
import CustomText from "./CustomText";

type Props = {
  text: string;
};
const CustomCheckBox = ({ text }: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);


  return (
    <View style={styles.container}>
      <Checkbox
        style={styles.checkBox}
        value={isChecked}
        onValueChange={setIsChecked}
        color={isChecked ? Colors.SECONDARY : undefined}
      />
      {text && <CustomText>{text}</CustomText>}
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
  checkBox: {
    margin: 8,
  },
});
