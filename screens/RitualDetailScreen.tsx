import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";

import Colors from "../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import * as SplashScreen from "expo-splash-screen";
import Editor from "../components/Editor";
import { RitualData } from "../types/ritual";
import { DetailScreenRouteProp } from "../types/navigation";
import CustomText from "../components/CustomText";

const RitualDetailScreen = () => {
  const [originData, setOriginData] = useState<RitualData | undefined>();
  const route = useRoute<DetailScreenRouteProp>();

  const { item } = route.params;

  const checkFileExists = async (fileUri: string) => {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    console.log("File exists:", fileInfo.exists);
  };

  useEffect(() => {
    const fetchRitualData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("ritualDataList");
        const ritualDataList: RitualData[] = storedData ? JSON.parse(storedData) : [];
        const existingData = ritualDataList.find((ritual) => ritual.id === item.id);

        if (existingData) {
          setOriginData(existingData);
          checkFileExists(`file://${existingData.imageUrl}`);
        } else {
          Alert.alert("오류", "해당 데이터를 찾을 수 없습니다.");
        }
      } catch (error) {
        Alert.alert("오류", "리추얼 데이터 가져오기 중 오류 발생.");
        console.error("리추얼 데이터 가져오기 중 오류 발생:", error);
      } finally {
        // setLoading(false);
        SplashScreen.hideAsync(); // 데이터 로딩 후 스플래시 화면 숨기기
      }
    };

    SplashScreen.preventAutoHideAsync();
    fetchRitualData();
  }, [item]);

  if (!originData) {
    return (
      <View style={styles.container}>
        <CustomText fontSize={20} style={{ textAlign: "center", marginTop: "20%" }}>
          데이터 없음
        </CustomText>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Editor isEdit originData={originData} image={originData?.imageUrl ?? null} />
      </View>
    );
  }
};

export default RitualDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  topBorder: {
    borderTopWidth: 2,
    borderColor: Colors.PRIMARY,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.5,
    backgroundColor: "blue",
  },
});
