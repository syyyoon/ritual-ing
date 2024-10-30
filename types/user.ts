export type User = {
  id: number;
  nickname: string;
  profileImageUrl?: string;
  morningRitual :{
    activity:string;
    time?:string;
    isPushEnabled: boolean; // 모닝 리추얼 푸시 알림 동의 여부
  }
  nightRitual :{
    activity:string;
    time?:string;
    isPushEnabled: boolean; // 나이트 리추얼 푸시 알림 동의 여부
  },
  setupDone:boolean;
};
