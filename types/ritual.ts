export type RitualData = {
  id: number;
  type: "morning" | "night";
  date: string;
  imageUrl?: string;
  title?: string;
  content?: string;
};

export type RitualType = "morning" | "night";

export type RitualFilterValue = RitualType | "all";
