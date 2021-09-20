import React from 'react';
import { observer } from 'mobx-react';

import './timetableStyles.scss';

const Timetable: React.FC = () => {
  return (
    <>
      <div className="active">
        2021-2022 <br /> учебный год
      </div>
    </>
  );
};

export default observer(Timetable);
