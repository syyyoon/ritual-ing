import React, { useState } from "react";
import { ScrollView, View, TextInput, StyleSheet, Text, ActivityIndicator, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import Colors from "../constants/colors";
import { SearchScreenNavigationProp } from "../types/navigation";
import CustomButton from "../components/CustomButton";
import Layout from "../components/Layout";
import { useTheme } from "../context/ThemeContext";
import { RitualData } from "../types/ritual";
import { getRitualDataList } from "../service/ritualDataService";
import FlexRowTexts from "../components/FlexRowTexts";
import { useFocusEffect } from "@react-navigation/native";
import SearchResultCard from "../components/SearchResultCard";


type Props = {
  navigation: SearchScreenNavigationProp;
};
const SearchScreen = ({ navigation }: Props) => {
  const [searchText, setSearchText] = useState<string>("")
  const [filteredData, setFilteredData] = useState<RitualData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearched, setIsSearched] = useState<boolean>(false);

  const { theme } = useTheme();
  const closeModalhandler = () => {
    navigation.goBack();
  };


  const searchHandler = async () => {
    if (!searchText.trim()) {
      return;
    }


    // 리추얼 데이터를 가져오고, 검색어로 필터링
    setIsLoading(true);
    setIsSearched(false);
    const ritualData = await getRitualDataList();
    const filtered = ritualData.filter((item) =>
      item?.title?.toLowerCase().includes(searchText.toLowerCase()) ||

      item?.content?.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredData(filtered);
    setSearchText("")

    // 3초 후 로딩 상태 해제 및 검색 완료 표시
    setTimeout(() => {
      setIsLoading(false);  // 3초 후 로딩 상태를 false로 설정
      setIsSearched(true);  // 검색 완료 시 검색 여부 상태 true로 설정
    }, 3000);

  };

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(false);
      setIsSearched(false);
    }, [])
  );


  return (

    // <KeyboardAvoidingView
    //   style={{ flex: 1 }}
    //   behavior={"height"}
    //   keyboardVerticalOffset={50}
    // >
    <Layout>
      {isLoading ? (  // 로딩 상태일 때 로딩중 메시지 표시
        <View style={styles.indicatorWrapper}>
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
          <Text style={{ color: theme.TEXT }}>조회중</Text>
        </View>
      ) : (
        <View>
          {isSearched && filteredData.length === 0 ? (
            // 검색 결과가 없을 때 표시할 메시지
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text style={{ color: theme.TEXT }}>검색한 단어에 대한 리추얼이 존재하지 않습니다.</Text>
            </View>
          ) : (
            // 검색 결과가 있을 때 데이터를 보여줌
            <View style={styles.listContainer}>
              <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id.toString()}
                numColumns={1}
                contentContainerStyle={{ paddingBottom: 180 }}
                showsVerticalScrollIndicator={true}
                renderItem={({ item }) => (
                  <View style={styles.cardContainer} >
                    <TouchableOpacity onPress={() => {
                      closeModalhandler()
                      navigation.navigate("Detail", { item })
                    }}>
                      <SearchResultCard item={item} />
                    </TouchableOpacity>

                  </View>
                )}
              />
            </View>
          )}
        </View>
      )
      }
      <View style={[styles.modalContent, { backgroundColor: theme.DEFAULT_IMG_BG, }]}>
        <TextInput placeholder="단어로 리추얼 로그를 찾아보세요 :)" placeholderTextColor={Colors.BORDER} style={[styles.input, { color: theme.TEXT }]} value={searchText} onChangeText={setSearchText} />
        <FlexRowTexts
          first={<CustomButton label="Search" theme="dark" onPress={searchHandler} />}
          second={<CustomButton label="Close" theme="light" onPress={closeModalhandler} />}
          style={{ marginTop: 10, justifyContent: "space-between" }}
        />

      </View>
    </Layout>
    // </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  indicatorWrapper: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    margin: "30%"
  },

  modalContent: {
    padding: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: 200,
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "gray",
    flexDirection: "column",
    alignItems: "center",
  },

  input: {
    width: "90%",
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    marginBottom: 20,
    padding: 10,

  },

  listContainer: {
    padding: 20,
  },
  cardContainer: {
    width: "100%",
    marginBottom: 10,
  }
});

export default SearchScreen;
