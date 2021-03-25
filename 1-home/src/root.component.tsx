import { AddToJukeboxButton } from '@swiftory/components';
import { preloadImages } from '@swiftory/utils';
import {
  AnimateLayoutFeature,
  AnimatePresence,
  AnimationFeature,
  ExitFeature,
  MotionConfig,
} from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { navigateToUrl } from 'single-spa';
import { Carousel } from './components/carousel/Carousel';
import { HeadingWrapper } from './components/heading/HeadingWrapper';
import { SplashLoader } from './components/loader/SplashLoader';
import { ALL_IMAGES } from './images';
import { AnsonLichtfussLogo } from './svg/AnsonLichtfussLogo';

export function App({ children }) {
  return { children };
}
export default function Root() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    async function initialLoad() {
      await preloadImages(ALL_IMAGES);

      // Allow for content to render beneath the loader before showing user
      setTimeout(() => setShowLoader(false), 500);
    }
    if (showLoader) {
      initialLoad();
    }
  }, [showLoader]);

  return (
    <MotionConfig
      features={[AnimationFeature, ExitFeature, AnimateLayoutFeature]}
    >
      <div
        className="relative top-0 left-0 z-50"
        style={{ background: '#000', minWidth: '100vw' }}
      >
        <AnimatePresence>{showLoader && <SplashLoader />}</AnimatePresence>
        <HeadingWrapper />
        <Carousel />
        <p className="mt-2 text-sm text-center opacity-50">
          Select an album to explore.
          <br />
          Click on artists to add their work to your jukebox.
        </p>
        <div className="my-12"></div>
      </div>
      <section className="flex items-center justify-center">
        <a
          href="https://www.ansonlichtfuss.com"
          className="author-card rounded border border-gray-800 px-8 py-5 flex flex-col items-center transition-colors hover:bg-gray-900"
        >
          <AnsonLichtfussLogo />
          <span className="pt-2">
            A project by&nbsp;
            <strong className="font-bold">Anson Lichtfuss</strong>.
          </span>
        </a>
        <style>{`
        .author-card svg {
          height: 48px;
        }
      `}</style>
      </section>
      <section>
        <ul>
          <li>
            <a href="album/folklore" onClick={navigateToUrl}>
              go to album 1
            </a>
          </li>
        </ul>
        <AddToJukeboxButton />
      </section>
    </MotionConfig>
  );
}
