export type User = {
  id: number;
  nickname: string;
  profileImageUrl?: string;
  morningRitual :{
    id?:string;
    activity:string;
    time?:string;
    isPushEnabled: boolean; 
    notificationId?:string 
  }
  nightRitual :{
    id?:string;
    activity:string;
    time?:string;
    isPushEnabled: boolean; 
    notificationId?:string

  },
  setupDone:boolean;
};



