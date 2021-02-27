import { AddToJukeboxButton } from '@swiftory/components';
import React from 'react';

export default function Root(props) {
  return (
    <section className="text-red-900">
      {props.name} is mounted! ya motherfuckerz
      <ul>
        <li>
          <a href="/album/folklore">go to album 1</a>
        </li>
      </ul>
      {/* <button onClick={() => jukeboxEvents.dispatch('test', { shit: 'up' })}>
        clikme
      </button> */}
      <AddToJukeboxButton />
    </section>
  );
}
