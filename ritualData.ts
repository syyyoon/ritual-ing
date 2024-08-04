// mockData.ts
export interface RitualData {
  id: number;
  type: "morning" | "night";
  date: string;
  imageUrl: string;
  title?: string;
  content?: string;
}

export const ritualDataList: RitualData[] = [
  {
    id: 1,
    type: "morning",
    title: "Hata Yoga 50mins",
    date: "2024-07-21 SUN",
    imageUrl: "yoga_image_1",
    content:
      "Today, I started my journey with yoga. The initial session was challenging, yet invigorating. I'm excited to see how this practice will transform my mind and body.",
  },
  {
    id: 2,
    type: "night",
    title: "데미안 1-20page",
    date: "2024-07-21 SUN",
    imageUrl: "book_image_1",
    content:
      "헤르만 헤세 - 데미안 / p145. 우리의 신은 아브락사스야. 그런데 그는 신이면서 사탄이지. 그 안에 환한 세계와 어두운 세계를 가지고 있어. 아브락사스는 자네의 어떤 생각에도, 어떤 꿈에도 이의를 제기하지 않아.",
  },
  {
    id: 3,
    type: "morning",
    title: "Vinyasa Yoga 50mins",
    date: "2024-07-22 MON",
    imageUrl: "yoga_image_2",
    content: "Morning Ritual Day 2 Success!😬",
  },
  {
    id: 4,
    type: "night",
    title: "데미안 21-50page",
    date: "2024-07-22 MON",
    imageUrl: "book_image_2",
    content:
      "오늘의 구절 : 익숙한 세계에서 빠져나와야만 새로운 세계에 진입할 수 있습니다. 변화와 성장의 필요성을 다시금 느끼게 해준 소중한 순간이었다.",
  },
  {
    id: 5,
    type: "morning",
    title: "Ashtanga Yoga Primary Full Series 50mins",
    date: "2024-07-23 TUE",
    imageUrl: "yoga_image_3",
    content: "일어나기 힘들었지만 오늘 모닝 리추얼도 성공이다!",
  },
  {
    id: 6,
    type: "night",
    title: "데미안 51-80page",
    date: "2024-07-23 TUE",
    imageUrl: "book_image_3",
    content: "고단했던 오늘 하루 마무리도 책으로^^🍋",
  },
  {
    id: 7,
    type: "morning",
    title: "Hata Yoga 50mins",
    date: "2024-07-24 WED",
    imageUrl: "yoga_image_4",
    content: "Successfully starting the day with refreshing yoga! Namaste!🙏🏻",
  },
  {
    id: 8,
    type: "night",
    title: "퀸의 대각선 1일차",
    date: "2024-07-24 WED",
    imageUrl: "",
    content: "그닥 구미를 당기는 책은 아니지만 읽기 시작했으니 끝을 보자!",
  },
  {
    id: 9,
    type: "morning",
    title: "Meridian Therapy 1hour",
    date: "2024-07-25 THU",
    imageUrl: "yoga_image_7",
    content: "개운하게 요가로 하루 시작하기 성공!",
  },
  {
    id: 10,
    type: "night",
    title: "퀸의 대각선 2일차",
    date: "2024-07-25 THU",
    imageUrl: "book_image_6",
    content: "피곤했지만 책읽기로 마~무리!",
  },
  {
    id: 11,
    type: "morning",
    title: "Vinyasa Yoga 1hour",
    date: "2024-07-26 FRI",
    imageUrl: "yoga_image_8",
    content: "If you take it step by step, an hour has already passed. Yoga is fun!",
  },
  {
    id: 12,
    type: "night",
    title: "퀸의 대각선 3일차",
    date: "2024-07-25 FRI",
    imageUrl: "book_image_7",
    content: "피곤했지만 책읽기로 마~무리!",
  },
];
