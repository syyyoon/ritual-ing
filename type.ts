import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RitualData } from "./ritualData";

export type RootStackParamList = {
  Home: undefined;
  Splash: undefined;
  Main: undefined; // drawer 가지고 있는 list page
  RitualSetup1st: undefined;
  RitualSetup2nd: undefined;
  RitualSetup3rd: undefined;
  List: undefined;
  Detail: { item: RitualData };

  ImagePicker: undefined;
  RitualForm: { imageUri: string | null };
  Search: undefined;
  // drawer 안에 있는 스택
  Profile: { userId: number };
  Setting: undefined;
};

export type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;
export type ProfileScreenRouteProp = RouteProp<RootStackParamList, "Profile">;
export type ListScreenRouteProp = RouteProp<RootStackParamList, "List">;
export type RitualFormRouteProp = RouteProp<RootStackParamList, "RitualForm">;

export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "RitualSetup1st">;

// 'Detail' 화면으로 이동하기 위한 네비게이션 타입을 정의
// 네비게이션은 화면간의 이동 역할. 다른 화면으로 이동하거나 현재 화면을 업데이트하는 등의 작업을 수행
export type DetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Detail">;
// 현재 화면에 대한 정보를 제공. 현재 화면의 파라미터와 라우트 관련 정보를 가져오는데 사용
export type DetailScreenRouteProp = RouteProp<RootStackParamList, "Detail">;

export type ImagePickerScreenNavigation = NativeStackNavigationProp<RootStackParamList, "RitualForm">;

// navigation: 화면을 이동하거나 네비게이션 관련 작업을 수행하는 데 사용됨.
// route: 현재 화면에 대한 정보와 파라미터를 읽는 데 사용됨.
// navigation prop은 화면 간 이동을 제어할 때 사용합니다. 이 prop의 두 번째 인자는 이동할 스크린의 이름
// route prop 을 사용하여 현재 화면의 파라미터 타입을 정의.이 prop 의 두번째 인자는 현재 화면의 이름.
