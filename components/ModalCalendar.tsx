import { Button, Modal, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { Calendar, DateData } from "react-native-calendars";
import Colors from "../constants/colors";

import AntDesign from "@expo/vector-icons/AntDesign";
import CustomText from "./CustomText";

type CalendarProps = {
  visible: boolean;
  onClose: () => void;
  onSelectDate: (date: string) => void;
  selectedDate: string;
};

const ModalCalendar = ({ visible, onClose, onSelectDate, selectedDate }: CalendarProps) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <AntDesign
          name="close"
          size={24}
          onPress={onClose}
          style={{ textAlign: "right", marginRight: 20, marginBottom: 20, color: "white" }}
        />
        <Calendar
          // theme={{
          //   backgroundColor: "#ffffff",
          //   calendarBackground: Colors.BACKGROUND,
          //   textSectionTitleColor: "#b6c1cd",
          //   selectedDayBackgroundColor: Colors.PRIMARY,
          //   selectedDayTextColor: "#ffffff",
          //   todayTextColor: "#1866e3",
          //   dayTextColor: "#2d4150",
          //   textDisabledColor: "#a8a7a9",
          // }}
          onDayPress={(day: DateData) => {
            onSelectDate(day.dateString);
            onClose();
          }}
          markedDates={{
            [selectedDate]: { selected: true },
          }}
        />

        {/* <Button title="close" onPress={onClose} /> */}
      </View>
    </Modal>
  );
};

export default ModalCalendar;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: Colors.BACKGROUND_DARK,
  },
});
