import React, { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as SplashScreen from "expo-splash-screen";
import { DetailScreenRouteProp } from "../types/navigation";
import { RitualData } from "../types/ritual";
import Editor from "../components/Editor";
import CustomText from "../components/CustomText";
import Layout from "../components/Layout";
import { getRitualDataList } from "../service/ritualDataService";
import { checkFileExists } from "../utils/checkFileExists";

const RitualDetailScreen = () => {
  const [originData, setOriginData] = useState<RitualData | undefined>();
  const route = useRoute<DetailScreenRouteProp>();
  const { item } = route.params;

  // const checkFileExists = async (fileUri: string) => {
  //   const fileInfo = await FileSystem.getInfoAsync(fileUri);
  //   console.log("File exists:", fileInfo.exists);
  // };

  useEffect(() => {
    const fetchRitualData = async () => {
      try {
        const ritualLists = await getRitualDataList();
        const existingData = ritualLists.find((ritual) => ritual.id === item.id);

        if (existingData) {
          setOriginData(existingData);
          checkFileExists(`file://${existingData.imageUrl}`)
        } else {
          Alert.alert("알림", "해당 데이터를 찾을 수 없습니다.");
        }
      } catch (error) {
        Alert.alert("알림", "리추얼 데이터 가져오기 중 오류 발생.");
      } finally {
        SplashScreen.hideAsync();
      }
    };

    SplashScreen.preventAutoHideAsync();
    fetchRitualData();
  }, [item]);

  if (!originData) {
    return (
      <Layout>
        <CustomText style={styles.noContent}>
          해당 데이터 없음
        </CustomText>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <Editor isEdit originData={originData} image={originData?.imageUrl ?? null} />
      </Layout>
    );
  }
};

export default RitualDetailScreen;

const styles = StyleSheet.create({
  noContent: {
    textAlign: "center",
    marginTop: "20%"
  }
})
