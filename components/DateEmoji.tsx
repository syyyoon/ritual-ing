import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useBalooFontsHook } from "../hook/useCustomFonts";

type Props = {
  text: string;
  color: string;
  deleteEmoji: () => void;
  openModal: () => void;
};

const DateEmoji = ({ text, color, deleteEmoji, openModal }: Props) => {
  const [showTrashIcon, setShowTrashIcon] = useState(false);
  const { fontsLoaded } = useBalooFontsHook();

  const isLongDateEmoji = text.includes("+");

  //  이미지 드래그 시 X,Y값 0,0 으로 초기 위치 설정 (시작점)
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  //   drag pan 제스처를 처리할 객체 생성
  const drag = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    };
  });
  // 길게 누르면 휴지통 아이콘 visible
  const handleLongPress = () => {
    setShowTrashIcon((prev) => !prev);
  };

  useEffect(() => {
    setShowTrashIcon(false);
  }, [text]);

  if (!fontsLoaded) return null;
  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[styles.container, containerStyle]}>
        <TouchableOpacity onLongPress={handleLongPress} onPress={openModal}>
          {isLongDateEmoji ? (
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
