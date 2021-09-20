export type video = {
  name: string;
  url: string;
};

export type yearsEvent = {
  year: string;
  description: string[];
  images?: string[];
  videos?: video[];
};

export type eventType = {
  event: string;
  eventName: string;
  yearsEvent: yearsEvent[];
};

export type eventsType = {
  events: eventType[];
  imagesUrl: string;
};
