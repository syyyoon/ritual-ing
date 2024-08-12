export type User = {
  id: string;
  nickname: string;
  profileImageUrl: string;
  ritual: {
    morning: string;
    night: string;
  };
};
