import { jukeboxEvents } from '@swiftory/utils';
import React from 'react';

export const AddToJukeboxButton = () => {
  return (
    <button
      className="bg-green-500 text-white"
      onClick={() => jukeboxEvents.dispatch('swiftory:test', { test: 'fun ' })}
    >
      clikme from Components! Reusable!
    </button>
  );
};
