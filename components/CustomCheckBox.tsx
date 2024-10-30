import { StyleSheet, View } from "react-native";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import Colors from "../constants/colors";
import CustomText from "./CustomText";

type Props = {
  onCheckChange: (isChecked: boolean) => void;
};
const CustomCheckBox = ({ onCheckChange }: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckChange = (newValue: boolean) => {
    setIsChecked(newValue);
    onCheckChange(newValue); // Check 상태 변경 시 상위 컴포넌트에 전달
  };


  return (
    <View style={styles.container}>
      <Checkbox
        style={styles.checkBox}
        value={isChecked}
        onValueChange={handleCheckChange}
        color={isChecked ? Colors.SECONDARY : undefined}
      />
      <CustomText>메세지 알림에 동의합니다.</CustomText>
    </View>
  );
};

export default CustomCheckBox;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  checkBox: {
    margin: 8,
  },
});
