import React from 'react';
import { observer } from 'mobx-react';
import CloseButton from '../../../JSXElements/CloseButton/CloseButton';

import registrationReducer from './registrationReducer';
import preloaderReducer from '../Preloader/preloaderReducer';

const Registration: React.FC = () => {
  const state = registrationReducer.state;

  return (
    <div className={'Registration window ' + (state.activateRegistration ? 'activateWindow' : '')}>
      <CloseButton onClick={() => registrationReducer.closeRegistration()}></CloseButton>
      <form
        className={state.activateThanksRegistration ? 'closeElement' : ''}
        onSubmit={(e) => registrationReducer.registration(e)}
      >
        <h1>Регистрация аккаунта</h1>

        <label htmlFor="FullNameRegistration">Полное имя</label>
        <div className="InputContainer">
          <i className="fas fa-user"></i>
          <input
            id="FullNameRegistration"
            type="text"
            name="fullName"
            placeholder="Введите фамилию и имя"
            required
          />
        </div>

        <label htmlFor="EmailRegistration">Почта</label>
        <div className="InputContainer">
          <i className="fas fa-envelope"></i>
          <input
            id="EmailRegistration"
            type="email"
            name="email"
            placeholder="Введите почту"
            required
          />
        </div>

        <label htmlFor="PasswordRegistration">Пароль</label>
        <div className="InputContainer">
          <i className="fas fa-lock"></i>
          <input
            id="PasswordRegistration"
            type={state.showRegistrationPassword ? 'text' : 'password'}
            name="password"
            placeholder="Введите пароль"
            required
          />
          <div className="PasswordEye" onClick={() => registrationReducer.togglePasswordEye()}>
            {state.showRegistrationPassword ? (
              <i className="fas fa-eye-slash"></i>
            ) : (
              <i className="fas fa-eye"></i>
            )}
          </div>
        </div>

        <label htmlFor="AgeRegistration">Возраст</label>
        <div className="InputContainer">
          <i className="fas fa-users"></i>
          <input
            id="AgeRegistration"
            type="number"
            name="age"
            placeholder="Укажите ваш возраст"
            required
          />
        </div>

        <label htmlFor="IsClubMemberRegistration">Участник клуба</label>
        <div className="IsClubContainer" onClick={() => registrationReducer.toggleIsClubMember()}>
          {state.isClubMember ? (
            <i className="fas fa-user-check"></i>
          ) : (
            <i className="fas fa-user-times"></i>
          )}
        </div>

        <div className="Errors">{state.errorMessage}</div>

        <button
          type="submit"
          className="button"
          disabled={preloaderReducer.state.activatePreloader}
        >
          Зарегистрироваться
        </button>
      </form>
      <h1 className={'ThanksText ' + (state.activateThanksRegistration ? 'openElement' : '')}>
        Вы успешно зарегистрировались!
        <br />
        Для завершения регистрации на указанную почту отправлено письмо для подтверждения.
      </h1>
    </div>
  );
};

export default observer(Registration);
