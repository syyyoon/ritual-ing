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
import useUserStore from "../store/userStore";


const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { theme } = useTheme()

  const { userData, loadUserData } = useUserStore();


  useEffect(() => {
    const initializeApp = async () => {
      console.log("Initializing App...");
      setIsLoading(true); // 로딩 시작
      try {
        await loadUserData(); // userData 상태 업데이트
      } catch (error) {
        console.warn("Failed to load user data:", error);
      } finally {
        setIsLoading(false); // 로딩 완료
      }
    };

    initializeApp();
  }, [loadUserData]);

  useEffect(() => {
    if (isLoading) return; // 로딩 중일 때는 실행 안 함
    console.log("Final UserData:", userData);
    if (userData?.setupDone) {
      setInitialRoute("Main");
    } else {
      setInitialRoute("Home");
    }
  }, [isLoading, userData]); // isLoading이 완료되고 userData가 변경될 때 실행




  if (isLoading || !initialRoute) {
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
            <MaterialIcons name="keyboard-arrow-left" size={28} color={theme.TEXT} />
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
        options={{ headerTitle: "Record a ritual log" }}
      />
      <RootStack.Screen name="Search" component={SearchScreen} options={{ presentation: "modal" }} />
      <RootStack.Screen name="Detail" component={RitualDetailScreen} />
    </RootStack.Navigator>
  );
};

export default AppNavigator;
