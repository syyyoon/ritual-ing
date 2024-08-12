import AsyncStorage from "@react-native-async-storage/async-storage";
import { RitualData } from "../types/ritual";

const RITUAL_DATA_KEY = "ritualDataList";

export const getRitualDataList = async (): Promise<RitualData[]> => {
  try {
    const storedData = await AsyncStorage.getItem(RITUAL_DATA_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error("리추얼 데이터 가져오기 중 오류 발생:", error);
    return [];
  }
};

// 리추얼 데이터 저장
export const saveRitualDataList = async (ritualDataList: RitualData[]) => {
  try {
    await AsyncStorage.setItem(RITUAL_DATA_KEY, JSON.stringify(ritualDataList));
    console.log("새로운 리추얼 데이터가 성공적으로 저장되었습니다!");
  } catch (error) {
    console.error("리추얼 데이터 저장 중 오류 발생:", error);
  }
};

// 리추얼 데이터 삭제
export const deleteRitualData = async (id: number) => {
  try {
    const ritualDataList = await getRitualDataList();
    const updatedRitualDataList = ritualDataList.filter((ritual) => ritual.id !== id);
    await saveRitualDataList(updatedRitualDataList);
  } catch (error) {
    console.error("리추얼 데이터 삭제 중 오류 발생:", error);
  }
};
