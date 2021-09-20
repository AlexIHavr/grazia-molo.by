type historyYear = {
  year: string;
  description: string[];
  images?: string[];
};

export type historyType = {
  historyYears: historyYear[];
};
