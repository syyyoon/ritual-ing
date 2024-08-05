import React from "react";
import "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createDrawerNavigator, DrawerNavigationProp } from "@react-navigation/drawer";
import ProfileScreen from "../screens/ProfileScreen";
import RitualListScreen from "../screens/RitualListScreen";
import SettingScreen from "../screens/SettingScreen";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../type";
import Octicons from "@expo/vector-icons/Octicons";
import Colors from "../constants/colors";

type NavigationProp = DrawerNavigationProp<RootStackParamList>;
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const navigation = useNavigation<NavigationProp>();
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        // overlayColor: "transparent",
        headerTitleStyle: {
          fontFamily: "NotoSansKR_400Regular",
          fontSize: 15,
        },
        headerStyle: {
          // height: 110, // 헤더 높이 변경
          elevation: 0, // 안드로이드에서 그림자 제거
          shadowOpacity: 0, // iOS에서 그림자 제거
          borderBottomWidth: 2,
          borderBottomColor: Colors.PRIMARY,
        },

        drawerLabelStyle: {
          fontFamily: "NotoSansKR_400Regular",
        },
        drawerActiveBackgroundColor: Colors.DRAWER_ACTIVE_BG,
        drawerActiveTintColor: Colors.DRAWER_ACTIVE_TEXT,
        drawerStyle: {
          backgroundColor: Colors.BACKGROUND,
          width: 200,
        },
        headerLeft: () => (
          <TouchableOpacity onPress={openDrawer}>
            <View style={styles.headerIconWrapper}>
              <Octicons name="rows" size={15} />
            </View>
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen
        name="List"
        component={RitualListScreen}
        options={{
          title: "Archive",
          drawerLabel: "Archive",
          headerRight: () => (
            <View style={styles.headerIconWrapper}>
              <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                <Octicons name="search" size={15} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("ImagePicker")}>
                <Octicons name="plus" size={15} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Setting" component={SettingScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  headerIconWrapper: {
    flexDirection: "row",
    marginHorizontal: 20,
    gap: 18,
  },
});
