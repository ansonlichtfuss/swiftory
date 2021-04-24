import { AddToJukeboxButton, useSpringScroll } from '@swiftory/components';
import { CDN_URL, preloadImages } from '@swiftory/utils';
import { motion, useSpring, useTransform } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { BorderedBackground, IMAGE_BACKGROUND_URL } from './BorderedBackground';
import { Branch } from './Branch';
import { IMAGE_HERO_URL } from './Hero';
import { LineLoader } from './LineLoader';

const BRANCH_IDS = [1, 3, 5];
export const getBranchUrl = (id: number) =>
  `${CDN_URL}/album-folklore/branch${id}.png`;

export default function Root() {
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
      const arr = [
        IMAGE_HERO_URL,
        IMAGE_BACKGROUND_URL,
        ...BRANCH_IDS.map((id) => getBranchUrl(id)),
      ];

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
    <section style={{ background: '#000' }}>
      <LineLoader
        visible={isLoading || !isDoneShowContent}
        loadingPercent={loadingPercent}
        backgroundColor="#A7A7A7"
        loaderColor="#000000"
      />

      {isDoneShowContent && (
        <>
          <div className="relative" style={{ zIndex: 0 }}>
            <BorderedBackground />
          </div>
          <Branch
            src={getBranchUrl(1)}
            align="left-0"
            xRange={[-600, 100]}
            scaleRange={[1.2, 1]}
            blurRange={['20px', '0px']}
          />
          <Branch
            src={getBranchUrl(3)}
            align="right-0"
            xRange={[600, 0]}
            scaleRange={[1.2, 1]}
            blurRange={['8px', '1px']}
          />
          <Branch
            src={getBranchUrl(5)}
            align="right-0"
            xRange={[600, -100]}
            scaleRange={[1.2, 1]}
            blurRange={['20px', '0px']}
          />
          <div className="fixed top-0 left-0 w-full h-full z-0 flex items-center justify-center">
            <div
              className="max-w-prose w-full"
              style={{ color: '#fff', textShadow: '0 0 5px #000' }}
            >
              <motion.div style={{ opacity: showText1 }}>
                <p className="text-xl mb-3">
                  <em>Folklore</em>, released as a surprise album on July 24,
                  2020, written as a series of ballads, evoking a distinct
                  romanticism through its unique characters, stories, and an
                  indie folk sound.
                </p>

                <p className="text-xl mb-3">
                  The album's change from Taylor's more traditional
                  autobiographical approach was produced by{' '}
                  <AddToJukeboxButton albumKey="aaron_dessner_sleep_well_beast">
                    <span className="font-black underline test">
                      Aaron Dessner
                    </span>
                  </AddToJukeboxButton>{' '}
                  and{' '}
                  <AddToJukeboxButton albumKey="jack_antonoff_some_nights">
                    <span className="font-black underline test">
                      Jack Antonoff
                    </span>
                  </AddToJukeboxButton>
                  . It featured guest artist Bon Iver, who's founder,{' '}
                  <AddToJukeboxButton albumKey="justin_vernon_22_a_million">
                    <span className="font-black underline test">
                      Justin Vernon
                    </span>
                  </AddToJukeboxButton>{' '}
                  helped write the track "Exile".
                </p>
                <p className="text-xl mb-3">
                  Created during the COVID-19 pandemic, most of the work was
                  done remotely and in strict secrecy. Taylor's label didn't
                  know about the album until hours ahead of its scheduled
                  launch.
                </p>
                <p className="text-xl mb-3">
                  <em>Folklore</em> set a new Guinness World Record for a female
                  act's opening day on Spotify. It quickly became the
                  best-selling album of 2020.
                </p>
                <p className="text-xl">
                  Receiving sweeping critical acclaim, the album made Taylor the
                  first female artist to win the Grammy Award's Album of the
                  Year award three times.
                </p>
              </motion.div>
            </div>
          </div>
          <div style={{ width: '100%', height: 'calc(100vh + 600px)' }}></div>
        </>
      )}
    </section>
  );
}
