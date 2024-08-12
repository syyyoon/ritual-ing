import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RootStackParamList } from "../types/navigation";
import RitualSetup1stScreen from "../screens/RitualSetup1stScreen";
import RitualSetup2ndScreen from "../screens/RitualSetup2ndScreen";
import RitualSetup3rdScreen from "../screens/RitualSetup3rdScreen";
import DrawerNavigator from "./DrawerNavigator";
import ImagePickerScreen from "../screens/ImagePickerScreen";
import RitualFormScreen from "../screens/RitualFormScreen";
import SearchScreen from "../screens/SearchScreen";
import RitualDetailScreen from "../screens/RitualDetailScreen";
import HomeScreen from "../screens/HomeScreen";
import { Button, Text, View } from "react-native";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleStyle: {
          fontFamily: "NotoSansKR_400Regular",
          fontSize: 15,
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
          </TouchableOpacity>
        ),
      })}
    >
      <RootStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="RitualSetup1st" component={RitualSetup1stScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="RitualSetup2nd" component={RitualSetup2ndScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="RitualSetup3rd" component={RitualSetup3rdScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
      <RootStack.Screen name="ImagePicker" component={ImagePickerScreen} options={{ headerTitle: "Add an image" }} />
      <RootStack.Screen
        name="RitualForm"
        component={RitualFormScreen}
        options={{ headerTitle: "Today's ritual log" }}
      />
      <RootStack.Screen name="Search" component={SearchScreen} options={{ presentation: "modal" }} />
      <RootStack.Screen name="Detail" component={RitualDetailScreen} />
    </RootStack.Navigator>
  );
};

export default AppNavigator;
