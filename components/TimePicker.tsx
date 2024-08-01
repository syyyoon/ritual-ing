import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RNPickerSelect from "react-native-picker-select";

const MORNING_TIME_LIST = [
  { label: "05:00", value: "0500" },
  { label: "05:30", value: "0530" },
  { label: "06:00", value: "0600" },
  { label: "06:30", value: "0630" },
  { label: "07:00", value: "0700" },
  { label: "07:30", value: "0730" },
  { label: "08:00", value: "0800" },
  { label: "08:30", value: "0830" },
  { label: "09:00", value: "0900" },
  { label: "09:30", value: "0930" },
  { label: "10:00", value: "1000" },
  { label: "10:30", value: "1030" },
  { label: "11:00", value: "1100" },
];

const AFTERNOON_TIME_LIST = [
  { label: "17:00", value: "1700" },
  { label: "17:30", value: "1730" },
  { label: "18:00", value: "1800" },
  { label: "18:30", value: "1830" },
  { label: "19:00", value: "1900" },
  { label: "19:30", value: "1930" },
  { label: "20:00", value: "2000" },
  { label: "20:30", value: "2030" },
  { label: "21:00", value: "2100" },
  { label: "21:30", value: "2130" },
  { label: "22:00", value: "2200" },
  { label: "22:30", value: "2230" },
  { label: "23:00", value: "2300" },
  { label: "23:30", value: "2330" },
  { label: "24:00", value: "2400" },
];

type Props = {
  time: "morning" | "afternoon";
};

const TimePicker = ({ time }: Props) => {
  return (
    <View>
      <RNPickerSelect
        placeholder={{
          label: "시간을 선택하세요.",
        }}
        style={{
          inputIOS: styles.IOS,
          inputWeb: styles.WEB,
          placeholder: {
            color: "#a9a9a9",
          },
        }}
        onValueChange={(value) => console.log(value)}
        items={time === "morning" ? MORNING_TIME_LIST : AFTERNOON_TIME_LIST}
      />
    </View>
  );
};

export default TimePicker;

const styles = StyleSheet.create({
  IOS: {
    width: "50%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    marginTop: 10,
  },
  WEB: {
    width: "50%",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
});
