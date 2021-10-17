import ApiError from '../errors/apiError';
import eventModel from '../models/eventModel';
import {
  changeEventRequestType,
  deleteEventPhotoRequestType,
  deleteEventRequestType,
  eventRequestType,
} from './../types/servicesTypes';
import fileService from './fileService';
import textService from './textService';
class EventService {
  async createEvent({
    year,
    name,
    description,
    photoNames,
    videoNames,
    videoLinks,
  }: eventRequestType) {
    const videoNamesArr = textService.getTextArr(videoNames, '/');
    const videoLinksArr = textService.getTextArr(videoLinks, '/');

    if (videoNamesArr.length !== videoLinksArr.length) {
      throw ApiError.BadRequest('Количество имен и ссылок видео не совпадают');
    }

    await eventModel.create({
      year,
      name,
      description: textService.getTextArr(description, '\n'),
      photoNames,
      videoNames: videoNamesArr,
      videoLinks: videoLinksArr,
    });
  }

  async getEvents() {
    return await eventModel.find().sort({ year: -1 });
  }

  async changeEvent({
    eventId,
    year,
    name,
    description,
    photoNames,
    videoNames,
    videoLinks,
  }: changeEventRequestType) {
    const event = await eventModel.findById(eventId);

    if (!event) {
      throw ApiError.BadRequest('Событие не найдено');
    }

    const videoNamesArr = textService.getTextArr(videoNames, '/');
    const videoLinksArr = textService.getTextArr(videoLinks, '/');

    if (videoNamesArr.length !== videoLinksArr.length) {
      throw ApiError.BadRequest('Количество имен и ссылок видео не совпадают');
    }

    await event.updateOne({
      year: +year,
      name,
      description: textService.getTextArr(description, '\n'),
      photoNames: event.photoNames.concat(photoNames),
      videoNames: videoNamesArr,
      videoLinks: videoLinksArr,
    });
  }

  async deleteEventPhoto({ eventId, photoName }: deleteEventPhotoRequestType) {
    const event = await eventModel.findById(eventId);

    if (!event) {
      throw ApiError.BadRequest('Событие не найдено');
    }

    fileService.unlinkPhoto(photoName, `Events/${event.year}`);

    fileService.rmdirForPhotos(`Events/${event.year}`);

    await event.updateOne({
      photoNames: event.photoNames.filter((name) => name !== photoName),
    });
  }

  async deleteEvent({ eventId }: deleteEventRequestType) {
    const event = await eventModel.findById(eventId);

    if (!event) {
      throw ApiError.BadRequest('Событие не найдено');
    }

    event.photoNames.forEach((photoName) => {
      fileService.unlinkPhoto(photoName, `Events/${event.year}`);

      fileService.rmdirForPhotos(`Events/${event.year}`);
    });

    event.deleteOne();
  }
}

export default new EventService();
