import { lessonsRequestType } from './../types/servicesTypes';
import LessonsDto from '../dtos/lessonsDto';
import lessonModel from '../models/lessonModel';
import ApiError from '../errors/apiError';

class TimetableService {
  async getLessons() {
    const lessons = await lessonModel.findAll({ order: [['hours', 'ASC']] });
    return new LessonsDto(lessons).lessons;
  }
  async changeTimetable({ lessons }: lessonsRequestType) {
    await Promise.all(
      lessons.map(async ({ _id, day, time, group }) => {
        //удаление уроков
        if (!day) {
          const lesson = await lessonModel.findByPk(_id);

          if (!lesson) {
            throw ApiError.BadRequest('Урок не найден');
          }

          await lesson.destroy();

          return;
        }

        //валидация
        if (!time) {
          throw ApiError.BadRequest('Заполнены не все поля времени');
        }
        if (!group) {
          throw ApiError.BadRequest('Заполнены не все поля группы');
        }
        if (group.length > 100) {
          throw ApiError.BadRequest('Имя групп не должно превышать 100 символов');
        }
        if (!/^\d\d:\d\d\-\d\d:\d\d$/.test(time)) {
          throw ApiError.BadRequest('Формат времени указан не верно. Укажите время в формате: NN:NN-NN:NN');
        }

        const firstHour = time.split('-')[0];
        const hours = +firstHour.split(':')[0] + +firstHour.split(':')[1] / 60;

        if (_id) {
          const lesson = await lessonModel.findByPk(_id);

          if (!lesson) {
            throw ApiError.BadRequest('Урок не найден');
          }

          await lesson.update({ day, time, group, hours });
        } else {
          await lessonModel.create({ day, time, group, hours });
        }
      }),
    );
  }
}

export default new TimetableService();
