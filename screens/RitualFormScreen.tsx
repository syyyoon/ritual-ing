import { useRoute } from "@react-navigation/native";
import { RitualFormRouteProp } from "../types/navigation";
import Editor from "../components/Editor";
import Layout from "../components/Layout";

//  리추얼 생성 스크린
const RitualFormScreen = () => {
  const route = useRoute<RitualFormRouteProp>();
  const { imageUri } = route.params;

  return (
    <Layout>
      <Editor image={imageUri} isEdit={false} />
    </Layout>
  );
};

export default RitualFormScreen;
