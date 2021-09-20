import React from 'react';
import { observer } from 'mobx-react';
import CloseButton from '../../../JSXElements/CloseButton/CloseButton';
import loginReducer from './loginReducer';
import preloaderReducer from '../Preloader/preloaderReducer';

const Login: React.FC = () => {
  const state = loginReducer.state;

  return (
    <div className={'Login window ' + (state.activateLogin ? 'activateWindow' : '')}>
      <CloseButton
        onClick={() => {
          loginReducer.closeLogin();
        }}
      ></CloseButton>
      <form
        className={state.activateThanksLogin ? 'closeElement' : ''}
        onSubmit={(e) => loginReducer.login(e)}
      >
        <h1>Вход в аккаунт</h1>
        <label htmlFor="EmailLogin">Почта</label>
        <div className="InputContainer">
          <i className="fas fa-envelope"></i>
          <input id="EmailLogin" name="email" type="email" placeholder="Введите почту" required />
        </div>
        <label htmlFor="PasswordLogin">Пароль</label>
        <div className="InputContainer">
          <i className="fas fa-lock"></i>
          <input
            id="PasswordLogin"
            name="password"
            type={state.showLoginPassword ? 'text' : 'password'}
            placeholder="Введите пароль"
            required
          />
          <div className="PasswordEye" onClick={() => loginReducer.togglePasswordEye()}>
            {state.showLoginPassword ? (
              <i className="fas fa-eye-slash"></i>
            ) : (
              <i className="fas fa-eye"></i>
            )}
          </div>
        </div>
        <div className="Errors">{state.errorMessage}</div>
        <button
          type="submit"
          className="button"
          disabled={preloaderReducer.state.activatePreloader}
        >
          Войти
        </button>
      </form>
      <h1 className={'ThanksText ' + (state.activateThanksLogin ? 'openElement' : '')}>
        Добро пожаловать, <br /> {loginReducer.state.userData.fullName}!
        <br />
        {loginReducer.state.userData.roles.includes('ADMIN') ? 'АДМИНИСТРАТОР' : ''}
      </h1>
    </div>
  );
};

export default observer(Login);
