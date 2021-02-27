import React from 'react';

export default function Root(props) {
  return (
    <section>
      {props.name} is mounted! folklore
      <a href="/">go home</a>
    </section>
  );
}
