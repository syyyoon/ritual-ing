import { ActivityIndicator, Alert, Button, Image, ImageSourcePropType, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Colors from "../constants/colors";
import { User } from "../types/user";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { getRitualDataList } from "../service/ritualDataService";
import { RitualData, RitualType } from "../types/ritual";
import CircleSticker from "../components/CircleSticker";
import CustomText from "../components/CustomText";
import FlexRowTexts from "../components/FlexRowTexts";
import IconButton from "../components/IconButton";
import Layout from "../components/Layout";
import Carousel from "../components/Carousel";
import { ProfileScreenNavigationProp } from "../types/navigation";
import CustomButton from "../components/CustomButton";
import useUserStore from "../store/userStore";
import TimePicker from "../components/TimePicker";
import LoadingIcon from "../components/LoadingIcon";
import UserRitualDataForm from "../components/UserRitualDataForm";




const ProfileScreen = () => {

  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [originalProfileImage, setOriginalProfileImage] = useState<string | undefined>(undefined);
  const [logQty, setLogQty] = useState({ morning: 0, night: 0 })
  const [editMode, setEditMode] = useState<boolean>(false)
  const [likedRituals, setLikedRituals] = useState<RitualData[] | null>(null)
  const { userData, setUserData } = useUserStore();
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

    setUserData(updatedUserData);
    setEditMode(false)
    Alert.alert("알림", "프로필 이미지가 성공적으로 변경되었습니다.");
  }

  const resetImage = () => {
    setProfileImage(originalProfileImage);
    setEditMode(false);
  }




  const fetchRitualData = React.useCallback(async () => {
    try {
      const ritualData = await getRitualDataList();

      if (userData) {
        setProfileImage(userData.profileImageUrl);

        // Calculate ritual logs
        const morningRitualCount = ritualData.filter((ritual) => ritual.type === "morning").length;
        const nightRitualCount = ritualData.filter((ritual) => ritual.type === "night").length;
        const likedRitualList = ritualData.filter((ritual) => ritual.like === true);

        setLogQty({ morning: morningRitualCount, night: nightRitualCount });
        setLikedRituals(likedRitualList);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load user or ritual data.");
      console.error("fetchRitualData error:", error);
    }
  }, [userData]);




  useFocusEffect(
    React.useCallback(() => {
      fetchRitualData();
      setEditMode(false);
    }, [fetchRitualData])
  );



  if (!userData) {
    return (
      <LoadingIcon />
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
          <CustomText style={{ textAlign: "center" }} fontSize={20}>{userData.nickname} ᐧ {userData.id} </CustomText>
        </View>
        {/* Morning Ritual Section */}
        <UserRitualDataForm type="morning" qty={logQty.morning} />
        {/* Night Ritual Section */}
        <UserRitualDataForm type="night" qty={logQty.night} />



        <View style={styles.section}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <CircleSticker type="all" text="Ritual Logs You Liked" />
          </View>

          {likedRituals?.length === 0 ? (
            <CustomText style={{ marginLeft: 30 }}>아직 좋아요를 누른 리추얼 로그가 없습니다.</CustomText>

          ) : (
            <View style={{ minHeight: 220 }}>
              {/* likedRituals가 null 일때, undefined로 변환 */}
              <Carousel images={images} rituals={likedRituals || undefined} onImagePress={navigateDetailScreen} />
            </View>
          )}
        </View>
      </View>
    </Layout >

  );
};

export default ProfileScreen;

const styles = StyleSheet.create({

  imageSection: {
    flexDirection: "column",
    alignItems: "center",
  },
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 20,
  },
  section: {
    paddingVertical: 8,
  },
  marginLeft: {
    marginLeft: 25,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderWidth: 5,
    borderRadius: 80,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.DRAWER_ACTIVE_TEXT,
  },

  editButton: { flexDirection: "row", alignItems: "center", paddingVertical: 1, paddingHorizontal: 8, borderRadius: 12, borderWidth: 3, borderColor: Colors.PRIMARY, }
});

