import { ActivityIndicator, Alert, Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Colors from "../constants/colors";
import { User } from "../types/user";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { getUserData, saveUserData } from "../service/userDataService";
import { getRitualDataList } from "../service/ritualDataService";
import { RitualData } from "../types/ritual";
import CircleSticker from "../components/CircleSticker";
import CustomText from "../components/CustomText";
import FlexRowTexts from "../components/FlexRowTexts";
import IconButton from "../components/IconButton";
import Layout from "../components/Layout";
import Carousel from "../components/Carousel";
import { ProfileScreenNavigationProp } from "../types/navigation";


const ProfileScreen = ({ }) => {

  const [userData, setUserData] = useState<User | null>(null)
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [originalProfileImage, setOriginalProfileImage] = useState<string | undefined>(undefined);
  const [logQty, setLogQty] = useState({ morning: 0, night: 0 })
  // const [ritualData, setRitualData] = useState<RitualData[] | null>(null)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [likedRituals, setLikedRituals] = useState<RitualData[] | null>(null)


  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const navigateDetailScreen = (item: RitualData) => {
    navigation.navigate("Detail", { item })
  }




  // 로컬 파일 경로나 URL로 이미지를 설정
  const images: ImageSourcePropType[] = likedRituals?.map((ritual) => (
    { uri: ritual.imageUrl }
  )) || [];



  const pickImage = async () => {

    const { granted } = await MediaLibrary.requestPermissionsAsync();
    if (!granted) {
      Alert.alert("알림", "사진 접근 권한이 필요합니다.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setOriginalProfileImage(profileImage);
      setProfileImage(result.assets[0].uri);
      setEditMode(true)
    } else {
      Alert.alert("알림", "선택한 사진이 없습니다.");
      setEditMode(false);
    }
  }

  const changeProfileImage = async () => {
    if (!profileImage || !userData) return;
    const updatedUserData = {
      ...userData,
      profileImageUrl: profileImage,
    };

    await saveUserData(updatedUserData)
    setUserData(updatedUserData);
    setEditMode(false)
    Alert.alert("알림", "프로필 이미지가 성공적으로 변경되었습니다.");
  }

  const resetImage = () => {
    setProfileImage(originalProfileImage);
    setEditMode(false);
  }

  const fetchUserDataAndRituals = async () => {
    const [userData, ritualData] = await Promise.all([getUserData(), getRitualDataList()])
    setUserData(userData)
    setProfileImage(userData?.profileImageUrl)
    const morgningRitual = ritualData.filter((it) => it.type === "morning").length
    const nightRitual = ritualData.filter((it) => it.type === "night").length
    const likedRitual = ritualData.filter((it) => it.like === true)
    setLogQty({ morning: morgningRitual, night: nightRitual })
    setLikedRituals(likedRitual)

  };



  useFocusEffect(
    React.useCallback(() => {
      fetchUserDataAndRituals();
      setEditMode(false)
    }, [])
  );

  if (!userData) {
    return (
      <Layout>
        <ActivityIndicator />
      </Layout>

    );
  }


  return (
    <Layout>
      <View style={{ padding: 20 }}>
        <View style={styles.imageSection}>
          {profileImage ? <Image source={{ uri: profileImage }} style={styles.profileImage} /> : <Image source={require("../assets/default.png")} style={styles.profileImage} />}

          {editMode ?
            <View style={styles.buttonsContainer}>
              <IconButton iconType="MaterialIcons" icon="check" onPress={changeProfileImage} size="small" />
              <IconButton iconType="MaterialIcons" icon="settings-backup-restore" onPress={resetImage} size="small" />
            </View>
            :
            <View style={styles.buttonsContainer}>
              <IconButton iconType="MaterialIcons" icon="edit" onPress={pickImage} size="small" />
            </View>

          }
        </View>

        <View style={styles.section}>
          <CustomText style={{ textAlign: "center" }} fontSize={20}>{userData.nickname} / {userData.id} </CustomText>
        </View>

        <View style={styles.section}>
          <CircleSticker type="morning" text="Morinig Ritual" />
          <FlexRowTexts style={styles.marginLeft} gap={10} first={<CustomText fontSize={16}> ◦ 나의 모닝 리추얼 :</CustomText>} second={<CustomText fontSize={16}>{userData.morningRitual.activity}</CustomText>} />
          <CustomText style={styles.marginLeft} fontSize={16}> ◦ Number of days : {logQty.morning} days</CustomText>
        </View>
        <View style={styles.section}>

          <CircleSticker type="night" text="Night Ritual" />
          <FlexRowTexts style={styles.marginLeft} gap={10} first={<CustomText fontSize={16}> ◦ 나의 나이트 리추얼 :</CustomText>} second={<CustomText fontSize={16}>{userData.nightRitual.activity}</CustomText>} />
          <CustomText style={styles.marginLeft} fontSize={16}> ◦ Number of days : {logQty.night} days</CustomText>
        </View>

        <View style={styles.section}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <CircleSticker type="all" text="Ritual Logs You Liked" />
          </View>

          {likedRituals?.length === 0 ? (
            <CustomText style={{ marginLeft: 30 }}>아직 좋아요를 누른 리추얼 로그가 없습니다.</CustomText>

          ) : (
            <View style={{ height: 220 }}>
              {/* likedRituals가 null 일때, undefined로 변환 */}
              <Carousel images={images} rituals={likedRituals || undefined} onImagePress={navigateDetailScreen} />
            </View>
          )}
        </View>
      </View>
    </Layout>

  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  section: {
    paddingVertical: 8
  },
  imageSection: {
    flexDirection: "column",
    alignItems: "center",
  },
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 20,
  },

  profileImage: {
    width: 150,
    height: 150,
    borderWidth: 5,
    borderRadius: 80,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.DRAWER_ACTIVE_TEXT,
  },
  marginLeft: {
    marginLeft: 25,
  }
});
