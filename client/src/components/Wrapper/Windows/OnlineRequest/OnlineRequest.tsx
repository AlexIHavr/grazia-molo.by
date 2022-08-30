import React from 'react';
import { observer } from 'mobx-react';
import onlineRequestReducer from './OnlineRequestReducer';
import preloaderReducer from '../Preloader/preloaderReducer';
import CloseButton from '../../../JSXElements/CloseButton/CloseButton';

const OnlineRequest: React.FC = () => {
  const state = onlineRequestReducer.state;

  return (
    <div
      className={'OnlineRequest window ' + (state.activateOnlineRequest ? 'activateWindow' : '')}
    >
      <CloseButton
        onClick={() => {
          onlineRequestReducer.closeOnlineRequest();
        }}
      ></CloseButton>
      <form
        className={state.activateThanksOnline ? 'closeElement' : ''}
        onSubmit={(e) => onlineRequestReducer.sendOnlineRequest(e)}
      >
        <h1>Запишись на занятия онлайн!</h1>
        <label htmlFor="NameOnline">Имя</label>
        <div className="InputContainer">
          <i className="fas fa-user"></i>
          <input id="NameOnline" type="text" name="name" placeholder="Введите имя" required />
        </div>
        <label htmlFor="PhoneOnline">Телефон</label>
        <div className="InputContainer">
          <i className="fas fa-phone"></i>
          <input id="PhoneOnline" type="text" name="phone" defaultValue="+375" required />
        </div>
        <label htmlFor="AgeOnline">Возраст</label>
        <div className="InputContainer">
          <i className="fas fa-users"></i>
          <input id="AgeOnline" type="number" name="age" placeholder="Введите возраст" required />
        </div>
        <div className="Errors">{state.errorMessage}</div>
        <button
          type="submit"
          className="button"
          disabled={preloaderReducer.state.activatePreloader}
        >
          Отправить
        </button>
      </form>
      <h1 className={'ThanksText ' + (state.activateThanksOnline ? 'openElement' : '')}>
        Спасибо за запись!
        <br />
        Мы свяжемся с вами в ближайшее время!
      </h1>
    </div>
  );
};

export default observer(OnlineRequest);
