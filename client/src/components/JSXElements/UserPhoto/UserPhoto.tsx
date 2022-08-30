import React from 'react';
import loginReducer from '../../Wrapper/Windows/Login/loginReducer';
import './userPhotoStyle.scss';

const UserPhoto: React.FC<{ photoName?: string }> = ({ children, photoName }) => {
  return (
    <div className="UserPhoto">
      {photoName ? (
        children
      ) : photoName === '' || !loginReducer.state.userData.photoName ? (
        <i className="fas fa-user-circle"></i>
      ) : (
        children
      )}
    </div>
  );
};

export default UserPhoto;
