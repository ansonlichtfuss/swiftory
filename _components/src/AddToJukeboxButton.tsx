import { jukeboxEvents } from '@swiftory/utils';
import React from 'react';

export const AddToJukeboxButton = ({ albumKey, children }) => {
  return (
    <button
      onClick={() =>
        jukeboxEvents.dispatch('swiftory:found_album', {
          albumKey
        })
      }
    >
      {children}
    </button>
  );
};
