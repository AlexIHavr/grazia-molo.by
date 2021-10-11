import React from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';

import eventsReducer from './eventsReducer';
import mainReducer from '../mainReducer';

const EventsContent: React.FC = () => {
  const state = eventsReducer.state;

  const { year, event } = useParams<{ year: string; event: string }>();

  const getContentEvents = () => {
    const yearEvent = state.events
      .find((e) => e.year === year)
      .yearsEvent.find((yearEvent) => yearEvent.event === event);

    return mainReducer.getSimpleContent([yearEvent], 'event', state.imagesUrl + year + '/');
  };

  const getContentYears = () => {
    return (
      <>
        {event !== undefined ? (
          getContentEvents()
        ) : (
          <div>
            <div className="Description">
              {state.events.find((e) => e.year === year).yearDiscription}
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {year !== undefined ? (
        getContentYears()
      ) : (
        <div className="Description">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. A dolores, aliquid non,
          doloremque earum voluptatibus vitae modi incidunt laborum explicabo illum odit nihil quod
          placeat eligendi magni? Quibusdam ipsam obcaecati, quas nostrum quam a illo doloremque
          quasi reiciendis expedita laudantium harum doloribus recusandae maxime earum qui eaque,
          dolore, labore perspiciatis porro! Tempora quos vel delectus labore. Similique eos
          obcaecati unde vero omnis saepe recusandae laudantium! Iste molestias reiciendis quis vero
          laboriosam iusto dolore voluptatum dolor sapiente earum, delectus in, deserunt quidem
          exercitationem, fugit non voluptates perferendis sint at est et! Explicabo repudiandae
          commodi dolores in ab non quae delectus hic!
        </div>
      )}
    </>
  );
};

export default observer(EventsContent);
