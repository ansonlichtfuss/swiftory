import { Github } from '@icons-pack/react-simple-icons';
import React from 'react';
import { AnsonLichtfussLogo } from '../../svg/AnsonLichtfussLogo';
import { HeadingHero } from './HeadingHero';
import { HeadingSubtext } from './HeadingSubtext';

export const HeadingWrapper = () => {
  return (
    <div className="flex items-center justify-between heading-section mb-2 w-full max-w-5xl px-2 2xl:mt-6">
      <div className="flex flex-col justify-center items-start py-10">
        <HeadingSubtext>A visual history</HeadingSubtext>
        <HeadingHero />
        <HeadingSubtext>of Taylor Swift</HeadingSubtext>
      </div>

      <div className="flex items-center">
        <a
          className="flex justify-center rounded-l bg-white pl-3 pr-2 py-2 flex items-center text-black opacity-50 hover:opacity-100 active:opacity-80 transition-opacity box-content"
          href="https://github.com/ansonlichtfuss/swiftory"
          target="_blank"
          rel="noreferrer"
          style={{ width: '28px', height: '24px' }}
        >
          <Github />
        </a>
        <a
          className="flex justify-center rounded-r bg-white pl-2 pr-3 py-2 flex items-center text-black opacity-50 hover:opacity-100 active:opacity-80 transition-opacity box-content"
          href="https://www.ansonlichtfuss.com"
          target="_blank"
          rel="noreferrer"
          style={{ width: '28px', height: '24px' }}
        >
          <AnsonLichtfussLogo fill="#000" style={{ width: '28px' }} />
        </a>
      </div>
    </div>
  );
};
