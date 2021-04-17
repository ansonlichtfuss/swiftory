import { jukeboxEvents } from '@swiftory/utils';
import React from 'react';

type AddToJukeboxButtonProps = {
  albumKey: string;
  children: React.ReactNode;
};

export const AddToJukeboxButton = ({
  albumKey,
  children,
}: AddToJukeboxButtonProps): React.FunctionComponent => {
  return (
    <button
      onClick={() =>
        jukeboxEvents.dispatch('swiftory:found_album', {
          albumKey,
        })
      }
    >
      {children}
    </button>
  );
};
