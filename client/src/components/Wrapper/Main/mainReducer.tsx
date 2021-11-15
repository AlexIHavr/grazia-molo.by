import { makeAutoObservable } from 'mobx';
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { visitorApi } from '../../../api/api';
import config from '../../../config/config';

import { mainNavigationResponseType, mainType, navigationResponseType } from './mainType';

class MainReducer {
  constructor() {
    makeAutoObservable(this);
  }

  state: mainType = {
    documentElem: document.documentElement,
    activateIMoveUpDocument: false,
    activateIMoveUp: false,
    activateIMoveDown: false,
    activateMainMenu: false,
    fixedNavMainPage: false,
    fixedNav: false,
    refContent: null,
    refNavContent: null,
    iSelectedItem: 0,
    currentPage: window.location.href.split('/')[3] || 'MainPage',
    navigations: [],
    mainNavigations: [],
    imagesUrl: process.env.PUBLIC_URL + '/Images/Wrapper/Main/',
    settings: {
      offsetNavScroll: 250, //смещение навигации при появление ее прокрутки (стрелок)
      addOffsetContentScroll: 10, //дополнительный отступ контента при активации навигации
      sliderHeight: 405,
      headerHeight: 110,
      headerHeight1: 250,
      adaptiveWidth1: 1250,
      adaptiveWidth2: 850,
    },
  };

  //получить смещение контента при нажатии на навигацию
  getOffsetContentScroll() {
    const add = this.state.settings.addOffsetContentScroll;

    if (window.innerWidth <= this.state.settings.adaptiveWidth1) {
      return add;
    }

    return this.state.settings.headerHeight + add;
  }

  //установка индекса активного элемента
  setISelectedItem(i: number) {
    if (i !== this.state.iSelectedItem) this.state.iSelectedItem = i;
  }

  //перемещение описания активного элемента вверх экрана
  moveToSelectedItem(refElem: React.MutableRefObject<HTMLDivElement>, selectedItem: string) {
    for (let child of refElem.current.children) {
      const childElem = child as HTMLElement;

      if (childElem.dataset.selected === selectedItem) {
        window.scrollBy(0, child.getBoundingClientRect().y - this.getOffsetContentScroll());
        break;
      }
    }
  }

  //выбор активного элемента при скролле окна
  selectedOnScrollWindow(refElem: React.MutableRefObject<HTMLDivElement>) {
    const children: HTMLCollection | [] = refElem.current?.children || [];
    const documentElem = this.state.documentElem;
    const add = this.state.settings.addOffsetContentScroll;

    for (let i = 0; i < children.length; i++) {
      if (
        !children[i + 1] ||
        children[i + 1].getBoundingClientRect().y > this.getOffsetContentScroll() + add
      ) {
        if (documentElem.scrollHeight > documentElem.scrollTop + documentElem.clientHeight + add) {
          this.scrollNavContentToDirection('WithContent');
          this.setISelectedItem(i);
        }
        break;
      }
    }
  }

  //изменить показ стрелки перемещение вверх контента
  toggleIMoveUpDocumentOnScroll() {
    this.state.activateIMoveUpDocument =
      this.state.refContent.current.getBoundingClientRect().y < 0;
  }

  //активация стрелок перемещение навигации контента
  activateNavContentScrollArrows(refContent: React.MutableRefObject<HTMLDivElement>) {
    if (window.innerWidth > this.state.settings.adaptiveWidth2) {
      const content = refContent.current;

      this.state.activateIMoveUp = content.scrollTop > 0;

      this.state.activateIMoveDown =
        content.scrollTop > 0 &&
        content.scrollTop + content.clientHeight + 5 < content.scrollHeight;
    }
  }

  //перемещение на границы навигации контента при нажатии на стрелки
  scrollNavContentToDirection(direction: 'Up' | 'Down' | 'WithContent') {
    const navContent = this.state.refNavContent.current;

    switch (direction) {
      case 'Up':
        navContent.scrollTo({ top: 0, behavior: 'smooth' });
        break;

      case 'Down':
        navContent.scrollTo({ left: 0, top: navContent.scrollHeight, behavior: 'smooth' });
        break;

      case 'WithContent':
        const activeNavElem = navContent.children[this.state.iSelectedItem];

        if (activeNavElem) {
          const deltaNavScroll =
            activeNavElem.getBoundingClientRect().y -
            this.getOffsetContentScroll() +
            this.state.settings.offsetNavScroll -
            navContent.clientHeight;

          navContent.scrollBy(0, deltaNavScroll);
        }
        break;
    }
  }

  //получение навигации контента разделов без покатегорий
  getSectionNavContentWithoutSubCategories(currentNavigations?: any[]) {
    const categoryNavigations =
      currentNavigations || this.getCategoryNavigations(this.state.currentPage);

    return categoryNavigations.map(({ _id, section }, i) => {
      return (
        <div
          key={_id}
          className={this.state.iSelectedItem === i ? 'active' : ''}
          onClick={() => {
            this.setISelectedItem(i);
            this.moveToSelectedItem(
              this.state.refContent,
              categoryNavigations[this.state.iSelectedItem]._id
            );
          }}
          data-selected={
            this.state.iSelectedItem === i ? categoryNavigations[this.state.iSelectedItem]._id : ''
          }
        >
          {section}
        </div>
      );
    });
  }

