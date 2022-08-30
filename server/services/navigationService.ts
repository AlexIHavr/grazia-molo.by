import ApiError from '../errors/apiError';
import mainNavigationModel from '../models/mainNavigationModel';
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
    startDescription,
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

    const mainNavigation = await mainNavigationModel.findOne({ where: { category } });

    if (mainNavigation && mainNavigation.withSubCategories && !subCategory) {
      throw ApiError.BadRequest('Введите подкатегорию');
    }

    const newSection = await navigationModel.create({
      category,
      subCategory: subCategory ?? '',
      section,
      description: textService.getTextArr(description, '\n'),
      photoNames,
      videoNames: videoNamesArr,
      videoLinks: videoLinksArr,
    });

    const categoryNavigation = await navigationModel.findAll({ where: { category } });

    if (categoryNavigation.length === 1) {
      newSection.startDescription = textService.getTextArr(startDescription, '\n');
    } else {
      newSection.startDescription = categoryNavigation.filter(({ startDescription }) => startDescription)[0].startDescription;
    }
    await newSection.save();
  }

  async getNavigations() {
    return await navigationModel.findAll();
  }

  async getMainNavigations() {
    return await mainNavigationModel.findAll();
  }

  async changeSection({
    sectionId,
    category,
    subCategory,
    section,
    startDescription,
    description,
    photoNames,
    videoNames,
    videoLinks,
  }: changeSectionRequestType) {
    const oldSection = await navigationModel.findByPk(sectionId);

    if (!oldSection) {
      throw ApiError.BadRequest('Раздел не найден');
    }

    const videoNamesArr = textService.getTextArr(videoNames, '/');
    const videoLinksArr = textService.getTextArr(videoLinks, '/');

    if (videoNamesArr.length !== videoLinksArr.length) {
      throw ApiError.BadRequest('Количество имен и ссылок видео не совпадают');
    }

    const mainNavigation = await mainNavigationModel.findOne({ where: { category } });

    if (mainNavigation && mainNavigation.withSubCategories && !subCategory) {
      throw ApiError.BadRequest('Введите подкатегорию');
    }

    await oldSection.update({
      subCategory,
      section,
      description: textService.getTextArr(description, '\n'),
      photoNames: oldSection.photoNames.concat(photoNames),
      videoNames: videoNamesArr,
      videoLinks: videoLinksArr,
    });

    const categoryNavigation = await navigationModel.findAll({ where: { category: oldSection.category } });

    categoryNavigation.forEach(async (nav) => {
      nav.startDescription = textService.getTextArr(startDescription, '\n');
      await nav.save();
    });
  }

  async deleteSectionPhoto({ sectionId, photoName }: deleteSectionPhotoRequestType) {
    const section = await navigationModel.findByPk(sectionId);

    if (!section) {
      throw ApiError.BadRequest('Раздел не найден');
    }

    const sectionPath = `${section.category}/${section.subCategory}`;

    fileService.unlinkPhoto(photoName, sectionPath);

    fileService.rmdirForPhotos(sectionPath);

    await section.update({
      photoNames: section.photoNames.filter((name) => name !== photoName),
    });
  }

  async deleteSection({ sectionId }: deleteSectionRequestType) {
    const section = await navigationModel.findByPk(sectionId);

    if (!section) {
      throw ApiError.BadRequest('Раздел не найден');
    }

    const sectionPath = `${section.category}/${section.subCategory}`;

    section.photoNames.forEach((photoName) => {
      fileService.unlinkPhoto(photoName, sectionPath);

      fileService.rmdirForPhotos(sectionPath);
    });

    section.destroy();
  }
}

export default new NavigationService();
