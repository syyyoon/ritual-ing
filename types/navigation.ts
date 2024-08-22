import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RitualData } from "./ritual";

export type RootStackParamList = {
  Home: undefined; // init screen
  RitualSetup1st: undefined;
  RitualSetup2nd: undefined;
  RitualSetup3rd: undefined;
  Splash: undefined;
  Main: undefined; // drawer navigator
  List: undefined;
  Profile: { userId: string };
  Setting: undefined;

  ImagePicker: undefined;
  RitualForm: { imageUri: string | null };
  Search: undefined;
  Detail: { item: RitualData };
  //  Feed: { sort: 'latest' | 'top' } | undefined;
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

export type DetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Detail">;
export type ImagePickerScreenNavigation = NativeStackNavigationProp<RootStackParamList, "ImagePicker">;
export type RitualFormScreenNavigation = NativeStackNavigationProp<RootStackParamList, "ImagePicker">;
export type SearchScreenNavigation = NativeStackNavigationProp<RootStackParamList, "Search">;
export type SettingScreenNavigation = NativeStackNavigationProp<RootStackParamList, "Setting">;



