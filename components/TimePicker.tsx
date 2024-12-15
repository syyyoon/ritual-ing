import { StyleSheet, View } from "react-native";
import React from "react";
import RNPickerSelect from "react-native-picker-select";
import Colors from "../constants/colors";
import { useTheme } from "../context/ThemeContext";
import { AFTERNOON_TIME_LIST, MORNING_TIME_LIST } from "../utils/timeList";



type timeProp = {
  time: "morning" | "night";
  onTimeChange: (time: string) => void;
};

const TimePicker = ({ time, onTimeChange }: timeProp) => {

  const { theme } = useTheme();
  return (

    <View style={styles.frame}>
      <View style={{}}>
        <RNPickerSelect
          placeholder={{
            label: "시간을 선택하세요.",
            inputLabel: "시간을 선택하세요.",
            value: null,
            key: 1
          }}
          fixAndroidTouchableBug={true}
          useNativeAndroidPickerStyle={false}
          // pickerProps={{ style: { height: 214, overflow: 'hidden' } }}
          style={{
            inputIOS: [styles.IOS, { color: theme.TEXT }],
            inputAndroid: [styles.Android, { color: theme.TEXT }],
          }}
          onValueChange={(value) => onTimeChange(value)}
          items={time === "morning" ? MORNING_TIME_LIST : AFTERNOON_TIME_LIST}
        />
      </View>

    </View>
  );
};

export default TimePicker;

const styles = StyleSheet.create({
  frame: {
    // backgroundColor: "red",
    width: "100%",
  },

  IOS: {
    width: "90%",
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    lineHeight: 20,
    height: 40,
    fontSize: 16,
  },
  Android: {
    width: "70%",
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    height: 40,
    fontSize: 16,
    justifyContent: "center",
    textAlignVertical: "center",
  },


});
