import { lessonModelType } from './../types/modelsTypes';

class LessonsDto {
  lessons: {
    _id: string;
    day: string;
    time: string;
    group: string;
  }[];

  constructor(lessons: lessonModelType[]) {
    this.lessons = lessons.map(({ _id, day, time, group }) => ({ _id, day, time, group }));
  }
}

export default LessonsDto;
