import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { NavLink, useParams } from 'react-router-dom';

import { eventType } from './eventsType';

import eventsReducer from './eventsReducer';

import './eventsStyles.scss';

const EventsNavContent: React.FC = () => {
  const state = eventsReducer.state;

  const { event } = useParams<{ event: string }>();

  const getNavYears = (e: eventType) => {
    if (e.event === event) {
      return e.yearsEvent.map((yearEvent) => {
        return (
          <NavLink
            key={yearEvent.year + e.event}
            className="YearsEvents"
            to={'/Events/' + e.event + '/' + yearEvent.year}
          >
            {yearEvent.year}
          </NavLink>
        );
      });
    }
  };

  const getNavEvents = () => {
    return state.events.map((e) => {
      return (
        <Fragment key={e.event}>
          <NavLink to={'/Events/' + e.event}>{e.eventName}</NavLink>
          {getNavYears(e)}
        </Fragment>
      );
    });
  };

  return <>{getNavEvents()}</>;
};

export default observer(EventsNavContent);
