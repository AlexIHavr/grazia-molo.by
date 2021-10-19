import React, { useState } from 'react';
import './selectStyle.scss';

interface IProps {
  inputName: string;
  onSelect: Function;
  options: {
    _id: string;
    name: string;
  }[];
  defaultTitle: string;
  isNullValue?: boolean; //только при наличии зависимого селекта (селекта-родителя)
}

const Select: React.FC<IProps> = ({ inputName, onSelect, options, defaultTitle, isNullValue }) => {
  const [id, setId] = useState<string>('');
  const [value, setValue] = useState<string>(defaultTitle);
  const [showSelectOptions, setShowSelectOptions] = useState<boolean>(false);

  const changeValue = (e: React.MouseEvent<HTMLDivElement>) => {
    const option = e.target as HTMLDivElement;
    setId(option.dataset.id);
    setValue(option.innerHTML);
    onSelect(option.dataset.id);
  };

  return (
    <div
      className={'Select ' + (showSelectOptions ? 'clickedSelect' : '')}
      onClick={() => setShowSelectOptions(!showSelectOptions)}
    >
      <input type="hidden" name={inputName} value={id} />
      <div className="SelectValue">
        <div>{isNullValue ? defaultTitle : value}</div>
        <i
          className={'fas fa-chevron-circle-down ' + (showSelectOptions ? 'rotateSelectArrow' : '')}
        ></i>
      </div>
      <div
        className={
          'SelectOptions ' +
          (showSelectOptions ? 'showSelectOptions ' : '') +
          (!id ? 'cancelAbsoluteOptions' : '')
        }
        onClick={(e) => changeValue(e)}
      >
        {options.map(({ _id, name }) => {
          return (
            <div key={_id} data-id={_id}>
              {name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Select;
