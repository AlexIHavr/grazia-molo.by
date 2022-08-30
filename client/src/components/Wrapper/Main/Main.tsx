import React, { useRef, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';

import TimetableContent from './Timetable/TimetableContent';
import TimetableNavContent from './Timetable/TimetableNavContent';

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

      if (window.innerWidth < state.settings.adaptiveWidth1) {
        mainReducer.toggleIMoveUpDocumentOnScroll();
      } else if (state.currentPage === 'MainPage') {
        //фиксирование навигации главной страницы после слайдера
        mainReducer.fixedNavMainPageOnScroll();
      }
    });

    //проверка на авторизованность
    loginReducer.checkAuth();

    //получение навигации
    mainReducer.getNavigations();

    //получение главной навигации
    mainReducer.getMainNavigations();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <i
        className={
          'fas fa-arrow-circle-up MoveUpDocument' +
          (state.activateIMoveUpDocument ? ' openElement' : '')
        }
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      ></i>
      <i
        className={'fas fa-arrow-circle-up MoveUp' + (state.activateIMoveUp ? ' openElement' : '')}
        onClick={() => mainReducer.scrollNavContentToDirection('Up')}
      ></i>
      <i
        className={
          'fas fa-arrow-circle-down MoveDown' + (state.activateIMoveDown ? ' openElement' : '')
        }
        onClick={() => mainReducer.scrollNavContentToDirection('Down')}
      ></i>

      <div
        ref={refNavContent}
        className={
          'NavContent ' +
          state.currentPage +
          (state.fixedNavMainPage ? ' fixedNavMainPage ' : '') +
          (state.fixedNav ? ' fixedNav ' : '')
        }
        data-withsubcategories={
          state.mainNavigations.find(({ category }) => category === state.currentPage)
            ?.withSubCategories
        }
        onScroll={() => mainReducer.activateNavContentScrollArrows(refNavContent)}
      >
        <Switch>
          {/* неизменяемые страницы сайта */}
          <Route path="/Timetable" component={TimetableNavContent} exact />
          <Route path="/Forum" component={ForumNavContent} exact />
          <Route path="/Contacts" component={ContactsNavContent} exact />

          {/* изменяемые страницы сайта */}
          {state.navigations.length && state.iSelectedItem >= 0
            ? mainReducer.state.mainNavigations
                .filter(({ changeable }) => changeable)
                .map(({ category, withSubCategories }) => {
                  return (
                    <Route
                      key={category}
                      path={`/${category === 'MainPage' ? '' : category}/:subCategory?/:section?`}
                      render={({ match }) => {
                        const { subCategory } = match.params;
                        return withSubCategories
                          ? mainReducer.getSectionNavContentWithSubCategories(subCategory)
                          : mainReducer.getSectionNavContentWithoutSubCategories();
                      }}
                      exact
                    />
                  );
                })
            : ''}

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
          {/* неизменяемые страницы сайта */}
          <Route path="/Timetable" component={TimetableContent} exact />
          <Route path="/Forum" component={ForumContent} exact />
          <Route path="/Contacts" component={ContactsContent} exact />

          {/* изменяемые страницы сайта */}
          {state.navigations.length &&
            mainReducer.state.mainNavigations
              .filter(({ changeable }) => changeable)
              .map(({ category, withSubCategories }) => {
                return (
                  <Route
                    key={category}
                    path={`/${category === 'MainPage' ? '' : category}/:subCategory?/:section?`}
                    render={({ match }) => {
                      const { subCategory, section } = match.params;
                      return withSubCategories ? (
                        subCategory !== undefined && section !== undefined ? (
                          mainReducer.getSectionContent(section)
                        ) : (
                          <div className="Description">
                            {mainReducer.getCategoryNavigations(state.currentPage).length
                              ? mainReducer
                                  .getCategoryNavigations(state.currentPage)[0]
                                  .startDescription.map((value) => {
                                    return <div>{value}</div>;
                                  })
                              : ''}
                          </div>
                        )
                      ) : (
                        mainReducer.getSectionContent()
                      );
                    }}
                    exact
                  />
                );
              })}

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
