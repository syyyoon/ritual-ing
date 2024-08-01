import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 20,
    padding: 10,
  },
});

export default SearchScreen;
