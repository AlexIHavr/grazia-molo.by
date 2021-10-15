import bcrypt from 'bcrypt';
import config from 'config';
import { v4 } from 'uuid';
import ApiError from '../errors/apiError';

import userModel from '../models/userModel';
import { userModelType } from '../types/modelsTypes';
import {
  isBanUsersRequest,
  loginRequestType,
  registrationRequestType,
  userSettingsRequestType,
} from '../types/servicesTypes';
import mailService from './mailService';
import tokenService from './tokenService';
import UserSettingsDto from '../dtos/userSettingsDto';
import fileService from './fileService';
import UsersDto from '../dtos/usersDto';

class UserService {
  async registration({ fullName, email, password, age, isClubMember }: registrationRequestType) {
    let candidate: userModelType | null;

    candidate = await userModel.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
    }

    candidate = await userModel.findOne({ fullName });

    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с именем ${fullName} уже существует`);
    }

    const hashPassword = await bcrypt.hash(password, 6);
    const activationLink = v4();

    await mailService.sendActivationMail(
      email,
      `${config.get('API_URL')}/api/visitor/activate/${activationLink}`
    );

    await userModel.create({
      fullName,
      email,
      password: hashPassword,
      age,
      isClubMember,
      activationLink,
    });
  }

  async login({ email, password }: loginRequestType) {
    const user = await userModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} не найден`);
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      throw ApiError.BadRequest('Неверный пароль');
    }

    if (user.isBan) {
      throw ApiError.Locked(
        `Пользователь с почтовым адресом ${user.email} заблокирован администратором`
      );
    }

    return tokenService.generateTokens({ userId: user._id });
  }

  async loginAfterActivate(activationLink: string) {
    const user = await userModel.findOne({ activationLink });

    if (!user) {
      throw ApiError.BadRequest('Пользователь не найден');
    }

    await user.updateOne({ activationLink: '' });

    return tokenService.generateTokens({ userId: user._id });
  }

  async logout(refreshToken: string) {
    await tokenService.removeToken(refreshToken);
  }

  async activate(activationLink: string) {
    const user = await userModel.findOne({ activationLink });

    if (!user) {
      throw ApiError.BadRequest('Неккоректная ссылка активации');
    }

    await user.updateOne({ isActivated: true });
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const isValidate = tokenService.validateRefreshToken(refreshToken);
    const user = await userModel.findOne({ refreshToken });

    if (!isValidate || !user) {
      throw ApiError.UnauthorizedError();
    }

    if (user.isBan) {
      throw ApiError.Locked(
        `Пользователь с почтовым адресом ${user.email} заблокирован администратором`
      );
    }

    return tokenService.generateTokens({ userId: user._id });
  }

  async changeUserSettings({ fullName, photoName }: userSettingsRequestType, userId: string) {
    const user = await userModel.findById(userId);

    if (!user) {
      throw ApiError.BadRequest('Пользователь не найден');
    }

    user.fullName = fullName;

    if (photoName) {
      //удаление существующей картинки
      fileService.unlinkPhoto(user.photoName, 'Forum/Users');

      user.photoName = photoName;
    }
    await user.save();

    return new UserSettingsDto(user);
  }

  async deleteUserPhoto(userId: string) {
    const user = await userModel.findById(userId);

    if (!user) {
      throw ApiError.BadRequest('Пользователь не найден');
    }

    //удаление существующей картинки
    fileService.unlinkPhoto(user.photoName, 'Forum/Users');

    await user.updateOne({ photoName: '' });
  }

  async getUsers() {
    const users = await userModel.find().sort({ dateCreation: -1 });

    return users.map((user) => new UsersDto(user));
  }

  async changeIsBanUsers({ users }: isBanUsersRequest) {
    users.forEach(async ({ _id, isBan }) => {
      const changedUser = await userModel.findById(_id);

      if (!changedUser) {
        throw ApiError.BadRequest('Пользователь не найден');
      }

      await changedUser.updateOne({ isBan });
    });
  }
}

export default new UserService();
