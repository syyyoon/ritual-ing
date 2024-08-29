import AsyncStorage from "@react-native-async-storage/async-storage";
import { RitualData } from "../types/ritual";
import { Alert } from "react-native";

const RITUAL_DATA_KEY = "ritualDataList";

export const getRitualDataList = async (): Promise<RitualData[]> => {
  try {
    const storedData = await AsyncStorage.getItem(RITUAL_DATA_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
     Alert.alert("알림", "리추얼 데이터 조회 중 오류가 발생했습니다. 다시 시도해주세요.");
    return [];
  }
};

// 리추얼 데이터 저장
export const saveRitualDataList = async (ritualDataList: RitualData[]) => {
  try {
    await AsyncStorage.setItem(RITUAL_DATA_KEY, JSON.stringify(ritualDataList));
   Alert.alert("알림", "오늘 리추얼 성공!");
  } catch (error) {
   Alert.alert("알림", "리추얼 저장 중 오류가 발생했습니다.");
  }
};

// 리추얼 데이터 삭제
export const deleteRitualData = async (id: number) => {
  try {
    const ritualDataList = await getRitualDataList();
    const updatedRitualDataList = ritualDataList.filter((ritual) => ritual.id !== id);
    await saveRitualDataList(updatedRitualDataList);
  } catch (error) {
     Alert.alert("알림", "리추얼 삭제 중 오류가 발생했습니다.");
  }
};
