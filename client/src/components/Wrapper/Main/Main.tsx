import React, { useRef, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';

import MainPageContent from './MainPage/MainPageContent';
import MainPageNavContent from './MainPage/MainPageNavContent';

import DancesContent from './Dances/DancesContent';
import DancesNavContent from './Dances/DancesNavContent';

import TimetableContent from './Timetable/TimetableContent';
import TimetableNavContent from './Timetable/TimetableNavContent';

import EventsContent from './Events/EventsContent';
import EventsNavContent from './Events/EventsNavContent';

import CreativityNavContent from './Creativity/CreativityNavContent';
import CreativityContent from './Creativity/CreativityContent';

import HistoryNavContent from './History/HistoryNavContent';
import HistoryContent from './History/HistoryContent';

import ForumNavContent from './Forum/ForumNavContent';
import ForumContent from './Forum/ForumContent';

import ContactsNavContent from './Contacts/ContactsNavContent';
import ContactsContent from './Contacts/ContactsContent';

import AdminPanelNavContent from './AdminPanel/AdminPanelNavContent';
import AdminPanelContent from './AdminPanel/AdminPanelContent';

import NotFound from './NotFound/NotFound';

import mainReducer from './mainReducer';

import './mainStyles.scss';
import loginReducer from '../Windows/Login/loginReducer';

const Main: React.FC = () => {
  const state = mainReducer.state;

  const refContent = useRef<HTMLDivElement>(null);

  const refNavContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    state.refContent = refContent;
    state.refNavContent = refNavContent;

    window.addEventListener('scroll', () => {
      if (window.innerWidth > state.settings.adaptiveWidth2) {
        mainReducer.selectedOnScrollWindow(refContent);
        mainReducer.fixedNavOnScroll();
      }
    });

    //проверка на авторизованность
    loginReducer.checkAuth();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <i
        style={state.activateIMoveUp ? { display: 'block' } : { display: 'none' }}
        className="fas fa-arrow-circle-up MoveUp"
        onClick={() => mainReducer.scrollNavContentToDirection('Up')}
      ></i>
      <i
        style={state.activateIMoveDown ? { display: 'block' } : { display: 'none' }}
        className="fas fa-arrow-circle-down MoveDown"
        onClick={() => mainReducer.scrollNavContentToDirection('Down')}
      ></i>

      <div
        ref={refNavContent}
        className={
          'NavContent ' +
          state.currentPage +
          (state.fixedNavMainPage ? ' fixedNavMainPage ' : '') +
          (state.fixedNav ? ' fixedNav' : '')
        }
        onScroll={() => mainReducer.activateNavContentScrollArrows(refNavContent)}
      >
        <Switch>
          <Route path="/" component={MainPageNavContent} exact />
          <Route path="/Dances" component={DancesNavContent} exact />
          <Route path="/Timetable" component={TimetableNavContent} exact />
          <Route path="/Events/:event?/:year?" component={EventsNavContent} exact />
          <Route path="/Creativity/:creation?" component={CreativityNavContent} exact />
          <Route path="/History" component={HistoryNavContent} exact />
          <Route path="/Forum" component={ForumNavContent} exact />
          <Route path="/Contacts" component={ContactsNavContent} exact />

          {/* панель администратора */}
          {loginReducer.state.isAuth && loginReducer.state.userData.roles.includes('ADMIN') ? (
            <Route path="/AdminPanel" component={AdminPanelNavContent} exact></Route>
          ) : (
            ''
          )}
        </Switch>
      </div>

      <div ref={refContent} className={'Content ' + state.currentPage}>
        <Switch>
          <Route path="/" component={MainPageContent} exact />
          <Route path="/Dances" component={DancesContent} exact />
          <Route path="/Timetable" component={TimetableContent} exact />
          <Route path="/Events/:event?/:year?" component={EventsContent} exact />
          <Route path="/Creativity/:creation?" component={CreativityContent} exact />
          <Route path="/History" component={HistoryContent} exact />
          <Route path="/Forum" component={ForumContent} exact />
          <Route path="/Contacts" component={ContactsContent} exact />

          {/* панель администратора */}
          {loginReducer.state.isAuth && loginReducer.state.userData.roles.includes('ADMIN') ? (
            <Route path="/AdminPanel" component={AdminPanelContent} exact></Route>
          ) : (
            ''
          )}

          <Route component={NotFound}></Route>
        </Switch>
      </div>
    </main>
  );
};

export default observer(Main);
