import { makeAutoObservable } from 'mobx';
import { visitorApi } from '../../../../api/api';
import React from 'react';
import { onlineRequestType } from './onlineRequestType';

class OnlineRequestReducer {
  constructor() {
    makeAutoObservable(this);
  }

  state: onlineRequestType = {
    activateOnlineRequest: false,
    activateThanksOnline: false,
    errorMessage: '',
  };

  //открыть окно онлайн заявки
  openOnlineRequest() {
    this.state.activateOnlineRequest = true;
  }

  //закрыть окно онлайн заявки
  closeOnlineRequest() {
    this.state.activateOnlineRequest = false;
    this.state.activateThanksOnline = false;
  }

  //отправка на mail запись на занятие
  async sendOnlineRequest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await visitorApi.post('/sendOnlineMail', new FormData(e.currentTarget));
      this.state.activateThanksOnline = true;
    } catch (e: any) {
      this.state.errorMessage = e.response?.data?.message || e.message;
    }
  }
}

export default new OnlineRequestReducer();
