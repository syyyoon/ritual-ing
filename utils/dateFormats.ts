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
  const option4 = `${monthKR}월 ${day}일`;
  const option5 = `${currentTimeKR}+${option3} (${weekDayKR})`;
  const option6 = `${currentTimeENG}+${currentDateENG}`;
  const option7 = `${weekDayENG}+${currentDateENG} `;
  const option8 = `${day}+${monthENG}`;
  const option9 = `${year}+${weekDayENG.substring(0, 3)}. ${monthENG} ${day}`;

  const options = [
    currentDateKR, // 2024-08-06
    currentDateENG, // Aug 06, 2024
    currentTimeKR, // 오후 4:56
    currentTimeENG, // 4:58 PM
    weekDayENG, // THURSDAY
    `${weekDayKR}요일`, // 목요일
    option1, // Aug 09
    option2, // 08 / 08
    option3, // 2024.08.08
    option4, // 08월 08일
    option5, // 2024.08.08 + 오전1:49
    option6, // 1:49 AM + Aug 08 2024
    option7, //THURSDAY + Aug 08 2024
    option8, // 08+Aug
    option9, // 2024+THU. Aug 08
  ];

  return options;
};
