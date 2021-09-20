type aboutPart = {
  part: string;
  title?: string;
  description?: string;
  ol?: string[];
  ul?: string[];
};

export type mainPageType = {
  aboutParts: aboutPart[];
};
