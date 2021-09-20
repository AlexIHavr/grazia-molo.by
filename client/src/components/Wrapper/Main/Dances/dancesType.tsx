type danceType = {
  dance: string;
  danceName: string;
  description: string[];
  images?: string[];
};

export type dancesType = {
  dances: danceType[];
  imagesUrl: string;
};
