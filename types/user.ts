export type User = {
  id: number;
  nickname: string;
  profileImageUrl?: string;
  morningRitual :{
    activity:string;
    time?:string;
  }
  nightRitual :{
    activity:string;
    time?:string;
  }
};
