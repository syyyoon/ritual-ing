import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createDrawerNavigator, DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import ProfileScreen from "../screens/ProfileScreen";
import RitualListScreen from "../screens/RitualListScreen";
import SettingScreen from "../screens/SettingScreen";
import Octicons from "@expo/vector-icons/Octicons";
import Colors from "../constants/colors";
import { useTheme } from "../context/ThemeContext";
import { RitualData } from "../types/ritual";
import { getRitualDataList } from "../service/ritualDataService";

type NavigationProp = DrawerNavigationProp<RootStackParamList>;
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [rituals, setRituals] = useState<RitualData[]>([]);

  const loadRitualListData = async () => {
    const data = await getRitualDataList();
    setRituals(data);
  };

  useEffect(() => {
    loadRitualListData();
  }, []);

  const { theme } = useTheme()
  const navigation = useNavigation<NavigationProp>();
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "NotoSansKR_400Regular",
          fontSize: 15,
          color: theme.TEXT
        },
        headerStyle: {
          height: 110,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: Colors.PRIMARY,
          backgroundColor: theme.BACKGROUND
        },
        drawerLabelStyle: {
          fontFamily: "NotoSansKR_400Regular",
          flex: 1,
          height: 20
        },
        drawerActiveBackgroundColor: Colors.DRAWER_ACTIVE_BG,
        drawerActiveTintColor: Colors.DRAWER_ACTIVE_TEXT,
        drawerInactiveTintColor: Colors.DRAWER_ACTIVE_BG,
        drawerStyle: {
          backgroundColor: theme.BACKGROUND,
          width: 200,
        },
        headerLeft: () => (
          <TouchableOpacity onPress={openDrawer}>
            <View style={styles.headerIconWrapper}>
              <Octicons name="rows" size={18} color={theme.TEXT} />
            </View>
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen
        name="List"
        options={{
          title: "Archive",
          drawerLabel: "Archive",
          headerRight: () => (
            <View style={styles.headerIconWrapper}>
              <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                <Octicons name="search" size={19} color={theme.TEXT} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("ImagePicker")}>
                <Octicons name="plus" size={22} color={theme.TEXT} />
              </TouchableOpacity>
            </View>
          ),
        }}
      >
        {/* component */}
        {() => <RitualListScreen rituals={rituals} setRituals={setRituals} />}
      </Drawer.Screen>

      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Setting" component={SettingScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  headerIconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    gap: 30,
  },
});
