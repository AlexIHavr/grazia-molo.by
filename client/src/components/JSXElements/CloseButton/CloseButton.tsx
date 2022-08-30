import React from 'react';
import './closeButtonStyles.scss';

interface IProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const CloseButton: React.FC<IProps> = ({ onClick }) => {
  return (
    <div className="CloseButton" onClick={onClick}>
      <i className="fas fa-times"></i>
    </div>
  );
};

export default CloseButton;
