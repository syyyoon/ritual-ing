export const getCurrentDate = (): string => {
  const now = new Date();
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const koreaTime = new Date(now.getTime() + koreaTimeDiff);
  console.log("koreaTime", koreaTime);

  const year = koreaTime.getUTCFullYear();
  const month = (koreaTime.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = koreaTime.getUTCDate().toString().padStart(2, "0");
  const weekDay = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][koreaTime.getUTCDay()];
  return `${year}-${month}-${day} ${weekDay}`;
};
