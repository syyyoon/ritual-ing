import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Colors from "../constants/colors";
import { SearchScreenNavigation } from "../types/navigation";
import CustomButton from "../components/CustomButton";
import Layout from "../components/Layout";
import { useTheme } from "../context/ThemeContext";

type Props = {
  navigation: SearchScreenNavigation;
};
const SearchScreen = ({ navigation }: Props) => {
  const { theme } = useTheme();
  const closeModal = () => {
    navigation.goBack();
  };

  return (
    <Layout style={{ justifyContent: "flex-end" }}>
      <View style={[styles.modalContent, { backgroundColor: theme.DEFAULT_IMG_BG }]}>
        <TextInput placeholder="Search..." style={styles.input} />
        <CustomButton label="Search" onPress={() => { }} />
        <CustomButton label="Close" onPress={closeModal} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({

  modalContent: {
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
