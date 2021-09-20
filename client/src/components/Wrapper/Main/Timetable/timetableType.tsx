export type lessonResponseType = {
  _id: string;
  day: string;
  time: string;
  group: string;
};

export type lessonsResponseType = lessonResponseType[];

export type timetableType = {
  days: string[];
  lessons: lessonsResponseType;
};
