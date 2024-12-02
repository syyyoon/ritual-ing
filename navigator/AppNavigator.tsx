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
// import { getUserData } from "../service/userDataService";
import useUserStore from "../store/userStore";


const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList>("Home");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { theme } = useTheme()

  const { userData, loadUserData } = useUserStore();


  useEffect(() => {
    const initializeApp = async () => {
      try {
        await loadUserData(); // AsyncStorage 접근하여 set user data
        console.log('setup done? ', userData?.setupDone)
        if (userData?.setupDone) {

          // 기존 회원일 경우 'Main' 페이지가 첫페이지
          setInitialRoute("Main");
          console.log("기존 회원이니까 메인 페이지!")
        }
        // 아닐경우 'Home" 페이지가 첫페이지
        console.log("신규 회원이니까 로그인페이지!")

      } catch (error) {
        console.warn("Failed to load user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [loadUserData]);

  // useEffect(() => {
  //   const checkUserData = async () => {
  //     try {
  //       // const user = await getUserData();
  //       if (userData?.setupDone) {
  //         initialRoute.current = "Main";  // Ref를 사용하여 상태 업데이트가 아닌 직접 참조
  //       }
  //     } catch (error) {
  //       console.warn("Failed to load user data:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   checkUserData();
  // }, []);


  // useEffect(() => {
  //   const checkUserData = async () => {
  //     try {
  //       await loadUserData(); // zustand에서 유저 데이터 로드
  //     } catch (error) {
  //       console.warn("Failed to load user data:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   checkUserData();
  // }, [loadUserData]);

  if (isLoading) {
    return null;
  }
  return (
    <RootStack.Navigator
      // initialRouteName={initialRoute.current}
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
