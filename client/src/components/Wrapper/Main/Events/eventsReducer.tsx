import { makeAutoObservable } from 'mobx';

import { eventsType } from './eventsType';

class EventsReducer {
  constructor() {
    makeAutoObservable(this);
  }

  state: eventsType = {
    events: [
      {
        event: 'Camping',
        eventName: 'Лагерь',
        yearsEvent: [
          {
            year: '2010',
            description: [
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quisquam libero nam ipsa rem odio ad illum sint adipisci, facilis odit reprehenderit praesentium, necessitatibus consequatur quae assumenda perferendis tempora nisi nesciunt doloribus velit excepturi exercitationem nobis? Ipsum, asperiores! Commodi nostrum ullam natus repellat mollitia voluptates modi eveniet maxime iusto repellendus minus quos qui nesciunt provident corporis quidem deserunt aliquam, quam vero sapiente porro. Architecto magni ea iusto itaque maxime totam tempora quos. Aliquid dignissimos officiis exercitationem! Ea quos aspernatur perferendis sit repudiandae consectetur quam est, ab necessitatibus architecto quis illo id accusantium vero, veritatis sed, nulla excepturi! Sit nihil unde aut, rerum doloribus minima! Corporis odio recusandae voluptas nisi ipsa culpa dolor molestiae quae excepturi porro dolore amet dignissimos magnam cupiditate aliquam dolorem quidem facilis commodi accusantium quo, delectus est modi at corrupti. Est, quasi architecto? Perspiciatis alias ipsa aut sunt accusantium, vitae similique corrupti repellendus illo odit neque! Doloribus, quas unde modi excepturi nemo consequatur. Debitis eaque repudiandae odio consequatur atque fugit aliquid ut officiis iste, voluptatum at nihil velit quisquam exercitationem ullam. Quis assumenda maxime deleniti? Dicta, aliquam explicabo laudantium fuga praesentium accusantium illo earum adipisci quaerat id, magnam dolore excepturi, voluptatum officia tempora asperiores ipsum deserunt corrupti.',
            ],
            images: ['1.png', '2.png', '3.png'],
            videos: [
              {
                name: 'Фадеев - танцы на стеклах',
                url: 'pYcTNDwHhEg',
              },
            ],
          },
          {
            year: '2011',
            description: [
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis incidunt ipsa fuga unde excepturi! Rerum quaerat ad sit veritatis exercitationem repellat culpa quisquam cumque distinctio molestias maiores commodi error rem beatae repellendus, minima aspernatur harum iusto et, amet, necessitatibus est sint! A non, amet at impedit aut enim temporibus perspiciatis quisquam fugiat necessitatibus, ex maxime in inventore sapiente. Maiores debitis nostrum, quos adipisci ipsam in modi dolorem quasi sunt laborum, atque, iusto libero id? Animi illum unde inventore asperiores adipisci voluptas fugiat similique non at et. Excepturi repellendus ad nam at repudiandae? Nemo animi repellat unde, necessitatibus recusandae sint libero molestiae eum voluptate placeat quibusdam blanditiis maiores facilis eaque soluta explicabo? Velit tempore accusamus error explicabo veniam! A corrupti quis architecto accusantium consequuntur laborum quaerat placeat, assumenda molestias labore impedit quibusdam asperiores earum eveniet quas quisquam. Voluptatibus explicabo obcaecati voluptas, sed architecto repellat, consequatur, cupiditate quis cumque odio debitis. Fugiat doloribus quisquam qui autem quos, vitae nemo perspiciatis minima dicta labore impedit. Qui amet similique totam dolorum libero vero fuga repellendus commodi itaque molestias a reprehenderit earum officiis error dolore rem animi omnis accusantium magnam sed quos, delectus in molestiae voluptas. Deserunt quibusdam id veniam beatae. Suscipit nulla, quo at iure officia reprehenderit? Praesentium magni, ad fugiat quam pariatur eius consequatur molestias dolores modi facilis ut impedit, voluptatem explicabo ipsum optio iusto quibusdam quasi. Recusandae dicta sint unde totam, neque deleniti quas blanditiis minima, quae veniam animi quo similique natus earum consequatur assumenda nobis cum sit voluptatem illo iste eius reiciendis. Eaque a est dolore sequi ipsa necessitatibus blanditiis inventore, ad, assumenda repudiandae magnam maxime officiis quasi laudantium dignissimos minima cupiditate minus quis explicabo cumque accusamus quae, dicta rem! Repellat ad nemo ratione sit mollitia. Fugit ex, nulla officia aliquam quia qui dolorem doloribus nam atque veniam optio tenetur nihil itaque deleniti cum suscipit minus mollitia, labore error voluptate aperiam? Quo omnis ipsam laborum unde dignissimos. Necessitatibus atque culpa a eum! Pariatur fugiat quas, harum nemo totam iusto. Aut aliquam optio quidem atque neque, quibusdam quo distinctio perferendis quasi reprehenderit quaerat quae ad saepe. Veniam laborum ipsam quae aperiam ex mollitia autem, voluptas sunt nulla quisquam in, id exercitationem. Reprehenderit aliquam ex incidunt. Repudiandae voluptate sapiente debitis odio labore, quia, molestiae odit assumenda ipsum similique incidunt vel reprehenderit, pariatur minima earum illo? Dolorem quam dolore nostrum ab hic est numquam eos aliquam ipsam? In, molestias! Enim corporis ullam dolore ea, dolorum et explicabo ut quae possimus in deserunt autem quaerat, temporibus, ex tenetur aliquid incidunt! Deserunt quisquam ipsa perferendis error sit pariatur illo nam quo facilis maxime unde aliquam molestias laboriosam nobis impedit beatae natus, eaque vel consectetur ea necessitatibus, rerum corporis? Alias, repudiandae similique. Officiis veritatis maxime necessitatibus omnis eos hic eum! Quam repellat maiores in libero quis cumque architecto. Possimus totam quaerat enim, cupiditate voluptatibus velit animi excepturi quasi architecto officiis, id recusandae mollitia magnam laborum adipisci fugit, esse quos? Corrupti excepturi ipsam, maiores aliquid voluptatem eaque minus sit recusandae modi quae soluta accusamus laboriosam! Sapiente, eaque ratione.',
            ],
          },
        ],
      },
      {
        event: 'Ball',
        eventName: 'Бал',
        yearsEvent: [
          {
            year: '2010',
            description: ['Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet, quas.'],
          },
        ],
      },
      {
        event: 'Hike',
        eventName: 'Поход',
        yearsEvent: [
          {
            year: '2010',
            description: ['Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet, quas.'],
          },
        ],
      },
    ],
    imagesUrl: process.env.PUBLIC_URL + '/Images/Wrapper/Main/Events/',
  };
}

export default new EventsReducer();
