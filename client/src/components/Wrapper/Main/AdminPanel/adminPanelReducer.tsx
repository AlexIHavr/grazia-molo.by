import React from 'react';
import { makeAutoObservable } from 'mobx';
import { adminApi, userApi } from '../../../../api/api';
import { postCommentsResponseType, postResponseType } from '../Forum/forumType';
import { adminPanelType, commentType, userResponseType, usersResponseType } from './adminPanelType';
import timetableReducer from '../Timetable/timetableReducer';
import { lessonResponseType } from '../Timetable/timetableType';
import eventsReducer from '../Events/eventsReducer';

class AdminPanelReducer {
  constructor() {
    makeAutoObservable(this);
  }

  state: adminPanelType = {
    panels: [
      {
        panel: 'CreatePost',
        panelName: 'Создать пост',
        errorMessage: '',
        successMessage: '',
      },
      {
        panel: 'ChangePost',
        panelName: 'Изменить пост',
        errorMessage: '',
        successMessage: '',
      },
      {
        panel: 'ValidationComments',
        panelName: 'Валидация комментариев',
        errorMessage: '',
        successMessage: '',
      },
      {
        panel: 'BanUsers',
        panelName: 'Блокирование пользователей',
        errorMessage: '',
        successMessage: '',
      },
      {
        panel: 'ManageTimetable',
        panelName: 'Управление расписанием',
        errorMessage: '',
        successMessage: '',
      },
      {
        panel: 'CreateEvent',
        panelName: 'Создать событие',
        errorMessage: '',
        successMessage: '',
      },
      {
        panel: 'ChangeEvent',
        panelName: 'Изменить событие',
        errorMessage: '',
        successMessage: '',
      },
    ],
    posts: [],
    comments: [],
    users: [],
    lessons: [],
    events: [],
    yearEvents: [],
    changedPost: null,
    changedEvent: null,
    isValidatedAll: false,
  };

  //показать ошибки
  showErrorMessage(e: any, selectedPanel: string) {
    const panel = this.state.panels.find(({ panel }) => panel === selectedPanel);

    panel.errorMessage = e.response?.data?.message || e.message;
    panel.successMessage = '';
  }

  //показать успешные сообщения
  showSuccessMessage(message: string, selectedPanel: string) {
    const panel = this.state.panels.find(({ panel }) => panel === selectedPanel);

    panel.successMessage = message;
    panel.errorMessage = '';
  }

  //показать успех при загрузке в браузер фото
  uploadPostPhoto(e: React.ChangeEvent<HTMLInputElement>, selectedPanel: string) {
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
      const comments = await adminApi.get<postCommentsResponseType>('/getUnvalidatedComments');
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
  toogleIsValidatedComment(comment: commentType) {
    comment.isValidated = !comment.isValidated;
  }

  //изменить валидацию всех комментариев
  toogleIsValidatedComments(e: React.MouseEvent<HTMLButtonElement>) {
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
  toogleIsBanUser(user: userResponseType) {
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

  //создание события
  async createEvent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await adminApi.post('/createEvent', new FormData(e.currentTarget));
      this.showSuccessMessage('Событие создано', 'CreateEvent');
    } catch (e) {
      this.showErrorMessage(e, 'CreateEvent');
    }
  }

  //получение событий
  async getEvents() {
    if (!eventsReducer.state.events.length) {
      await eventsReducer.loadEvents();
    }

    this.state.events = [...eventsReducer.state.events];
  }

  //изменение события
  async changeEvent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await adminApi.put('/changeEvent', new FormData(e.currentTarget));
      this.showSuccessMessage('Событие изменено', 'ChangeEvent');
    } catch (e) {
      this.showErrorMessage(e, 'ChangeEvent');
    }
  }

  //выбор событий выбранного года
  selectYearEvents(selectedYear: string) {
    this.state.yearEvents = this.state.events.filter(({ year }) => year === selectedYear);
  }

  //выбор события выбранного года
  selectEvent(id: string) {
    this.state.changedEvent = this.state.events.find(({ _id }) => _id === id);
  }

  //удаление картинки события
  async deleteEventPhoto(photoName: string) {
    try {
      await adminApi.delete('/deleteEventPhoto', {
        data: { eventId: this.state.changedEvent._id, photoName },
      });
      this.showSuccessMessage('Фото успешно удалено', 'ChangeEvent');
    } catch (e) {
      this.showErrorMessage(e, 'ChangeEvent');
    }
  }

  //удалить событие
  async deleteEvent() {
    try {
      await adminApi.delete('/deleteEvent', { data: { eventId: this.state.changedEvent._id } });
      this.showSuccessMessage('Событие успешно удалено', 'ChangeEvent');
    } catch (e) {
      this.showErrorMessage(e, 'ChangeEvent');
    }
  }
}

export default new AdminPanelReducer();
