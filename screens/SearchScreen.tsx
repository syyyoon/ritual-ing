import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import Colors from "../constants/colors";
import { SearchScreenNavigation } from "../types/navigation";
import CustomButton from "../components/CustomButton";

type Props = {
  navigation: SearchScreenNavigation;
};
const SearchScreen = ({ navigation }: Props) => {
  const closeModal = () => {
    // navigation.navigate("List");
    navigation.goBack();
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <TextInput placeholder="Search..." style={styles.input} />
        <CustomButton label="Search" onPress={() => {}} />
        <CustomButton label="Close" onPress={closeModal} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: Colors.SECONDARY,
  },
  modalContent: {
    backgroundColor: Colors.BACKGROUND,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 300,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    marginBottom: 20,
    padding: 10,
  },
});

export default SearchScreen;
