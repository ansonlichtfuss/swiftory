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
      <div className="relative" style={{ background: '#000' }}>
        <SplashLoader />
        <div
          className="flex items-center flex-col"
          style={{ minHeight: 'calc(100vh - 100px)', overflowX: 'hidden' }}
        >
          <HeadingWrapper />
          <section className="flex-grow flex flex-col justify-center">
            <Carousel />
            <p className="mt-2 text-sm text-center opacity-50">
              Select an album to explore.
              <br />
              Click on artists to add their work to your jukebox.
            </p>
          </section>
        </div>
        <div className="my-12"></div>
      </div>
    </MotionConfig>
  );
}
