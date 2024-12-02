import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/user";


const USER_DATA_KEY = process.env.EXPO_PUBLIC_USER_DATA_KEY  || "user"

// const USER_DATA_KEY = "user"


const initialUserData  ={
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

// 유저 데이터 조회
export const getUserData = async (): Promise<User | null> => {
  try {
    const storedData = await AsyncStorage.getItem(USER_DATA_KEY);
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error("유저 데이터 가져오기 중 오류 발생:", error);
    return initialUserData
  }
};

//유저 데이터 저장
export const saveUserData = async (user:User) => {
  try {
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    console.log("새로운 유저 데이터 저장 완료!",user);
  } catch (error) {
    console.error("유저 데이터 저장 중 오류 발생:", error);
  }
};

// 유저 데이터 삭제
export const removeUserData = async (USER_DATA_KEY:string) => {
  try {
    await AsyncStorage.removeItem(USER_DATA_KEY);
    console.log(`Item with key "${USER_DATA_KEY}" removed successfully.`);
  } catch (error) {
    console.error(`Failed to remove item with key "${USER_DATA_KEY}":`, error);
  }
};