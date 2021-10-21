import { Request, Response, NextFunction } from 'express';
import fileService from '../services/fileService';
import sliderService from '../services/sliderService';
import { changeSliderRequestType, deleteSliderPhotoRequestType } from '../types/servicesTypes';

class SliderController {
  async getSliders(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await sliderService.getSliders();
      res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async changeSlider(
    req: Request<{}, {}, changeSliderRequestType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      req.body.photoNames = fileService.getPhotoNames(req);

      await sliderService.changeSlider(req.body);
      res.status(200).json({ status: 'OK' });
    } catch (e) {
      next(e);
    }
  }

  async deleteSliderPhoto(
    req: Request<{}, {}, deleteSliderPhotoRequestType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      await sliderService.deleteSliderPhoto(req.body);
      res.status(200).json({ status: 'OK' });
    } catch (e) {
      next(e);
    }
  }
}

export default new SliderController();
