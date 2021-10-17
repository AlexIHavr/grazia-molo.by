import { makeAutoObservable } from 'mobx';
import React from 'react';
import { visitorApi } from '../../../../api/api';
import { loginResponseType, loginType } from './loginType';

class LoginReducer {
  constructor() {
    makeAutoObservable(this);
  }
  state: loginType = {
    showLoginPassword: false,
    errorMessage: '',
    activateThanksLogin: false,
    activateLogin: false,
    isAuth: false,
    userData: {
      _id: '',
      fullName: '',
      photoName: '',
      roles: [],
    },
  };

  //открыть окно логина
  openLogin() {
    this.state.activateLogin = true;
  }

  //закрыть окно логина
  closeLogin() {
    this.state.activateLogin = false;
    this.state.activateThanksLogin = false;
    this.state.showLoginPassword = false;
  }

  //изменить показ пароля
  togglePasswordEye() {
    this.state.showLoginPassword = !this.state.showLoginPassword;
  }

  //показать ошибки
  showErrorMessage(e: any) {
    this.state.errorMessage = e.response?.data?.message || e.message;
  }

  //запрос на вход на сайт
  async login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await visitorApi.post<loginResponseType>(
        '/login',
        new FormData(e.currentTarget)
      );

      if (response.data.isActivated) {
        localStorage.setItem('accessToken', response.data.accessToken);
        this.setUserData(response.data);
        this.state.isAuth = true;
        this.state.activateThanksLogin = true;
        this.state.errorMessage = '';
      } else {
        throw new Error('Указанная почта не подтверждена');
      }
    } catch (e) {
      this.showErrorMessage(e);
    }
  }

  //вход после активации почты
  async loginAfterActivate(activationLink: string) {
    try {
      const response = await visitorApi.post<loginResponseType>('/loginAfterActivate', {
        activationLink,
      });
      localStorage.setItem('accessToken', response.data.accessToken);
      this.setUserData(response.data);
      this.state.isAuth = true;
      return response;
    } catch (e) {
      return null;
    }
  }

  //запрос на выход из сайта
  async logout() {
    try {
      await visitorApi.post('/logout');
      localStorage.removeItem('accessToken');
      this.state.isAuth = false;
    } catch (e: any) {
      console.log(e.response?.data || e);
    }
  }

  //проверка на авторизованность при запуске сайта
  async checkAuth() {
    if (localStorage.getItem('accessToken')) {
      try {
        await this.refreshToken();
        this.state.isAuth = true;
      } catch (e: any) {
        console.log(e.response?.data || e);
      }
    }
  }

  //перезапись токена
  async refreshToken() {
    try {
      const response = await visitorApi.get<loginResponseType>('/refresh');
      localStorage.setItem('accessToken', response.data.accessToken);
      this.setUserData(response.data);
    } catch (e: any) {
      console.log(e.response?.data || e);
    }
  }

  //установка данных пользователя
  setUserData({ _id, fullName, photoName, roles }: loginResponseType) {
    this.state.userData = {
      _id,
      fullName,
      photoName,
      roles,
    };
  }
}

export default new LoginReducer();
