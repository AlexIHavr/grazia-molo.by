import React from 'react';
import preloaderReducer from '../../Wrapper/Windows/Preloader/preloaderReducer';
import './fileInputContainerStyle.scss';

interface IProps {
  id: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onDelete?: React.MouseEventHandler<HTMLInputElement>;
  multiple?: boolean;
}

const FileInputContainer: React.FC<IProps> = ({ id, onChange, onDelete, multiple }) => {
  return (
    <div className="FileInputContainer">
      <input
        id={id}
        type="file"
        accept=".jpg,.jpeg,.png,.JPG"
        name="photo"
        onChange={onChange}
        multiple={multiple}
      />
      <label htmlFor={id}>
        <div className="UploadInput button">
          <i className="fas fa-upload"></i>
          <span>Загрузить фото</span>
        </div>
      </label>

      {onDelete ? (
        <button
          className="deleteButton"
          onClick={onDelete}
          disabled={preloaderReducer.state.activatePreloader}
        >
          <i className="fas fa-trash-alt"></i>
          Удалить фото
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default FileInputContainer;
