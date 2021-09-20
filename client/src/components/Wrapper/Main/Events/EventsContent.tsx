import React from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';

import eventsReducer from './eventsReducer';
import mainReducer from '../mainReducer';

const EventsContent: React.FC = () => {
  const state = eventsReducer.state;

  const { event, year } = useParams<{ event: string; year: string }>();

  const getContentYears = () => {
    const yearEvent = state.events
      .find((e) => e.event === event)
      .yearsEvent.find((yearEvent) => yearEvent.year === year);

    return mainReducer.getSimpleContent([yearEvent], 'year', state.imagesUrl + event + '/');
  };

  const getContentEvents = () => {
    return (
      <>
        {year !== undefined ? (
          getContentYears()
        ) : (
          <div className="Description">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, maxime quod quos
            iusto laboriosam eius numquam. Adipisci officia a reprehenderit eaque quam. Error
            accusamus quam, rerum odit quia suscipit possimus nihil dolorum numquam quaerat quisquam
            atque. Tempore minima nisi animi quasi aliquam nobis modi quas enim soluta labore. Non,
            perferendis.
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {event !== undefined ? (
        getContentEvents()
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
