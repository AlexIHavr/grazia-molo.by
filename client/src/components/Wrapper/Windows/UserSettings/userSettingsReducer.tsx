import { makeAutoObservable } from 'mobx';
import React from 'react';
import { userApi } from '../../../../api/api';
import loginReducer from '../Login/loginReducer';
import { userSettingsResponseType, userSettingsType } from './userSettingsType';

class UserSettingsReducer {
  constructor() {
    makeAutoObservable(this);
  }

  state: userSettingsType = {
    activateUserSettings: false,
    errorMessage: '',
    successMessage: '',
    zoomInPhoto: false,
  };

  toggleZoomPhoto() {
    this.state.zoomInPhoto = !this.state.zoomInPhoto;
  }

  showErrorMessage(e: any) {
    this.state.errorMessage = e.response?.data?.message || e.message;
    this.state.successMessage = '';
  }

  showSuccessMessage(message: string) {
    this.state.successMessage = message;
    this.state.errorMessage = '';
  }

  openUserSettings() {
    this.state.activateUserSettings = true;
  }

  closeUserSettings() {
    this.state.activateUserSettings = false;
    this.showSuccessMessage('');
    this.state.zoomInPhoto = false;
  }

  uploadUserPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.files.length) {
      this.showSuccessMessage(`Фото ${e.currentTarget.files[0].name} успешно загружено`);
    } else {
      this.showSuccessMessage('');
    }
  }

  async deleteUserPhoto() {
    try {
      await userApi.delete('/deleteUserPhoto');
      this.showSuccessMessage('Фото успешно удалено');
    } catch (e) {
      this.showErrorMessage(e);
    }
  }

  async changeUserSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    try {
      const response = await userApi.put<userSettingsResponseType>('/changeUserSettings', formData);

      loginReducer.state.userData.fullName = response.data.fullName;
      loginReducer.state.userData.photoName = response.data.photoName;

      this.showSuccessMessage('Настройки успешно изменены');
    } catch (e) {
      this.showErrorMessage(e);
    }
  }
}

export default new UserSettingsReducer();
