
import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import Constants from "expo-constants";

import { Platform } from "react-native";

export interface PushNotificationState {
  expoPushToken?: Notifications.ExpoPushToken;
  notification?: Notifications.Notification;
}



export const usePushNotifications = (): PushNotificationState => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldShowAlert: true,
      shouldSetBadge: true,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState<
    Notifications.ExpoPushToken | undefined
  >();

  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >();

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();


  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification");
        return;
      }

      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      });
    } else {
      alert("Must be using a physical device for Push notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {

      if(typeof notificationListener.current !== 'undefined' && typeof responseListener.current !== 'undefined'){
				Notifications.removeNotificationSubscription(notificationListener.current);
				Notifications.removeNotificationSubscription(responseListener.current);
			}
      
    };
  }, []);

  return {
    expoPushToken,
    notification,
  };
};


 // 알림 예약 함수
  export const scheduleDailyPushNotification = async (time:string,type:"morning"|"night",activity:string) => {
      const hour = parseInt(time.slice(0, 2), 10);
      const minute = parseInt(time.slice(2, 4), 10);

     const content = {
      sound: "default",
      title: type === "morning" ? "리추얼 라이프🌞" : "리추얼 라이프🌜",
      body: type === "morning" ? `아직 자고 있나요? ${activity}(으)로 하루를 시작해 몸과 마음을 깨워보세요!` : `${activity}(으)로 긍정적 에너지를 채우며 하루를 마무리하세요!`,
      data: { data: type === "morning" ? "morning-ritual" : "night-ritual" },
    };
    await Notifications.scheduleNotificationAsync({
     content,
      trigger: {
      hour,
      minute,
      repeats: true,  
    },
    });
  };

  // 테스트 코드
  // export const scheduleDailyPushNotification = async (time:string,type:"morning"|"night",activity:string) => {

  //    const content = {
  //     sound: "default",
  //     title: type === "morning" ? "리추얼 라이프🌞" : "리추얼 라이프🌜",
  //     body: type === "morning" ? `아직 자고 있나요? ${activity}을(를) 시작으로 몸과 마음을 깨워보세요(test)!` : `${activity}로 긍정적 에너지를 채우며 하루를 마무리하세요!(test)`,
  //     data: { data: type === "morning" ? "morning-ritual" : "night-ritual" },
  //   };
  //   console.log('content',content)
  //   await Notifications.scheduleNotificationAsync({
  //    content,
  //     trigger: {
  //     seconds: 5, // 5초 후 알림
  //   },
  //   });
  // };