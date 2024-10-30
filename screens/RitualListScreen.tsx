import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import RitualTypeFilter from "../components/RitualTypeFilter";
import FilterableCardList from "../components/FilterableCardList";

import { useFocusEffect } from "@react-navigation/native";
import { RitualData, RitualFilterValue } from "../types/ritual";
import { getRitualDataList } from "../service/ritualDataService";
import Layout from "../components/Layout";
import Colors from "../constants/colors";
import { me } from "@react-native-kakao/user";
import { usePushNotifications } from "../hook/usePushNotification";
import * as Notifications from "expo-notifications";



async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      sound: 'default',
      title: '리추얼 라이프🌞',
      body: '모닝 리추얼 할 시간입니다!',
      data: { data: 'morning-ritual' },
    },
    trigger: { seconds: 2 },
  });
}

const RitualListScreen = () => {
  const [filterValue, setFilterValue] = useState<RitualFilterValue>("all");
  const [rituals, setRituals] = useState<RitualData[]>([]);
  const { expoPushToken, notification } = usePushNotifications()
  const tokenData = JSON.stringify(notification, undefined, 2)

  const loadRitualListData = async () => {
    let data = await getRitualDataList();

    if (!data) {
      setRituals([]);
    } else setRituals(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadRitualListData();
    }, [])
  );


  if (!rituals) {
    return (
      <Layout>
        <View style={styles.indicatorWrapper}>
          <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
        </View>
      </Layout>

    );
  }
  return (
    <Layout>
      <View style={styles.mainSection}>
        <RitualTypeFilter filter={filterValue} setFilter={setFilterValue} />
        <FilterableCardList filter={filterValue} ritualDataList={rituals} />
        {/* <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Text>Your expo push token: {expoPushToken?.data}</Text>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text>Title: {notification && notification.request.content.title} </Text>
            <Text>Body: {notification && notification.request.content.body}</Text>
            <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
          </View>
          <Button
            title="Press to schedule a notification"
            onPress={async () => {
              await schedulePushNotification();
            }}
          />
        </View> */}
      </View>
    </Layout>
  );
};

export default RitualListScreen;

const styles = StyleSheet.create({
  indicatorWrapper: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    margin: "30%"
  },

  mainSection: {
    paddingTop: 10,
    flexDirection: "row",
  },
});
