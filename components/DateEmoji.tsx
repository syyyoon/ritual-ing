import { StyleSheet, TouchableOpacity } from "react-native";
import React, { memo, useEffect, useState } from "react";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useBalooFontsHook } from "../hook/useCustomFonts";
import { throttle } from 'lodash';



type DateEmojiProps = {
  text: string;
  color: string;
  deleteEmoji: () => void;
  openModal: () => void;

};

const DateEmoji: React.FC<DateEmojiProps> = ({ text, color, deleteEmoji, openModal, }) => {
  const [showTrashIcon, setShowTrashIcon] = useState(false);

  const { fontsLoaded } = useBalooFontsHook();

  const isFullDateText = text.includes("+");

  //  이미지 드래그 시 X,Y값 0,0 으로 초기 위치 설정 (시작점)
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);


  const drag = Gesture.Pan().onChange(
    throttle((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    }, 16) // 16ms로 호출 빈도 제한
  );

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    };
  });

  const handleLongPress = () => {
    setShowTrashIcon((prev) => !prev);
  };


  if (!fontsLoaded) return null;
  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[styles.container, containerStyle]}>
        <TouchableOpacity onLongPress={handleLongPress} >
          {isFullDateText ? (
            <>
              <Animated.Text style={[styles.date, styles.firstLineText, { color: color }]}>
                {text.split("+")[0]}
              </Animated.Text>
              <Animated.Text style={[styles.date, styles.secondLineText, { color: color }]}>
                {text.split("+")[1]}
              </Animated.Text>
            </>
          ) : (
            <Animated.Text style={[styles.date, { color: color }]}>{text}</Animated.Text>
          )}
          {showTrashIcon && (
            <Ionicons name="close-circle" size={20} color={color} onPress={deleteEmoji} style={styles.trashIcon} />
          )}
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
};

export default DateEmoji;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
  date: {
    fontFamily: "BalooBhai2_700Bold",
    fontSize: 30,
    textAlign: "center",
  },
  firstLineText: {
    fontSize: 30,
  },
  secondLineText: { fontSize: 23, marginTop: -18 },

  trashIcon: {
    position: "absolute",
    right: -25,
    top: 10,
  },
});
