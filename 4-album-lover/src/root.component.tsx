import { AddToJukeboxButton, useSpringScroll } from '@swiftory/components';
import { CDN_URL, preloadImages } from '@swiftory/utils';
import { motion, useSpring, useTransform } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { BorderedBackground, IMAGE_BACKGROUND_URL } from './BorderedBackground';
import { CloudCanvas } from './CloudCanvas';
import { Hero, IMAGE_HERO_URL } from './Hero';
import { LineLoader } from './LineLoader';
import { IMAGE_LOGO_URL, Logo } from './Logo';

export default function Root(props) {
  const { scrollY } = useSpringScroll();
  const showText1 = useTransform(scrollY, [90, 600], [0, 1]);

  const [isLoading, setIsLoading] = useState(true);
  const [isDoneShowContent, setIsDoneShowContent] = useState(false);
  const loadingPercent = useSpring(0);
  const [preloadedImages, setPreloadedImages] = useState<HTMLImageElement[]>(
    []
  );

  useEffect(() => {
    async function initialLoad() {
      const arr = [IMAGE_HERO_URL, IMAGE_LOGO_URL, IMAGE_BACKGROUND_URL];
      for (let i = 1; i <= 191; i++) {
        arr.push(
          `${CDN_URL}/album-lover/bluesky/${(i * 2)
            .toString()
            .padStart(4, '0')}.jpg`
        );
      }

      const preloadedArr: HTMLImageElement[] = await preloadImages(
        arr,
        (newPercent) => loadingPercent.set(newPercent)
      );
      setPreloadedImages(preloadedArr.slice(3));
      setIsDoneShowContent(true);

      // Allow for content to render beneath the loader before showing user
      setTimeout(() => setIsLoading(false), 500);
    }
    if (isLoading) {
      initialLoad();
    }
  }, [isLoading, loadingPercent]);

  return (
    <section>
      <LineLoader
        visible={isLoading || !isDoneShowContent}
        loadingPercent={loadingPercent}
        backgroundColor="hsl(318,23%,20%)"
        loaderColor="#ffffff"
      />

      {isDoneShowContent && (
        <>
          <div className="relative" style={{ zIndex: -1 }}>
            <CloudCanvas preloadedImages={preloadedImages} />
            <BorderedBackground />
          </div>
          <Logo />
          <Hero />
          <div className="fixed top-0 left-0 w-full h-full z-0 flex items-center justify-center">
            <div
              className="max-w-prose w-full"
              style={{ opacity: 0.9, color: 'hsl(318,23%,20%)' }}
            >
              <motion.div style={{ opacity: showText1 }}>
                <p className="text-xl mb-3">
                  Taylor Swift's seventh album, <em>Lover</em>, pursues a
                  lighter tone from its predecessor. Producers such as{' '}
                  <AddToJukeboxButton albumKey="jack_antonoff_melodrama">
                    <span className="font-black underline test">
                      Jack Antonoff
                    </span>
                  </AddToJukeboxButton>
                  ,{' '}
                  <AddToJukeboxButton albumKey="louis_bell_calm">
                    <span className="font-black underline test">
                      Louis Bell
                    </span>
                  </AddToJukeboxButton>
                  ,{' '}
                  <AddToJukeboxButton albumKey="frank_dukes_calm">
                    <span className="font-black underline test">
                      Frank Dukes
                    </span>
                  </AddToJukeboxButton>
                  , and{' '}
                  <AddToJukeboxButton albumKey="joel_little_busyhead">
                    <span className="font-black underline test">
                      Joel Little
                    </span>
                  </AddToJukeboxButton>{' '}
                  helped with the project.
                </p>
                <p className="text-xl mb-3">
                  With over 450,000 copies sold on its first day, it later
                  became the world's best selling album by a female artist.
                </p>
                <p className="text-xl mb-3">
                  Winning every American Music Award (AMA) it was nominated for,
                  Swift took her place as the most awarded artist in the AMAs
                  history.
                </p>
                <p className="text-xl">
                  The ensuing tour, Lover Fest, was cancelled due to a worldwide
                  pandemic.
                </p>
              </motion.div>
            </div>
          </div>
          <div style={{ width: '100%', height: '200vh' }}></div>
        </>
      )}
    </section>
  );
}
