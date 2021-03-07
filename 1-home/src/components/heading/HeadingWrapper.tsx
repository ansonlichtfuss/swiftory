import React from 'react';
import { HeadingHero } from './HeadingHero';
import { HeadingSubtext } from './HeadingSubtext';

export const HeadingWrapper = () => {
  return (
    <div className="flex flex-col justify-center items-center p-10">
      <HeadingSubtext>A visual history</HeadingSubtext>
      <HeadingHero />
      <HeadingSubtext>of Taylor Swift</HeadingSubtext>
    </div>
  );
};
