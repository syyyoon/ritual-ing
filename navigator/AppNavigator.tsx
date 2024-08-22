import React, { useEffect, useState } from "react";
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
import { useTheme } from "../context/ThemeContext";
import { getUserData } from "../service/userDataService";


const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList>("Home");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { theme } = useTheme()

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const user = await getUserData();

        if (
          user?.id !== undefined &&
          user.nickname.length > 1 &&
          user.morningRitual?.activity.length > 0 &&
          user.nightRitual?.activity.length > 0
        ) {
          setInitialRoute("Main");
        } else {
          setInitialRoute("Home");
        }
      } catch (error) {
        console.warn("Failed to load user data:", error);
        setInitialRoute("Home");
      } finally {
        setIsLoading(false);
      }
    };

    checkUserData();
  }, []);

  if (isLoading) {
    return null;
  }
  return (
    <RootStack.Navigator
      initialRouteName={initialRoute}
      screenOptions={({ navigation }) => ({
        headerTitleStyle: {
          fontFamily: "NotoSansKR_400Regular",
          fontSize: 15,
        },
        headerTintColor: theme.TEXT,
        headerStyle: {
          backgroundColor: theme.BACKGROUND

        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="keyboard-arrow-left" size={24} color={theme.TEXT} />
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
