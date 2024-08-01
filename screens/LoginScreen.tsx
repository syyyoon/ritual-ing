import { View, Text, Button, Image, TouchableHighlight, StyleSheet } from "react-native";
import React from "react";
// import { useAuth } from "../context/authProvider";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../type";

// export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Root">;

// type Props = {
//   navigation: NativeStackNavigationProp<RootStackParamList, "">;
// };
const LoginScreen = () => {
  // const { logIn } = useAuth();
  const loginHandler = () => {
    // logIn();
  };
  return (
    <View style={styles.viewStyle}>
      <TouchableHighlight onPress={loginHandler}>
        <Image source={require("../assets/kakao_login_medium.png")} />
      </TouchableHighlight>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
