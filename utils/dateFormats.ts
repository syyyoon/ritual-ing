import { getCurrentDate, getCurrentTime, getWeekday } from "./currentDate";

export const generateDateOptions = () => {
  const currentDateKR = getCurrentDate("KR");
  const currentTimeKR = getCurrentTime("KR");
  const currentDateENG = getCurrentDate("ENG");
  const currentTimeENG = getCurrentTime("ENG");
  const weekDayKR = getWeekday("KR");
  const weekDayENG = getWeekday("ENG");
  const monthENG = currentDateENG.split(" ")[0];
  const [year, monthKR, day] = currentDateKR.split("-");
  // const shortWeekday = weekDayENG.substring(0, 3);

  const option1 = `${monthENG} ${day}`;
  const option2 = `${monthKR} / ${day}`;
  const option3 = `${year}.${monthKR}.${day}`;
  const option4 = `${year}년 ${monthKR}월 ${day}일 (${weekDayKR})`;
  const option5 = `${currentTimeKR}+${option3} (${weekDayKR})`;
  const option6 = `${currentTimeENG}+${currentDateENG}`;
  const option7 = `${weekDayENG}+${currentDateENG} `;

  const options = [
    currentDateKR, // 2024-08-06 (화)
    currentDateENG, // Tue, Aug 06 2024
    currentTimeKR, // 오후 04:56
    currentTimeENG, // 4:58 PM
    weekDayENG, // THURSDAY
    `${weekDayKR}요일`, // 목요일
    option1, // Aug 09
    option2, // 08 / 08
    option3, // 2024.08.08
    option4, // 2024년 08월 08일(목)
    option5, // 2024.08.08 + 오전1:49
    option6, // 1:49 AM + Aug 08 2024
    option7, //THURSDAY + Aug 08 2024
  ];

  return options;
};
