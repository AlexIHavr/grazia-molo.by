import { changeSliderRequestType, deleteSliderPhotoRequestType } from './../types/servicesTypes';
import sliderModel from '../models/sliderModel';
import ApiError from '../errors/apiError';
import fileService from './fileService';

class SliderService {
  async getSliders() {
    return await sliderModel.findAll();
  }

  async changeSlider({ photoNames }: changeSliderRequestType) {
    const slider = await sliderModel.findOne();

    if (!slider) {
      throw ApiError.BadRequest('Слайдер не найден');
    }

    await slider.update({ photoNames: slider.photoNames.concat(photoNames) });
  }

  async deleteSliderPhoto({ photoName }: deleteSliderPhotoRequestType) {
    const slider = await sliderModel.findOne();

    if (!slider) {
      throw ApiError.BadRequest('Слайдер не найден');
    }

    fileService.unlinkPhoto(photoName, 'Slider');

    await slider.update({
      photoNames: slider.photoNames.filter((photo) => photo !== photoName),
    });
  }
}

export default new SliderService();
