import {
  AnimateLayoutFeature,
  AnimationFeature,
  ExitFeature,
  MotionConfig,
} from 'framer-motion';
import React from 'react';
import { Carousel } from './components/carousel/Carousel';
import { HeadingWrapper } from './components/heading/HeadingWrapper';
import { SplashLoader } from './components/loader/SplashLoader';

export function App({ children }) {
  return { children };
}

export default function Root() {
  return (
    <MotionConfig
      features={[AnimationFeature, ExitFeature, AnimateLayoutFeature]}
    >
      <div
        className="relative top-0 left-0 z-50"
        style={{ background: '#000', minWidth: '100vw' }}
      >
        <SplashLoader />
        <div
          className="flex items-center justify-center flex-col"
          style={{ minHeight: '80vh' }}
        >
          <HeadingWrapper />
          <Carousel />
          <p className="mt-2 text-sm text-center opacity-50">
            Select an album to explore.
            <br />
            Click on artists to add their work to your jukebox.
          </p>
        </div>
        <div className="my-12"></div>
      </div>
    </MotionConfig>
  );
}
