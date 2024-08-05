import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Colors from "../constants/colors";

const SearchScreen = () => {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <TextInput placeholder="Search..." style={styles.input} />
        <Button title="Close" onPress={closeModal} />
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
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    marginBottom: 20,
    padding: 10,
  },
});

export default SearchScreen;
