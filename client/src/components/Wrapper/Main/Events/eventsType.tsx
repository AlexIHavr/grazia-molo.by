import { navigationResponseType } from '../mainType';

export type videoType = {
  name: string;
  url: string;
};

export type eventsType = {
  events: navigationResponseType[];
  imagesUrl: string;
};
