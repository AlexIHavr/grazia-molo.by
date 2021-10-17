import { makeAutoObservable } from 'mobx';
import { adminApi } from '../../../../api/api';

import { eventResponseType, eventsType } from './eventsType';

class EventsReducer {
  constructor() {
    makeAutoObservable(this);
  }

  state: eventsType = {
    events: [],
    imagesUrl: process.env.PUBLIC_URL + '/Images/Wrapper/Main/Events/',
  };

  async loadEvents() {
    try {
      const events = await adminApi.get<eventResponseType[]>('/getEvents');
      this.state.events = events.data.map((event) => ({ ...event, year: event.year + '' }));
    } catch (e: any) {
      console.log(e.response?.data || e);
    }
  }

  getUniqueYears() {
    return this.state.events.reduce((uniqueArr, e) => {
      if (!uniqueArr.includes(e.year)) uniqueArr.push(e.year);
      return uniqueArr;
    }, []);
  }
}

export default new EventsReducer();
