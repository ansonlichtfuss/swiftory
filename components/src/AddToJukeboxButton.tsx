import { jukeboxEvents } from '@swiftory/utils';
import React from 'react';

/**
 * Prop Types
 */
type AddToJukeboxButtonProps = {
  albumKey: string;
  children: React.ReactNode;
};

/**
 * Component
 */
export const AddToJukeboxButton = ({
  albumKey,
  children,
}: AddToJukeboxButtonProps): JSX.Element => {
  return (
    <button
      style={{ outline: 'none' }}
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
