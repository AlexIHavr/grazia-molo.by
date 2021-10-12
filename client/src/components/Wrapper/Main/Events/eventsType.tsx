export type video = {
  name: string;
  url: string;
};

export type yearsEvent = {
  event: string;
  eventName: string;
  description: string[];
  images?: string[];
  videos?: video[];
};

export type eventType = {
  year: string;
  yearsEvent: yearsEvent[];
};

export type eventsType = {
  events: eventType[];
  imagesUrl: string;
};
