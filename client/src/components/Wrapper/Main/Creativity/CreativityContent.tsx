import React from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';

import creativityReducer from './creativityReducer';
import mainReducer from '../mainReducer';

const CreativityContent: React.FC = () => {
  const state = creativityReducer.state;

  const { creation } = useParams<{ creation: string }>();

  return (
    <>
      {creation !== undefined ? (
        mainReducer.getSimpleContent(
          state.creations.find((value) => value.creation === creation)
            .creationItems,
          'name'
        )
      ) : (
        <div className="Description">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur
          sequi repellendus sunt rerum ex quisquam veritatis esse ullam
          quibusdam blanditiis amet iste, vel quidem natus ratione perferendis
          modi. Ex molestias perspiciatis laudantium nam vel officia
          reprehenderit aperiam quasi vitae dolores, et, nemo, ullam odio
          ratione modi harum voluptatibus pariatur expedita?
        </div>
      )}
    </>
  );
};

export default observer(CreativityContent);
