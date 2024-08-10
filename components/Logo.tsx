import { StyleSheet, Text, View } from "react-native";
import { useBalooFontsHook } from "../hook/useCustomFonts";

const Logo = () => {
  const { fontsLoaded } = useBalooFontsHook();

  if (!fontsLoaded) return null;
  return (
    <View style={styles.logoContainer}>
      <Text style={[styles.logoStyle, { color: "#F8CD2D" }]}>Ritual </Text>
      <Text style={[styles.logoStyle, { color: "#6F737A" }]}> +ing</Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: "row",
    marginTop: 20,
    paddingVertical: 8,
    justifyContent: "center",
  },
  logoStyle: {
    fontSize: 35,
    fontFamily: "BalooBhai2_800ExtraBold",
  },
});
