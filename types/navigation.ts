import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RitualData } from "./ritual";

export type RootStackParamList = {
  Home: undefined; 
  RitualSetup1st: undefined;
  RitualSetup2nd: undefined;
  RitualSetup3rd: undefined;
  Splash: undefined;
  Main: undefined; 
  List: undefined;
  Profile: { userId: string };
  Setting: undefined;
  ImagePicker: undefined;
  RitualForm: { imageUri: string | null };
  Search: undefined;
  Detail: { item: RitualData };
};

//Route
export type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;
export type ProfileScreenRouteProp = RouteProp<RootStackParamList, "Profile">;
export type ListScreenRouteProp = RouteProp<RootStackParamList, "List">;
export type RitualFormRouteProp = RouteProp<RootStackParamList, "RitualForm">;
export type DetailScreenRouteProp = RouteProp<RootStackParamList, "Detail">;

// Navigation
export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;
export type RitualSetup1stNavigationProp = NativeStackNavigationProp<RootStackParamList, "RitualSetup1st">;
export type RitualSetup2ndNavigationProp = NativeStackNavigationProp<RootStackParamList, "RitualSetup2nd">;
export type RitualSetup3rdNavigationProp = NativeStackNavigationProp<RootStackParamList, "RitualSetup3rd">;

export type ListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "List">;
export type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,"Profile">
export type DetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Detail">;
export type ImagePickerScreenNavigation = NativeStackNavigationProp<RootStackParamList, "ImagePicker">;
export type RitualFormScreenNavigation = NativeStackNavigationProp<RootStackParamList, "RitualForm">;
export type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Search">;
export type SettingScreenNavigation = NativeStackNavigationProp<RootStackParamList, "Setting">;



