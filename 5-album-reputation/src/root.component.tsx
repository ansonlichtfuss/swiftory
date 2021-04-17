import { AddToJukeboxButton } from '@swiftory/components';
import { preloadImages } from '@swiftory/utils';
import {
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
} from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { BorderedBackground, IMAGE_BACKGROUND_URL } from './BorderedBackground';
import { Hero, IMAGE_HERO_URL } from './Hero';
import { LineLoader } from './LineLoader';
import { IMAGE_LOGO_URL, Logo } from './Logo';

export default function Root(props) {
  const { scrollY } = useViewportScroll();
  const showText1 = useTransform(scrollY, [90, 200], [0, 1]);

  const [isLoading, setIsLoading] = useState(true);
  const [isDoneShowContent, setIsDoneShowContent] = useState(false);
  const loadingPercent = useSpring(0);
  const [preloadedImages, setPreloadedImages] = useState<HTMLImageElement[]>(
    []
  );

  useEffect(() => {
    async function initialLoad() {
      const arr = [IMAGE_HERO_URL, IMAGE_LOGO_URL, IMAGE_BACKGROUND_URL];

      const preloadedArr: HTMLImageElement[] = await preloadImages(
        arr,
        (newPercent) => loadingPercent.set(newPercent)
      );
      setIsDoneShowContent(true);

      // Allow for content to render beneath the loader before showing user
      setTimeout(() => setIsLoading(false), 500);
    }
    if (isLoading) {
      initialLoad();
    }
  }, [isLoading, loadingPercent]);

  return (
    <section className="bg-white">
      <LineLoader
        visible={isLoading || !isDoneShowContent}
        loadingPercent={loadingPercent}
        backgroundColor="#fff"
        loaderColor="#000000"
      />

      {isDoneShowContent && (
        <>
          <Hero />
          <div className="relative" style={{ zIndex: 0 }}>
            <BorderedBackground />
          </div>
          <Logo />
          <div className="fixed top-0 left-0 w-full h-full z-0 flex items-center justify-center">
            <div
              className="max-w-prose w-full"
              style={{ opacity: 0.9, color: 'hsl(318,23%,20%)' }}
            >
              <motion.div style={{ opacity: showText1 }}>
                <p className="text-xl mb-3">
                  <em>Reputation</em> came to light during a particularly
                  controversial time in Taylor Swift's life, speaking of gossip
                  and love in a turbulent world.
                </p>
                <p className="text-xl mb-3">
                  The album features a limited set of producers and writers who
                  contributed to the previous album, <em>1989</em>, including{' '}
                  <AddToJukeboxButton albumKey="jack_antonoff_chemtrails_over_the_country_club">
                    <span className="font-black underline test">
                      Jack Antonoff
                    </span>
                  </AddToJukeboxButton>{' '}
                  and Swedish producers{' '}
                  <AddToJukeboxButton albumKey="shellback_25">
                    <span className="font-black underline test">Shellback</span>
                  </AddToJukeboxButton>{' '}
                  and{' '}
                  <AddToJukeboxButton albumKey="max_martin_after_hours">
                    <span className="font-black underline test">
                      Max Martin
                    </span>
                  </AddToJukeboxButton>
                  .
                </p>
                <p className="text-xl mb-3">
                  The accompanying Reputation Stadium Tour became the
                  highest-grossing North American tour in history.
                </p>
                <p className="text-xl mb-3">
                  Spending more than three weeks at the top of{' '}
                  <em>Billboard</em> 200, <em>Reputation</em> made Taylor the
                  first artist in history with four albums selling more than a
                  million copies in their first week of release.
                </p>
              </motion.div>
            </div>
          </div>
          <div style={{ width: '100%', height: 'calc(100vh + 200px)' }}></div>
        </>
      )}
    </section>
  );
}
