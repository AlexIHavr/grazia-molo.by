type creationItemType = {
  name: string;
  description: string[];
};

type crationType = {
  creation: string;
  creationName: string;
  creationItems: creationItemType[];
};

export type creativityType = {
  creations: crationType[];
  imagesUrl: string;
};
