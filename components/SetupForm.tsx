import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { RitualType } from '../types/ritual'
import CircleSticker from './CircleSticker'
import TimePicker from './TimePicker'
import Colors from '../constants/colors'


type Props = {
  type: RitualType;
  activity: string;
  onChangeText: (activity: string) => void;
  onTimeChange: (time: string) => void;
}
const SetupForm = ({ type, activity, onChangeText, onTimeChange }: Props) => {
  const { theme } = useTheme();
  const title = type.charAt(0).toUpperCase() + type.slice(1) + ` Ritual`;

  const messages = {
    morning: {
      comment: "30분 일찍 일어나 나에게 집중하는 시간을 보내며 몸과 마음을 깨워보세요.",
      ritualActivities: "독서, 명상, 요가, 런닝",
      typeKR: "모닝"
    },
    night: {
      comment: "자기 전 내일의 걱정, 미래의 불안 대신 긍정적 에너지로 채우며 잠들 준비해 보세요.",
      ritualActivities: "산책, 일기, 독서, 홈트",
      typeKR: "나이트"
    }
  };

  const { comment, ritualActivities } = messages[type];


  return (
    <View style={styles.section}>
      <CircleSticker type={type} text={title} />
      <Text style={[styles.comment, { color: theme.TEXT }]}>{comment}</Text>
      <TextInput value={activity} onChangeText={onChangeText} placeholderTextColor={Colors.BORDER} placeholder={`예) ${ritualActivities} 등`} style={[styles.inputStyle, { color: theme.TEXT }]} />

      <View style={{ marginTop: 20 }}>
        <Text style={[styles.comment, { color: theme.TEXT }]}> 리추얼 활동 시간을 정해보세요.</Text>
        <TimePicker time={type} onTimeChange={onTimeChange} />
      </View>
    </View>

  )
}

export default SetupForm

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
    // padding: 10,
    paddingVertical: 0,
    paddingHorizontal: 10,

    borderColor: Colors.PRIMARY,
    lineHeight: 20,
    height: 40,
    fontSize: 16,


    // width: "80%",
    // borderColor: Colors.PRIMARY,
    // borderWidth: 2,
    // borderRadius: 5,
    // paddingVertical: 0,
    // paddingHorizontal: 5,
    // margin: 0,
    // height: 40,
    // backgroundColor: "white",
    // lineHeight: 20,
  },
})
