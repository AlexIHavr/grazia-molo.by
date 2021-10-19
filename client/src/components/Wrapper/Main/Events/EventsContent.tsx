import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';

import eventsReducer from './eventsReducer';
import mainReducer from '../mainReducer';

const EventsContent: React.FC = () => {
  const state = eventsReducer.state;

  const { year, event } = useParams<{ year: string; event: string }>();

  const getContentEvents = () => {
    const yearEvent = state.events.find((e) => e._id === event);
    if (yearEvent) {
      const simpleEvent = {
        _id: yearEvent._id,
        _idName: yearEvent.section,
        description: yearEvent.description,
        images: yearEvent.photoNames,
        videos: yearEvent.videoNames.map((videoName, i) => ({
          name: videoName,
          url: yearEvent.videoLinks[i],
        })),
      };

      return mainReducer.getSimpleContent(
        [simpleEvent],
        '_id',
        state.imagesUrl + year + '/',
        'noDir'
      );
    }
  };

  useEffect(() => {
    eventsReducer.loadEvents();
  }, []);

  return (
    <>
      {year !== undefined && event !== undefined ? (
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
