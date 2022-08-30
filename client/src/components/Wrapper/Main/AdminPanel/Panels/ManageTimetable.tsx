import React from 'react';
import { observer } from 'mobx-react';
import preloaderReducer from '../../../Windows/Preloader/preloaderReducer';
import adminPanelReducer from '../adminPanelReducer';
import timetableReducer from '../../Timetable/timetableReducer';

const ManageTimetable: React.FC = () => {
  const state = adminPanelReducer.state;

  const adminPanel = state.panels.find((adminPanel) => adminPanel._id === 'ManageTimetable');

  const getLessons = (day: string) => {
    return state.lessons.map((lesson, i) => {
      if (lesson.day === day) {
        const id = lesson._id || Math.random().toString(16).slice(2) + '';
        return (
          <div key={id}>
            <label htmlFor={`time/${id}`}>Время</label>
            <input
              id={`time/${id}`}
              onBlur={(e) => adminPanelReducer.changeTimeLesson(e, lesson)}
              type="text"
              defaultValue={lesson.time}
              required
            />
            <label htmlFor={`group/${id}`}>Группа</label>
            <input
              id={`group/${id}`}
              onBlur={(e) => adminPanelReducer.changeGroupLesson(e, lesson)}
              type="text"
              defaultValue={lesson.group}
              required
            />
            <div className="DeleteLesson" onClick={() => adminPanelReducer.deleteLesson(lesson, i)}>
              <i className="fas fa-minus"></i>
            </div>
          </div>
        );
      }
      return false;
    });
  };

  return (
    <div className={adminPanel._id + ' window'} data-selected={adminPanel._id}>
      <form
        onSubmit={(e) => {
          adminPanelReducer.changeTimetable(e);
        }}
      >
        <h1>{adminPanel.section}</h1>
        <div className="Timetable">
          {timetableReducer.state.days.map((day) => {
            return (
              <div key={day}>
                <h3>{day}</h3>
                {getLessons(day)}
                <div className="AddLesson" onClick={() => adminPanelReducer.addLesson(day)}>
                  <i className="fas fa-plus"></i>
                </div>
              </div>
            );
          })}
        </div>
        <div className="Errors">{adminPanel.errorMessage}</div>
        <div className="Successes">{adminPanel.successMessage}</div>
        <button
          type="submit"
          className="button"
          disabled={preloaderReducer.state.activatePreloader}
        >
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default observer(ManageTimetable);
