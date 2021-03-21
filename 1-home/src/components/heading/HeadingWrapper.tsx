import React from 'react';
import { AnsonLichtfussLogo } from '../../svg/AnsonLichtfussLogo';
import { HeadingHero } from './HeadingHero';
import { HeadingSubtext } from './HeadingSubtext';

export const HeadingWrapper = () => {
  return (
    <div className="flex items-center justify-between heading-section mb-8">
      <div className="flex flex-col justify-center items-start p-10">
        <HeadingSubtext>A visual history</HeadingSubtext>
        <HeadingHero />
        <HeadingSubtext>of Taylor Swift</HeadingSubtext>
      </div>

      <a
        href="https://www.ansonlichtfuss.com"
        className="heading-author-link rounded-l bg-white pl-4 pr-6 py-2 flex flex-col items-center transition-transform"
      >
        <AnsonLichtfussLogo fill="#000" />
      </a>
      <style>{`
        .heading-author-link {
          transform: translateX(10px);
        }
        .heading-author-link:hover {
          transform: translateX(0px);
        }
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
