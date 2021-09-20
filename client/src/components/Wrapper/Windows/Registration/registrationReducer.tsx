import { makeAutoObservable } from 'mobx';
import { visitorApi } from '../../../../api/api';
import { registrationType } from './registrationType';

class RegistrationReducer {
  constructor() {
    makeAutoObservable(this);
  }
  state: registrationType = {
    errorMessage: '',
    showRegistrationPassword: false,
    activateRegistration: false,
    activateThanksRegistration: false,
    isClubMember: false,
  };

  //открыть окно регистрации
  openRegistration() {
    this.state.activateRegistration = true;
  }

  //закрыть окно регистрации
  closeRegistration() {
    this.state.activateRegistration = false;
    this.state.activateThanksRegistration = false;
    this.state.showRegistrationPassword = false;
  }

  //изменить показ пароля
  togglePasswordEye() {
    this.state.showRegistrationPassword = !this.state.showRegistrationPassword;
  }

  //изменить чекбокс участник клуба
  toggleIsClubMember() {
    this.state.isClubMember = !this.state.isClubMember;
  }

  async registration(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      formData.append('isClubMember', this.state.isClubMember ? '1' : '0');

      await visitorApi.post('/registration', formData);

      this.state.activateThanksRegistration = true;
      this.state.errorMessage = '';
    } catch (e) {
      this.showErrorMessage(e);
    }
  }

  //показать ошибки
  showErrorMessage(e: any) {
    this.state.errorMessage = e.response?.data?.message || e.message;
  }
}

export default new RegistrationReducer();
