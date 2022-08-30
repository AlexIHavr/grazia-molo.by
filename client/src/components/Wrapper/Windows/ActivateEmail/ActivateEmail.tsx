import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import loginReducer from '../Login/loginReducer';
import './activateEmailStyles.scss';

const ActivateEmail: React.FC = () => {
  const { link } = useParams<{ link: string }>();
  const [successActivate, setSuccessActivate] = useState(true);

  useEffect(() => {
    loginReducer.loginAfterActivate(link).then((response) => {
      if (!response) setSuccessActivate(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ActivateEmail window">
      {successActivate ? (
        <span className="SuccessActivate">
          Вы успешно активировали почту!
          <br />
          Благодарим за регистрацию аккаунта.
        </span>
      ) : (
        <span className="ErrorActivate">
          Данная ссылка не является ссылкой активации. <br /> Повторите активация аккаунта.
        </span>
      )}
      <br />
      <span>Нажмите ОК для перехода на главную страницу.</span>
      <NavLink to="/" className="button">
        ОК
      </NavLink>
    </div>
  );
};

export default ActivateEmail;
