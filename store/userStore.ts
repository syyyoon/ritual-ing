
import {create} from "zustand"
import { User } from '../types/user';  
import AsyncStorage from "@react-native-async-storage/async-storage";


const USER_DATA_KEY = process.env.EXPO_PUBLIC_USER_DATA_KEY  || "user"

const initialUserData  = {
  id: 0,
  nickname: "",
  profileImageUrl: "",
  morningRitual :{
    activity:"string",
    time:"",
    isPushEnabled:false,

  },
  nightRitual :{
    activity:"",
    time:"",
    isPushEnabled:false,
  },
  setupDone:false

};

interface Store {
  userData: User;
  setUserData: (userData: User) => Promise<void>;
  loadUserData: () => Promise<void>;
  clearUserData: () => Promise<void>;
}



// zustand store 정의
const useUserStore = create<Store>((set) => ({
  userData: initialUserData,
  // 유저 데이터 저장
  setUserData: async (userData) => {
    console.log('setUserData!')
    set({ userData }); // zustand state 업데이트
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData)); // AsyncStorage에 저장
  },
  // 유저 데이터 조회
  loadUserData: async () => {
    console.log('loadUserdata 실행!')
    try {
      const storedUserData = await AsyncStorage.getItem(USER_DATA_KEY);
      if (storedUserData) {
        set({ userData: JSON.parse(storedUserData) }); // AsyncStorage에서 데이터를 불러와 zustand 상태 업데이트
      }
    } catch (error) {
      console.error("Failed to load user data from AsyncStorage:", error);
    }
  },
  // 유저데이터 삭제
  clearUserData: async () => {
    console.log('clear User data')
    set({ userData: initialUserData }); // zustand 상태 초기화
    await AsyncStorage.removeItem(USER_DATA_KEY); 
  },
}));

export default useUserStore;