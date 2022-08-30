import jwt from 'jsonwebtoken';
import config from 'config';
import { cookiesType, payloadType } from '../types/servicesTypes';
import userModel from '../models/userModel';
import { Response } from 'express';
import { userModelType } from '../types/modelsTypes';
import ApiError from '../errors/apiError';
import TokensDto from '../dtos/tokensDto';

class TokenService {
  async generateTokens(payload: payloadType) {
    const accessToken = jwt.sign(payload, config.get('JWT_ACCESS_SECRET'), {
      expiresIn: config.get('TIME_JWT_ACCESS'),
    });

    const refreshToken = jwt.sign(payload, config.get('JWT_REFRESH_SECRET'), {
      expiresIn: config.get('TIME_JWT_REFRESH'),
    });

    const user = await userModel.findByPk(payload.userId);

    if (!user) {
      throw ApiError.BadRequest('Пользователь не найден');
    }

    user.refreshToken = refreshToken;
    await user.save();

    return new TokensDto(user, accessToken);
  }

  setCookies(res: Response, { refreshToken, userId }: cookiesType) {
    res.cookie('refreshToken', refreshToken, {
      maxAge: parseInt(config.get('TIME_JWT_REFRESH')) * 24 * 60 * 1000,
      httpOnly: true,
    });
    res.cookie('userId', userId, {
      maxAge: parseInt(config.get('TIME_JWT_REFRESH')) * 24 * 60 * 1000,
      httpOnly: true,
    });
  }

  validateAccessToken(accessToken: string) {
    try {
      return jwt.verify(accessToken, config.get('JWT_ACCESS_SECRET'));
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(refreshToken: string) {
    try {
      return jwt.verify(refreshToken, config.get('JWT_REFRESH_SECRET'));
    } catch (e) {
      return null;
    }
  }

  async removeToken(refreshToken: string) {
    await userModel.update({ refreshToken: null }, { where: { refreshToken } });
  }
}

export default new TokenService();
