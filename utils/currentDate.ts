export const getCurrentDate = (type: "KR" | "ENG"): string => {
  const now = new Date();
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const koreaTime = new Date(now.getTime() + koreaTimeDiff);

  const year = koreaTime.getUTCFullYear();
  const monthNum = koreaTime.getUTCMonth();
  const month = (koreaTime.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = koreaTime.getUTCDate().toString().padStart(2, "0");
  const monthNamesENG = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  if (type === "KR") {
    return `${year}-${month}-${day}`;
  } else {
    const monthENG = monthNamesENG[monthNum];
    return `${monthENG} ${day}, ${year}`;
  }
};

export const getCurrentTime = (type: "KR" | "ENG"): string => {
  const now = new Date();
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const koreaTime = new Date(now.getTime() + koreaTimeDiff);
  let hour = koreaTime.getUTCHours();
  const minute = koreaTime.getUTCMinutes().toString().padStart(2, "0");
  const periodENG = hour >= 12 ? "PM" : "AM";
  const periodKR = hour >= 12 ? "오후" : "오전";

  if (hour > 12) {
    hour -= 12;
  } else if (hour === 0) {
    hour = 12;
  }
  const formattedHour = hour.toString();

  if (type === "KR") {
    return `${periodKR} ${formattedHour}:${minute} `;
  } else {
    return `${formattedHour}:${minute} ${periodENG}`;
  }
};

export const getWeekday = (type: "KR" | "ENG"): string => {
  const now = new Date();
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const koreaTime = new Date(now.getTime() + koreaTimeDiff);

  const weekDayENG = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"][
    koreaTime.getUTCDay()
  ];

  const weekDayKR = ["일", "월", "화", "수", "목", "금", "토"][koreaTime.getUTCDay()];

  if (type === "KR") {
    return weekDayKR;
  } else {
    return weekDayENG;
  }
};
