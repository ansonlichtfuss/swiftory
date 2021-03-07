import { AddToJukeboxButton } from '@swiftory/components';
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

export function App({ children }) {
  return { children };
}
export default function Root(props) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowLoader(false), 2000);
  }, []);

  return (
    <MotionConfig
      features={[AnimationFeature, ExitFeature, AnimateLayoutFeature]}
    >
      <div
        className="fixed top-0 left-0 z-50"
        style={{ background: '#14060A', minWidth: '100vw', minHeight: '100vh' }}
      >
        <AnimatePresence>{showLoader && <SplashLoader />}</AnimatePresence>
        <HeadingWrapper />
        <Carousel />
      </div>
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
