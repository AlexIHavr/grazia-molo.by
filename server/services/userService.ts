import bcrypt from 'bcrypt';
import config from 'config';
import { v4 } from 'uuid';
import ApiError from '../errors/apiError';

import userModel from '../models/userModel';
import { userModelType } from '../types/modelsTypes';
import { isBanUsersRequest, loginRequestType, registrationRequestType, userSettingsRequestType } from '../types/servicesTypes';
import mailService from './mailService';
import tokenService from './tokenService';
import UserSettingsDto from '../dtos/userSettingsDto';
import fileService from './fileService';
import UsersDto from '../dtos/usersDto';

class UserService {
  async registration({ fullName, email, password, age, isClubMember }: registrationRequestType) {
    let candidate: userModelType | null;

    candidate = await userModel.findOne({ where: { email } });

    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
    }

    candidate = await userModel.findOne({ where: { fullName } });

    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с именем ${fullName} уже существует`);
    }

    const hashPassword = await bcrypt.hash(password, 6);
    const activationLink = v4();

    await mailService.sendActivationMail(email, `${config.get('API_URL')}/api/visitor/activate/${activationLink}`);

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
    const user = await userModel.findOne({ where: { email } });

    if (!user) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} не найден`);
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      throw ApiError.BadRequest('Неверный пароль');
    }

    if (user.isBan) {
      throw ApiError.Locked(`Пользователь с почтовым адресом ${user.email} заблокирован администратором`);
    }

    return tokenService.generateTokens({ userId: user._id });
  }

  async loginAfterActivate(activationLink: string) {
    const user = await userModel.findOne({ where: { activationLink } });

    if (!user) {
      throw ApiError.BadRequest('Пользователь не найден');
    }

    await user.update({ activationLink: '' });

    return tokenService.generateTokens({ userId: user._id });
  }

  async logout(refreshToken: string) {
    await tokenService.removeToken(refreshToken);
  }

  async activate(activationLink: string) {
    const user = await userModel.findOne({ where: { activationLink } });

    if (!user) {
      throw ApiError.BadRequest('Некорректная ссылка активации');
    }

    await user.update({ isActivated: true });
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const isValidate = tokenService.validateRefreshToken(refreshToken);
    const user = await userModel.findOne({ where: { refreshToken } });

    if (!isValidate || !user) {
      throw ApiError.UnauthorizedError();
    }

    if (user.isBan) {
      throw ApiError.Locked(`Пользователь с почтовым адресом ${user.email} заблокирован администратором`);
    }

    return tokenService.generateTokens({ userId: user._id });
  }

  async changeUserSettings({ fullName, photoName }: userSettingsRequestType, userId: string) {
    const user = await userModel.findByPk(userId);

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
    const user = await userModel.findByPk(userId);

    if (!user) {
      throw ApiError.BadRequest('Пользователь не найден');
    }

    //удаление существующей картинки
    fileService.unlinkPhoto(user.photoName, 'Forum/Users');

    await user.update({ photoName: '' });
  }

  async getUsers() {
    const users = await userModel.findAll({ order: [['createdAt', 'DESC']] });

    return users.map((user) => new UsersDto(user));
  }

  async changeIsBanUsers({ users }: isBanUsersRequest) {
    users.forEach(async ({ _id, isBan }) => {
      const changedUser = await userModel.findByPk(_id);

      if (!changedUser) {
        throw ApiError.BadRequest('Пользователь не найден');
      }

      await changedUser.update({ isBan });
    });
  }
}

export default new UserService();
