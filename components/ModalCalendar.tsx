import { Modal, StyleSheet, View } from "react-native";
import React from "react";
import { Calendar, DateData } from "react-native-calendars";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTheme } from "../context/ThemeContext";

type CalendarProps = {
  visible: boolean;
  onClose: () => void;
  onSelectDate: (date: string) => void;
  selectedDate: string;
};

const ModalCalendar = ({ visible, onClose, onSelectDate, selectedDate }: CalendarProps) => {
  const { theme } = useTheme()
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={[styles.modalContainer, { backgroundColor: theme.BACKGROUND }]}>
        <AntDesign
          name="close"
          size={24}
          onPress={onClose}
          style={{ textAlign: "right", marginRight: 20, marginBottom: 20, color: theme.BACKGROUND }}
        />
        <Calendar
          onDayPress={(day: DateData) => {
            onSelectDate(day.dateString);
            onClose();
          }}
          markedDates={{
            [selectedDate]: { selected: true },
          }}
        />
      </View>
    </Modal>
  );
};

export default ModalCalendar;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
