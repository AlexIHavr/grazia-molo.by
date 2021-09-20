import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import timetableReducer from './timetableReducer';

const Timetable: React.FC = () => {
  const state = timetableReducer.state;

  const getTimetable = () => {
    return state.days.map((day) => {
      return (
        <div key={day}>
          <h3>{day}</h3>
          {state.lessons.map((lesson) => {
            if (lesson.day === day) {
              return (
                <div key={lesson._id}>
                  <div className="TimeLesson">{lesson.time}</div>
                  <div>{lesson.group}</div>
                </div>
              );
            }
            return false;
          })}
        </div>
      );
    });
  };

  useEffect(() => {
    timetableReducer.getLessons();
  }, []);

  return (
    <>
      <div className="TimetableContent">
        <h2>Рассписание занятий на текущий учебный год</h2>
        <div className="Timetable">{getTimetable()}</div>
      </div>
    </>
  );
};

export default observer(Timetable);
