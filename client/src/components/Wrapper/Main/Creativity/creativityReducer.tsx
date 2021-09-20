import { makeAutoObservable } from 'mobx';

import { creativityType } from './creativityType';

class CreativityReducer {
  constructor() {
    makeAutoObservable(this);
  }

  state: creativityType = {
    creations: [
      {
        creation: 'Poems',
        creationName: 'Стихи',
        creationItems: [
          {
            name: 'О весне',
            description: [
              'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt neque officiis, veniam odio inventore laborum. Atque harum molestias corporis, cum consequuntur ducimus. Et mollitia quos soluta ab veniam voluptates autem voluptate sint. Nihil quaerat assumenda laboriosam nobis perferendis fugit labore consequatur iusto doloribus excepturi, officia quas unde dolorem tempora soluta?',
            ],
          },
          {
            name: 'О лесе',
            description: [
              'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt neque officiis, veniam odio inventore laborum. Atque harum molestias corporis, cum consequuntur ducimus. Et mollitia quos soluta ab veniam voluptates autem voluptate sint. Nihil quaerat assumenda laboriosam nobis perferendis fugit labore consequatur iusto doloribus excepturi, officia quas unde dolorem tempora soluta?',
            ],
          },
          {
            name: 'О доме',
            description: [
              'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt neque officiis, veniam odio inventore laborum. Atque harum molestias corporis, cum consequuntur ducimus. Et mollitia quos soluta ab veniam voluptates autem voluptate sint. Nihil quaerat assumenda laboriosam nobis perferendis fugit labore consequatur iusto doloribus excepturi, officia quas unde dolorem tempora soluta?',
            ],
          },
        ],
      },
    ],
    imagesUrl: process.env.PUBLIC_URL + '/Images/Wrapper/Main/Creativity/',
  };
}

export default new CreativityReducer();
