import React from 'react';
import { AnsonLichtfussLogo } from '../../svg/AnsonLichtfussLogo';
import { HeadingHero } from './HeadingHero';
import { HeadingSubtext } from './HeadingSubtext';

export const HeadingWrapper = () => {
  return (
    <div className="flex items-center justify-between heading-section mb-2 w-full max-w-4xl px-2">
      <div className="flex flex-col justify-center items-start py-10">
        <HeadingSubtext>A visual history</HeadingSubtext>
        <HeadingHero />
        <HeadingSubtext>of Taylor Swift</HeadingSubtext>
      </div>

      <a
        href="https://www.ansonlichtfuss.com"
        className="heading-author-link rounded bg-white px-4 py-2 flex flex-col items-center transition-transform"
      >
        <AnsonLichtfussLogo fill="#000" />
      </a>
      <style>{`
        .heading-author-link svg {
          height: 32px;
          opacity: 1;
        }
        .heading-author-link:hover svg {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};
