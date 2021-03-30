import { CDN_URL, preloadImages } from '@swiftory/utils';
import {
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
} from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { BorderedBackground, IMAGE_BACKGROUND_URL } from './BorderedBackground';
import { Branch } from './Branch';
import { IMAGE_HERO_URL } from './Hero';
import { LineLoader } from './LineLoader';

const BRANCH_IDS = [1, 3, 5];
export const getBranchUrl = (id: number) =>
  `${CDN_URL}/album-folklore/branch${id}.png`;

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
            xRange={[-200, 100]}
            scaleRange={[1.2, 1]}
            blurRange={['20px', '0px']}
          />
          <Branch
            src={getBranchUrl(3)}
            align="right-0"
            xRange={[200, 0]}
            scaleRange={[1.2, 1]}
            blurRange={['8px', '1px']}
          />
          <Branch
            src={getBranchUrl(5)}
            align="right-0"
            xRange={[200, -100]}
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
                  Taylor Swift's seventh album, Lover, pursues a lighter tone
                  from its predecessor. Producers such as{' '}
                  <a href="#" className="font-black underline test">
                    Jack Antonoff
                  </a>
                  ,{' '}
                  <a href="#" className="font-black underline test">
                    Louis Bell
                  </a>
                  ,{' '}
                  <a href="#" className="font-black underline test">
                    Frank Dukes
                  </a>
                  , and{' '}
                  <a href="#" className="font-black underline test">
                    Joel Little
                  </a>{' '}
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
          <div style={{ width: '100%', height: 'calc(100vh + 200px)' }}></div>
        </>
      )}
    </section>
  );
}
