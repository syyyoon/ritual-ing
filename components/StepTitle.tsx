import { StyleSheet, Text, View } from "react-native";
import { useComfortaaFontsHook } from "../hook/useCustomFonts";
import { useTheme } from "../context/ThemeContext";

type Props = {
  mainTitle: string;
  subTitle: string;
};

const StepTitle = ({ mainTitle, subTitle }: Props) => {
  const { fontsLoaded } = useComfortaaFontsHook();
  const { theme } = useTheme()

  if (!fontsLoaded) return null;
  return (
    <View style={styles.layout}>
      <Text style={[styles.mainText, { color: theme.TEXT }]}>{mainTitle}</Text>
      <Text style={[styles.subText, { color: theme.TEXT }]}>{subTitle}</Text>
    </View>
  );
};

export default StepTitle;

const styles = StyleSheet.create({
  layout: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  mainText: { fontFamily: "Comfortaa_700Bold", fontSize: 22, marginBottom: 10 },
  subText: { fontFamily: "Comfortaa_400Regular", fontSize: 20 },
});
