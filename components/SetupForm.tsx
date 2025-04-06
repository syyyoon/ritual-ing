import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
import { RitualType } from "../types/ritual";
import CircleSticker from "./CircleSticker";

import Colors from "../constants/colors";
import Dropdown from "./DropDown";
import { formattedMorningTimes, formattedNightTimes } from "../utils/timeList";

type Props = {
  type: RitualType;
  activity: string;
  onChangeText: (activity: string) => void;
  onTimeChange: (time: string) => void;
};

const SetupForm = ({ type, activity, onChangeText, onTimeChange }: Props) => {
  const { theme } = useTheme();
  const title = type.charAt(0).toUpperCase() + type.slice(1) + ` Ritual`;

  const messages = {
    morning: {
      comment: "30분 일찍 일어나 나에게 집중하는 시간을 보내며 몸과 마음을 깨워보세요.",
      ritualActivities: "독서, 명상, 요가, 런닝",
      typeKR: "모닝",
    },
    night: {
      comment: "자기 전 내일의 걱정, 미래의 불안 대신 긍정적 에너지로 채우며 잠들 준비해 보세요.",
      ritualActivities: "산책, 일기, 독서, 홈트",
      typeKR: "나이트",
    },
  };

  const { comment, ritualActivities } = messages[type];

  // `type`이 변경될 때만 `formattedTimes` 계산
  const formattedTimes = useMemo(
    () => (type === "morning" ? formattedMorningTimes : formattedNightTimes),
    [type] // `type`이 변경될 때만 계산
  );

  return (
    <View style={styles.section}>
      <CircleSticker type={type} text={title} />
      <Text style={[styles.comment, { color: theme.TEXT }]}>{comment}</Text>
      <TextInput
        value={activity}
        onChangeText={onChangeText}
        placeholderTextColor={Colors.BORDER}
        placeholder={`예) ${ritualActivities} 등`}
        style={[styles.inputStyle, { color: theme.TEXT }]}
      />

      <View style={{ marginTop: 20 }}>
        <Text style={[styles.comment, { color: theme.TEXT }]}> 리추얼 활동 시간을 정해보세요.</Text>

        <Dropdown
          data={formattedTimes}
          onChange={(item) => {
            onTimeChange(item.value);
          }}
          placeholder="시간을 선택하세요"
        />
      </View>
    </View>
  );
};

export default SetupForm;

const styles = StyleSheet.create({
  section: {
    marginHorizontal: 35,
    paddingTop: 50,
  },
  comment: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "200",
  },
  inputStyle: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderColor: Colors.PRIMARY,
    lineHeight: 20,
    height: 40,
    fontSize: 16,
  },
});
