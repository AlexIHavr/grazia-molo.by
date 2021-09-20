import { makeAutoObservable } from 'mobx';
import React from 'react';
import { video } from './Events/eventsType';
import config from '../../../config/config';

import { mainType } from './mainType';

class MainReducer {
  constructor() {
    makeAutoObservable(this);
  }

  state: mainType = {
    documentElem: document.documentElement,
    activateIMoveUp: false,
    activateIMoveDown: false,
    activateMainMenu: false,
    fixedNavMainPage: false,
    fixedNav: false,
    refContent: null,
    refNavContent: null,
    iSelectedItem: 0,
    currentPage:
      window.location.href.split('/')[window.location.href.split('/').length - 1] || 'MainPage',
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
        navContent.scrollTo(0, 0);
        break;

      case 'Down':
        navContent.scrollTo(0, navContent.scrollHeight);
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

  //получение простой навигации контента безссылочных разделов
  getSimpleNavContent(nav: any[], title: string) {
    return nav.map((value, i, nav) => {
      return (
        <div
          key={value[title]}
          className={this.state.iSelectedItem === i ? 'active' : ''}
          onClick={() => {
            this.setISelectedItem(i);
            this.moveToSelectedItem(this.state.refContent, nav[this.state.iSelectedItem][title]);
          }}
          data-selected={this.state.iSelectedItem === i ? nav[this.state.iSelectedItem][title] : ''}
        >
          {value[title + 'Name'] !== undefined ? value[title + 'Name'] : value[title]}
        </div>
      );
    });
  }

  //получение описания раздела
  getDescription(description: string[]) {
    return (
      <div className="Description">
        {description.map((text) => {
          return <div key={text}>{text}</div>;
        })}
      </div>
    );
  }

  //получение картинок
  getImages(images: string[], baseUrl: string) {
    if (images) {
      return (
        <div className="ContentImages">
          {images.map((image) => {
            return <img key={image} src={baseUrl + '/' + image} alt="Картинка не загрузилась" />;
          })}
        </div>
      );
    }
  }

  //получение видео
  getVideo(videos: video[]) {
    if (videos) {
      return (
        <div className="ContentVideos">
          {videos.map((video) => {
            return (
              <div key={video.url}>
                <h3>{video.name}</h3>
                <iframe
                  className="video"
                  src={config.VIDEO_URL + video.url}
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

  //получение простого контента
  getSimpleContent(content: any[], title: string, imagesUrl?: string) {
    return content.map((value) => {
      return (
        <div key={value[title]} data-selected={value[title]}>
          <h3>{value[title + 'Name'] !== undefined ? value[title + 'Name'] : value[title]}</h3>
          {this.getDescription(value.description)}
          {this.getImages(value.images, imagesUrl + value[title])}
          {this.getVideo(value.videos)}
        </div>
      );
    });
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
  toogleActivateMainMenu() {
    this.state.activateMainMenu = !this.state.activateMainMenu;
  }

  //закрыть главное меню
  closeMainMenu() {
    this.state.activateMainMenu = false;
  }
}

export default new MainReducer();
