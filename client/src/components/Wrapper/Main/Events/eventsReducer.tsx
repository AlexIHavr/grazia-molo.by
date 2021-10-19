import { makeAutoObservable } from 'mobx';
import { adminApi } from '../../../../api/api';
import { navigationResponseType } from '../mainType';

import { eventsType } from './eventsType';

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
      const events = await adminApi.get<navigationResponseType[]>('/getNavigations');
      this.state.events = events.data.map((event) => ({ ...event, year: event.subCategory + '' }));
    } catch (e: any) {
      console.log(e.response?.data || e);
    }
  }
}

export default new EventsReducer();
