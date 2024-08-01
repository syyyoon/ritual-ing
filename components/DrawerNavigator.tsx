import React from "react";
import "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import { createDrawerNavigator, DrawerNavigationProp } from "@react-navigation/drawer";
import ProfileScreen from "../screens/ProfileScreen";
import RitualListScreen from "../screens/RitualListScreen";
import SettingScreen from "../screens/SettingScreen";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../type";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Octicons from "@expo/vector-icons/Octicons";

import { TouchableOpacity } from "react-native-gesture-handler";

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
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
        headerTitleStyle: {
          fontWeight: "200",
        },
        headerStyle: {
          height: 100, // 헤더 높이 변경
          elevation: 0, // 안드로이드에서 그림자 제거
          shadowOpacity: 0, // iOS에서 그림자 제거
          borderBottomWidth: 3, // 보더 제거
          borderBottomColor: "#F8CD2D",
        },
        headerLeft: () => (
          <TouchableOpacity onPress={openDrawer}>
            <View style={{ marginLeft: 10 }}>
              <Entypo name="dots-two-vertical" size={24} />
            </View>
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen
        name="List"
        component={RitualListScreen}
        options={{
          title: "리추얼 목록",
          // headerLeft: () => (
          //   <TouchableOpacity onPress={openDrawer}>
          //     <View style={{ marginLeft: 10 }}>
          //       <Entypo name="dots-two-vertical" size={24} />
          //     </View>
          //   </TouchableOpacity>
          // ),
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                <Octicons name="search" size={20} style={styles.icon} onPress={() => console.log("Search Pressed")} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("RitualForm")}>
                <MaterialIcons name="add" size={28} />
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
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
  },
});
