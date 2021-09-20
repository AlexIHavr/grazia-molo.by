import { makeAutoObservable } from 'mobx';

import { historyType } from './historyType';

class HistoryReducer {
  constructor() {
    makeAutoObservable(this);
  }

  state: historyType = {
    historyYears: [
      {
        year: '2010',
        description: [
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga sed eligendi, hic recusandae eos perspiciatis nulla tenetur illum vero rem, ducimus, voluptas neque facilis error magni atque beatae quasi voluptatem modi ex omnis! Omnis nulla similique deleniti veritatis in libero voluptatibus minus nesciunt ea! Impedit, officia nulla, laborum blanditiis perferendis a praesentium debitis libero ipsam quae inventore hic, eligendi consectetur eaque officiis error excepturi tenetur! Ab voluptatibus quibusdam fugiat quae molestiae, harum minus eos iure, delectus beatae dolorum molestias. Harum, quasi aperiam veritatis, itaque autem voluptates id natus labore placeat obcaecati modi illum quibusdam ratione dolorum molestias pariatur rerum iste.',
        ],
      },
      {
        year: '2011',
        description: [
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga sed eligendi, hic recusandae eos perspiciatis nulla tenetur illum vero rem, ducimus, voluptas neque facilis error magni atque beatae quasi voluptatem modi ex omnis! Omnis nulla similique deleniti veritatis in libero voluptatibus minus nesciunt ea! Impedit, officia nulla, laborum blanditiis perferendis a praesentium debitis libero ipsam quae inventore hic, eligendi consectetur eaque officiis error excepturi tenetur! Ab voluptatibus quibusdam fugiat quae molestiae, harum minus eos iure, delectus beatae dolorum molestias. Harum, quasi aperiam veritatis, itaque autem voluptates id natus labore placeat obcaecati modi illum quibusdam ratione dolorum molestias pariatur rerum iste.',
        ],
      },
      {
        year: '2012',
        description: [
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga sed eligendi, hic recusandae eos perspiciatis nulla tenetur illum vero rem, ducimus, voluptas neque facilis error magni atque beatae quasi voluptatem modi ex omnis! Omnis nulla similique deleniti veritatis in libero voluptatibus minus nesciunt ea! Impedit, officia nulla, laborum blanditiis perferendis a praesentium debitis libero ipsam quae inventore hic, eligendi consectetur eaque officiis error excepturi tenetur! Ab voluptatibus quibusdam fugiat quae molestiae, harum minus eos iure, delectus beatae dolorum molestias. Harum, quasi aperiam veritatis, itaque autem voluptates id natus labore placeat obcaecati modi illum quibusdam ratione dolorum molestias pariatur rerum iste.',
        ],
      },
    ],
  };
}

export default new HistoryReducer();
