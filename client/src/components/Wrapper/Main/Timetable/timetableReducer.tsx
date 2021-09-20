import { makeAutoObservable } from 'mobx';
import { visitorApi } from '../../../../api/api';

import { lessonsResponseType, timetableType } from './timetableType';

class TimetableReducer {
  constructor() {
    makeAutoObservable(this);
  }

  state: timetableType = {
    days: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
    lessons: [],
  };

  async getLessons() {
    try {
      const response = await visitorApi.get<lessonsResponseType>('/getLessons');
      this.state.lessons = response.data;
    } catch (e: any) {
      console.log(e.response?.data || e);
    }
  }
}

export default new TimetableReducer();
