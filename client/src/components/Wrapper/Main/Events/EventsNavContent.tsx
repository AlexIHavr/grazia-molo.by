import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { NavLink, useParams } from 'react-router-dom';

import { eventType } from './eventsType';

import eventsReducer from './eventsReducer';

import './eventsStyles.scss';

const EventsNavContent: React.FC = () => {
  const state = eventsReducer.state;

  const { year } = useParams<{ year: string }>();

  const getNavEvents = (e: eventType) => {
    if (e.year === year) {
      return e.yearsEvent.map((yearEvent) => {
        return (
          <NavLink
            key={yearEvent.event + e.year}
            className="YearsEvents"
            to={'/Events/' + e.year + '/' + yearEvent.event}
          >
            {yearEvent.eventName}
          </NavLink>
        );
      });
    }
  };

  const getNavYears = () => {
    return state.events.map((e) => {
      return (
        <Fragment key={e.year}>
          <NavLink to={'/Events/' + e.year}>{e.year}</NavLink>
          {getNavEvents(e)}
        </Fragment>
      );
    });
  };

  return <>{getNavYears()}</>;
};

export default observer(EventsNavContent);
