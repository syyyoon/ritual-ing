import { SafeAreaView, StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { RitualFormRouteProp } from "../types/navigation";
import Editor from "../components/Editor";
import Colors from "../constants/colors";

const RitualFormScreen = () => {
  const route = useRoute<RitualFormRouteProp>();
  const { imageUri } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainSection}>
        <Editor image={imageUri} isEdit={false} />
      </View>
    </SafeAreaView>
  );
};

export default RitualFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  mainSection: {
    marginTop: 10,
    flexDirection: "row",
  },
});
