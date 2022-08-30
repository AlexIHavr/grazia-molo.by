import React from 'react';
import { makeAutoObservable } from 'mobx';
import { adminApi, userApi, visitorApi } from '../../../../api/api';
import { postCommentsResponseType, postResponseType } from '../Forum/forumType';
import { adminPanelType, commentType, sliderResponseType, userResponseType, usersResponseType } from './adminPanelType';
import timetableReducer from '../Timetable/timetableReducer';
import { lessonResponseType } from '../Timetable/timetableType';
import mainReducer from '../mainReducer';

class AdminPanelReducer {
  constructor() {
    makeAutoObservable(this);
  }

  state: adminPanelType = {
    panels: [
      {
        _id: 'CreateSection',
        section: 'Создать раздел',
        errorMessage: '',
        successMessage: '',
      },
      {
        _id: 'ChangeSection',
        section: 'Изменить раздел',
        errorMessage: '',
        successMessage: '',
      },
      {
        _id: 'ChangeSlider',
        section: 'Изменить слайдер',
        errorMessage: '',
        successMessage: '',
      },
      {
        _id: 'ManageTimetable',
        section: 'Управление расписанием',
        errorMessage: '',
        successMessage: '',
      },
      {
        _id: 'CreatePost',
        section: 'Создать пост',
        errorMessage: '',
        successMessage: '',
      },
      {
        _id: 'ChangePost',
        section: 'Изменить пост',
        errorMessage: '',
        successMessage: '',
      },
      {
        _id: 'ValidationComments',
        section: 'Валидация комментариев',
        errorMessage: '',
        successMessage: '',
      },
      {
        _id: 'BanUsers',
        section: 'Блокирование пользователей',
        errorMessage: '',
        successMessage: '',
      },
    ],
    posts: [],
    comments: [],
    users: [],
    lessons: [],
    sliders: [],
    changedCategories: [],
    changedSubCategories: [],
    changedSection: null,
    changedPost: null,
    selectedCategory: null,
    isValidatedAll: false,
  };

  //показать ошибки
  showErrorMessage(e: any, selectedPanel: string) {
    const panel = this.state.panels.find(({ _id }) => _id === selectedPanel);

    panel.errorMessage = e.response?.data?.message || e.message;
    panel.successMessage = '';
  }

  //показать успешные сообщения
  showSuccessMessage(message: string, selectedPanel: string) {
    const panel = this.state.panels.find(({ _id }) => _id === selectedPanel);

    panel.successMessage = message;
    panel.errorMessage = '';
  }

  //показать успех при загрузке в браузер фото
  uploadPhotos(e: React.ChangeEvent<HTMLInputElement>, selectedPanel: string) {
    if (e.currentTarget.files.length) {
      const nameFiles = Array.from(e.currentTarget.files).reduce((message, file, i, arr) => {
        return (message += file.name + (i !== arr.length - 1 ? ', ' : ''));
      }, '');

      this.showSuccessMessage(`Фото ${nameFiles} успешно загружены`, selectedPanel);
    } else {
      this.showSuccessMessage('', selectedPanel);
    }
  }

  //выбор изменяемого поста
  selectPost(id: string) {
    this.state.changedPost = this.state.posts.find(({ _id }) => _id === id);
  }

  //загрузить все посты
  async loadPosts() {
    try {
      const posts = await userApi.get<postResponseType[]>('/getPosts');
      this.state.posts = posts.data;
    } catch (e: any) {
      console.log(e.response?.data || e);
    }
  }

  //загрузить невалидные комментарии
  async loadUnvalidatedComments() {
    try {
      const comments = await adminApi.get<postCommentsResponseType>('/getInvalidatedComments');
      this.state.comments = comments.data.map((comment) => {
        return Object.assign(comment, { isValidated: false });
      });
    } catch (e: any) {
      console.log(e.response?.data || e);
    }
  }

