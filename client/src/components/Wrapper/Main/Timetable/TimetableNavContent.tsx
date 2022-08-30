import React from 'react';
import { observer } from 'mobx-react';

import './timetableStyles.scss';

const Timetable: React.FC = () => {
  return (
    <>
      <div className="active">
        2022-2023 <br /> учебный год
      </div>
    </>
  );
};

export default observer(Timetable);
