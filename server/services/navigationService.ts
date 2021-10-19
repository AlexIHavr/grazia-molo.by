import ApiError from '../errors/apiError';
import navigationModel from '../models/navigationModel';
import {
  changeSectionRequestType,
  deleteSectionPhotoRequestType,
  deleteSectionRequestType,
  navigationRequestType,
} from '../types/servicesTypes';
import fileService from './fileService';
import textService from './textService';

class NavigationService {
  async createSection({
    category,
    subCategory,
    section,
    description,
    photoNames,
    videoNames,
    videoLinks,
  }: navigationRequestType) {
    const videoNamesArr = textService.getTextArr(videoNames, '/');
    const videoLinksArr = textService.getTextArr(videoLinks, '/');

    if (videoNamesArr.length !== videoLinksArr.length) {
      throw ApiError.BadRequest('Количество имен и ссылок видео не совпадают');
    }

    await navigationModel.create({
      category,
      subCategory,
      section,
      description: textService.getTextArr(description, '\n'),
      photoNames,
      videoNames: videoNamesArr,
      videoLinks: videoLinksArr,
    });
  }

  async getNavigations() {
    return await navigationModel.find();
  }

  async changeSection({
    sectionId,
    subCategory,
    section,
    description,
    photoNames,
    videoNames,
    videoLinks,
  }: changeSectionRequestType) {
    const oldSection = await navigationModel.findById(sectionId);

    if (!oldSection) {
      throw ApiError.BadRequest('Раздел не найден');
    }

    const videoNamesArr = textService.getTextArr(videoNames, '/');
    const videoLinksArr = textService.getTextArr(videoLinks, '/');

    if (videoNamesArr.length !== videoLinksArr.length) {
      throw ApiError.BadRequest('Количество имен и ссылок видео не совпадают');
    }

    await oldSection.updateOne({
      subCategory,
      section,
      description: textService.getTextArr(description, '\n'),
      photoNames: oldSection.photoNames.concat(photoNames),
      videoNames: videoNamesArr,
      videoLinks: videoLinksArr,
    });
  }

  async deleteSectionPhoto({ sectionId, photoName }: deleteSectionPhotoRequestType) {
    const section = await navigationModel.findById(sectionId);

    if (!section) {
      throw ApiError.BadRequest('Раздел не найден');
    }

    const sectionPath = `${section.category}/${section.subCategory}`;

    fileService.unlinkPhoto(photoName, sectionPath);

    fileService.rmdirForPhotos(sectionPath);

    await section.updateOne({
      photoNames: section.photoNames.filter((name) => name !== photoName),
    });
  }

  async deleteSection({ sectionId }: deleteSectionRequestType) {
    const section = await navigationModel.findById(sectionId);

    if (!section) {
      throw ApiError.BadRequest('Раздел не найден');
    }

    const sectionPath = `${section.category}/${section.subCategory}`;

    section.photoNames.forEach((photoName) => {
      fileService.unlinkPhoto(photoName, sectionPath);

      fileService.rmdirForPhotos(sectionPath);
    });

    section.deleteOne();
  }
}

export default new NavigationService();
