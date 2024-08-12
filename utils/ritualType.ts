export const getRitualType = (): "morning" | "night" => {
  const now = new Date();
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const koreaTime = new Date(now.getTime() + koreaTimeDiff);
  const hours = koreaTime.getUTCHours();
  return hours < 12 ? "morning" : "night";
};
