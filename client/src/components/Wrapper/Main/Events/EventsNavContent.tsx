import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { NavLink, useParams } from 'react-router-dom';

import eventsReducer from './eventsReducer';

import './eventsStyles.scss';
import mainReducer from '../mainReducer';

const EventsNavContent: React.FC = () => {
  const state = eventsReducer.state;

  const { year } = useParams<{ year: string }>();

  const getNavEvents = (currentYear: string) => {
    if (currentYear === year) {
      return state.events
        .filter((e) => e.subCategory === year)
        .map((e) => {
          return (
            <NavLink key={e._id} to={`/Events/${currentYear}/${e._id}`}>
              {e.section}
            </NavLink>
          );
        });
    }
  };

  // const getNavYears = () => {
  //   return mainReducer.getUniqueSubCategories().map((year) => {
  //     return (
  //       <Fragment key={year}>
  //         <NavLink className="YearsEvents" to={`/Events/${year}`}>
  //           {year}
  //         </NavLink>
  //         {getNavEvents(year)}
  //       </Fragment>
  //     );
  //   });
  // };

  return <>{/* {getNavYears()} */}</>;
};

export default observer(EventsNavContent);
