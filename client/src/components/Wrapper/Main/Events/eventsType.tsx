export type videoType = {
  name: string;
  url: string;
};

export type eventResponseType = {
  _id: string;
  year: string;
  name: string;
  description: string[];
  photoNames: string[];
  videoNames: string[];
  videoLinks: string[];
};

export type eventsType = {
  events: eventResponseType[];
  imagesUrl: string;
};