  //получение навигации контента разделов с покатегориями
  getSectionNavContentWithSubCategories(currentSubCategory: string) {
    const categoryNavigations = this.getCategoryNavigations(this.state.currentPage);

    return this.getUniqueSubCategories(categoryNavigations).map((uniqueSubCategory) => {
      return (
        <Fragment key={uniqueSubCategory}>
          <NavLink to={`/${this.state.currentPage}/${uniqueSubCategory}`}>
            {uniqueSubCategory}
          </NavLink>

          {currentSubCategory === uniqueSubCategory
            ? categoryNavigations
                .filter((e) => e.subCategory === currentSubCategory)
                .map((e) => {
                  return (
                    <NavLink
                      key={e._id}
                      to={`/${this.state.currentPage}/${uniqueSubCategory}/${e._id}`}
                      className="Sections"
                    >
                      {e.section}
                    </NavLink>
                  );
                })
            : ''}
        </Fragment>
      );
    });
  }

  //получение контента раздела
  getSectionContent(sectionId?: string) {
    if (this.state.navigations.length) {
      const selectedSection = sectionId
        ? [this.state.navigations.find(({ _id }) => _id === sectionId)]
        : this.getCategoryNavigations(this.state.currentPage);

      return selectedSection.map(
        ({ _id, subCategory, section, description, photoNames, videoNames, videoLinks }) => {
          return (
            <div key={_id} data-selected={_id}>
              <h3>{(subCategory ? `${subCategory} - ` : '') + section}</h3>

              <div className="Description">
                {description.map((text) => (
                  <div key={text}>{text}</div>
                ))}
              </div>

              {this.getImages(photoNames, subCategory)}
              {this.getVideo(videoNames, videoLinks)}
            </div>
          );
        }
      );
    }
  }

  //получение картинок
  getImages(photoNames: string[], subCategory: string) {
    if (photoNames.length) {
      return (
        <div className="ContentImages">
          {photoNames.map((photoName) => {
            return (
              <img
                key={photoName}
                src={`${this.state.imagesUrl}${this.state.currentPage}/${
                  subCategory ? subCategory + '/' : ''
                }${photoName}`}
                alt="Картинка не загрузилась"
              />
            );
          })}
        </div>
      );
    }
  }

  //получение видео
  getVideo(videoNames: string[], videoLinks: string[]) {
    if (videoNames.length) {
      return (
        <div className="ContentVideos">
          {videoNames.map((videoName, i) => {
            return (
              <div key={videoLinks[i]}>
                <h3>{videoName}</h3>
                <iframe
                  className="video"
                  src={config.VIDEO_URL + videoLinks[i]}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            );
          })}
        </div>
      );
    }
  }

  //установка текущей страницы при клике на меню
  setCurrentPage(e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) {
    let target = e.target as HTMLAnchorElement;

    if (e.currentTarget.tagName === 'A') {
      target = e.currentTarget as HTMLAnchorElement;
    }

    const arrHrefPage = target.href?.split('/');

    if (arrHrefPage !== undefined) {
      this.state.currentPage = arrHrefPage[arrHrefPage.length - 1] || 'MainPage';
    }

    this.closeMainMenu();
  }

  //фиксирование навигации главной страницы при сколле окна после слайдера
  fixedNavMainPageOnScroll() {
    this.state.fixedNavMainPage =
      this.state.documentElem.scrollTop > this.state.settings.sliderHeight;
  }

  //фиксирование навигации при скролле окна после хедера
  fixedNavOnScroll() {
    if (window.innerWidth <= this.state.settings.adaptiveWidth1) {
      this.state.fixedNav = this.state.documentElem.scrollTop > this.state.settings.headerHeight1;
    }
  }

  //изменить показ главное меню при клике на бар
  toggleActivateMainMenu() {
    this.state.activateMainMenu = !this.state.activateMainMenu;
  }

  //закрыть главное меню
  closeMainMenu() {
    this.state.activateMainMenu = false;
  }

  //получение главной навигации
  async getMainNavigations() {
    try {
      const mainNavigations = await visitorApi.get<mainNavigationResponseType[]>(
        '/getMainNavigations'
      );
      this.state.mainNavigations = mainNavigations.data;
    } catch (e: any) {
      console.log(e.response?.data || e);
    }
  }

  //получение навигации
  async getNavigations() {
    try {
      const navigations = await visitorApi.get<navigationResponseType[]>('/getNavigations');
      this.state.navigations = navigations.data;
    } catch (e: any) {
      console.log(e.response?.data || e);
    }
  }

  //получение навигаций для категории
  getCategoryNavigations(currentCategory: string) {
    return this.state.navigations.filter(({ category }) => category === currentCategory);
  }

  //получение уникальных подкатегорий
  getUniqueSubCategories(categories: navigationResponseType[]) {
    return categories.reduce<string[]>((uniqueArr, category) => {
      if (!uniqueArr.includes(category.subCategory)) uniqueArr.push(category.subCategory);
      return uniqueArr;
    }, []);
  }
}

export default new MainReducer();
