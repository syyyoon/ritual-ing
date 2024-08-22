
export const lightColors = {
  BACKGROUND: "#fdfbef",
  FORM_BG: "#FFFFFF",
  TEXT: "#343232",
  DEFAULT_IMG_BG: "#f8f2d1",
  TYPE_MORNING: "#F14E1F",
  TYPE_NIGHT: "#85CA0F",
};

export const darkColors = {
  BACKGROUND: "#1c1b1b",
  TEXT: "#f2f0e0",
  FORM_BG: "#26292f",
  DEFAULT_IMG_BG: "#303032",
  TYPE_MORNING: "#da68a3",
  TYPE_NIGHT: "#2fc1da",
};

export const lightTheme = {
  ...lightColors,
};

export const darkTheme = {
  ...darkColors,
};

export type ThemeType = typeof lightTheme;
