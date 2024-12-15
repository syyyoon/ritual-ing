 export const MORNING_TIME_LIST = [
  { label: "05:00", value: "0500" },
  { label: "05:30", value: "0530" },
  { label: "06:00", value: "0600" },
  { label: "06:30", value: "0630" },
  { label: "07:00", value: "0700" },
  { label: "07:30", value: "0730" },
  { label: "08:00", value: "0800" },
  { label: "08:30", value: "0830" },
  { label: "09:00", value: "0900" },
  { label: "09:30", value: "0930" },
  { label: "10:00", value: "1000" },
  { label: "10:30", value: "1030" },
  { label: "11:00", value: "1100" },
];

 export const AFTERNOON_TIME_LIST = [
  { label: "17:00", value: "1700" },
  { label: "17:30", value: "1730" },
  { label: "18:00", value: "1800" },
  { label: "18:30", value: "1830" },
  { label: "19:00", value: "1900" },
  { label: "19:30", value: "1930" },
  { label: "20:00", value: "2000" },
  { label: "20:30", value: "2030" },
  { label: "21:00", value: "2100" },
  { label: "21:30", value: "2130" },
  { label: "22:00", value: "2200" },
  { label: "22:30", value: "2230" },
  { label: "23:00", value: "2300" },
  { label: "23:30", value: "2330" },
  { label: "23:50", value: "2350" },
];

export const formattedMorningTimes = MORNING_TIME_LIST.map((time) => ({
    value: time.value,
    label: time.label
}));

export const formattedNightTimes = AFTERNOON_TIME_LIST.map((time) => ({
    value: time.value,
    label: time.label
}));