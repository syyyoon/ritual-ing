import { create } from "zustand";
import { User } from "../types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_DATA_KEY = process.env.EXPO_PUBLIC_USER_DATA_KEY || "user";

const initialUserData = {
  id: 0,
  nickname: "",
  profileImageUrl: "",
  morningRitual: {
    activity: "",
    time: "",
    isPushEnabled: false,
    notificationId: "",
  },
  nightRitual: {
    activity: "",
    time: "",
    isPushEnabled: false,
    notificationId: "",
  },
  setupDone: false,
};

interface Store {
  userData: User;
  setUserData: (userData: User) => Promise<void>;
  loadUserData: () => Promise<void>;
  clearUserData: () => Promise<void>;
}

const useUserStore = create<Store>((set) => ({
  userData: initialUserData,
  // 유저 데이터 저장
  setUserData: async (userData) => {
    console.log("setUserData!", userData);
    set({ userData }); // zustand state 업데이트
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData)); // AsyncStorage에 저장
  },
  // 유저 데이터 조회
  loadUserData: async () => {
    try {
      const storedUserData = await AsyncStorage.getItem(USER_DATA_KEY);
      if (storedUserData) {
        set({ userData: JSON.parse(storedUserData) });
      }
    } catch (error) {
      console.error("Failed to load user data from AsyncStorage:", error);
    }
  },
  // 유저데이터 삭제
  clearUserData: async () => {
    set({ userData: initialUserData });
    await AsyncStorage.removeItem(USER_DATA_KEY);
    console.log("clear User data");
  },
}));

export default useUserStore;
