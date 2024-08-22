import { StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { RitualFormRouteProp } from "../types/navigation";
import Editor from "../components/Editor";
import Layout from "../components/Layout";

const RitualFormScreen = () => {
  const route = useRoute<RitualFormRouteProp>();
  const { imageUri } = route.params;

  return (
    <Layout>
      <View style={styles.mainSection}>
        <Editor image={imageUri} isEdit={false} />
      </View>
    </Layout>
  );
};

export default RitualFormScreen;

const styles = StyleSheet.create({
  mainSection: {
    flexDirection: "row",
  },
});
