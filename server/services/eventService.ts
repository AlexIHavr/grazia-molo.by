import ApiError from '../errors/apiError';
import eventModel from '../models/eventModel';
import { eventRequestType } from './../types/servicesTypes';
class EventService {
  async createEvent({
    year,
    name,
    description,
    photoNames,
    videoNames,
    videoLinks,
  }: eventRequestType) {
    const videoNamesArr = videoNames.trim()
      ? videoNames.split('/').filter((value) => value.trim() !== '')
      : [];
    const videoLinksArr = videoLinks.trim()
      ? videoLinks.split('/').filter((value) => value.trim() !== '')
      : [];

    if (videoNamesArr.length !== videoLinksArr.length) {
      throw ApiError.BadRequest('Количество имен и ссылок видео не совпадают');
    }

    await eventModel.create({
      year,
      name,
      description,
      photoNames,
      videoNames: videoNamesArr,
      videoLinks: videoLinksArr,
    });
  }
}

export default new EventService();