  //создание поста
  async createPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await adminApi.post('/createPost', new FormData(e.currentTarget));
      this.showSuccessMessage('Пост успешно создан', 'CreatePost');
    } catch (e) {
      this.showErrorMessage(e, 'CreatePost');
    }
  }

  //изменение поста
  async changePost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await adminApi.put('/changePost', new FormData(e.currentTarget));
      this.showSuccessMessage('Пост успешно изменен', 'ChangePost');
    } catch (e) {
      this.showErrorMessage(e, 'ChangePost');
    }
  }

  //удаление фото поста
  async deletePostPhoto() {
    try {
      await adminApi.delete('/deletePostPhoto', { data: { postId: this.state.changedPost._id } });
      this.showSuccessMessage('Фото успешно удалено', 'ChangePost');
    } catch (e) {
      this.showErrorMessage(e, 'ChangePost');
    }
  }

  //удаление поста
  async deletePost() {
    try {
      await adminApi.delete('/deletePost', { data: { postId: this.state.changedPost._id } });
      this.showSuccessMessage('Пост успешно удален', 'ChangePost');
    } catch (e) {
      this.showErrorMessage(e, 'ChangePost');
    }
  }

  //изменить валидацию комментария
  toggleIsValidatedComment(comment: commentType) {
    comment.isValidated = !comment.isValidated;
  }

  //изменить валидацию всех комментариев
  toggleIsValidatedComments(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    this.state.isValidatedAll = !this.state.isValidatedAll;
    this.state.comments = this.state.comments.map((comment) => ({
      ...comment,
      isValidated: this.state.isValidatedAll,
    }));
  }

  //изменить валидацию комментариев на сервере
  async changeIsValidatedComments(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const isValidatedCommentsRequest = this.state.comments.map(({ _id, isValidated }) => ({
        _id,
        isValidated,
      }));

      await adminApi.put('/changeIsValidatedComments', { comments: isValidatedCommentsRequest });
      this.showSuccessMessage('Изменения приняты', 'ValidationComments');
    } catch (e) {
      this.showErrorMessage(e, 'ValidationComments');
    }
  }

  //получение всех пользователей
  async getUsers() {
    try {
      const users = await adminApi.get<usersResponseType>('/getUsers');
      this.state.users = users.data;

      //добавление флага на увеличение фото
      this.state.users = this.state.users.map((user) => ({ ...user, zoomInPhoto: false }));
    } catch (e: any) {
      console.log(e.response?.data || e);
    }
  }

  //изменить бан пользователя
  toggleIsBanUser(user: userResponseType) {
    user.isBan = !user.isBan;
  }

  //изменить бан пользователей на сервера
  async changeIsBanUsers(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const isBanUsersRequest = this.state.users.map(({ _id, isBan }) => ({
        _id,
        isBan,
      }));

      await adminApi.put('/changeIsBanUsers', { users: isBanUsersRequest });
      this.showSuccessMessage('Изменения приняты', 'BanUsers');
    } catch (e) {
      this.showErrorMessage(e, 'BanUsers');
    }
  }

  //получить все уроки
  async getLessons() {
    if (!timetableReducer.state.lessons.length) {
      await timetableReducer.getLessons();
    }

    this.state.lessons = [...timetableReducer.state.lessons];
  }

  //изменение времени урока
  changeTimeLesson(e: React.ChangeEvent<HTMLInputElement>, lesson: lessonResponseType) {
    lesson.time = e.currentTarget.value;
  }

  //изменение группы урока
  changeGroupLesson(e: React.ChangeEvent<HTMLInputElement>, lesson: lessonResponseType) {
    lesson.group = e.currentTarget.value;
  }

  //удаление урока
  deleteLesson(lesson: lessonResponseType, iLesson: number) {
    if (lesson._id) {
      lesson.day = '';
    } else {
      this.state.lessons.splice(iLesson, 1);
    }
  }

  //добавление урока
  addLesson(day: string) {
    this.state.lessons.push({ _id: '', day, time: '', group: '' });
  }

  //изменить расписание
  async changeTimetable(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await adminApi.put('/changeTimetable', { lessons: this.state.lessons });
      this.showSuccessMessage('Расписание сохранено', 'ManageTimetable');
    } catch (e) {
      this.showErrorMessage(e, 'ManageTimetable');
    }
  }

  //создание раздела
  async createSection(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await adminApi.post('/createSection', new FormData(e.currentTarget));
      this.showSuccessMessage('Раздел создан', 'CreateSection');
    } catch (e) {
      this.showErrorMessage(e, 'CreateSection');
    }
  }

  //изменение раздела
  async changeSection(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await adminApi.put('/changeSection', new FormData(e.currentTarget));
      this.showSuccessMessage('Раздел изменен', 'ChangeSection');
    } catch (e) {
      this.showErrorMessage(e, 'ChangeSection');
    }
  }

  //выбор изменяемых подкатегорий
  selectChangedSubCategories(selectSubCategory: string) {
    this.state.changedSubCategories = this.state.changedCategories.filter(({ subCategory }) => subCategory === selectSubCategory);
    this.state.changedSection = null;
  }

  //выбор категории
  selectCategory(category: string) {
    this.state.selectedCategory = category;
  }

  //выбор изменяемой категории
  selectChangedCategory(selectCategory: string) {
    this.state.changedCategories = mainReducer.getCategoryNavigations(selectCategory);
    this.state.changedSubCategories = [];
  }

  //выбор изменяемого раздела
  selectChangedSection(id: string) {
    this.state.changedSection = this.state.changedSubCategories.find(({ _id }) => _id === id);
  }

  //удаление картинки раздела
  async deleteSectionPhoto(photoName: string) {
    try {
      await adminApi.delete('/deleteSectionPhoto', {
        data: { sectionId: this.state.changedSection._id, photoName },
      });
      this.showSuccessMessage('Фото успешно удалено', 'ChangeSection');
    } catch (e) {
      this.showErrorMessage(e, 'ChangeSection');
    }
  }

  //удалить раздел
  async deleteSection() {
    try {
      await adminApi.delete('/deleteSection', {
        data: { sectionId: this.state.changedSection._id },
      });
      this.showSuccessMessage('Раздел успешно удален', 'ChangeSection');
    } catch (e) {
      this.showErrorMessage(e, 'ChangeSection');
    }
  }

  //получить слайдеры
  async getSliders() {
    try {
      const sliders = await visitorApi.get<sliderResponseType[]>('/getSliders');
      this.state.sliders = sliders.data;
    } catch (e: any) {
      console.log(e.response?.data || e);
    }
  }

  //изменить слайдер
  async changeSlider(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await adminApi.put('/changeSlider', new FormData(e.currentTarget));
      this.showSuccessMessage('Слайдер изменен', 'ChangeSlider');
    } catch (e) {
      this.showErrorMessage(e, 'ChangeSlider');
    }
  }

  //удаление фото слайдера
  async deleteSliderPhoto(photoName: string) {
    try {
      await adminApi.delete('/deleteSliderPhoto', {
        data: { photoName },
      });
      this.showSuccessMessage('Фото успешно удалено', 'ChangeSlider');
    } catch (e) {
      this.showErrorMessage(e, 'ChangeSlider');
    }
  }
}

export default new AdminPanelReducer();
