import {
  AnimatePresence,
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
} from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export default function Root(props) {
  const canvasRef = useRef<HTMLCanvasElement>();
  const { scrollYProgress, scrollY } = useViewportScroll();
  const logoScale = useTransform(scrollY, [0, 200], [1, 0.4]);
  const heroScale = useTransform(scrollY, [0, 200], [1, 0.3]);
  const boxShadowWidth = useTransform(
    scrollY,
    [0, 200],
    ['0 0 0 0px hsl(318,23%,20%) inset', '0 0 0 2px hsl(318,23%,20%) inset']
  );
  const showText1 = useTransform(scrollY, [90, 200], [0, 1]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDoneShowContent, setIsDoneShowContent] = useState(false);
  const loadingPercent = useSpring(0);

  const [preloadedImages, setPreloadedImages] = useState([]);

  const doLoadIn: (
    arrayOfImgSrc: string[]
  ) => Promise<HTMLImageElement[]> = useCallback(
    async (arrayOfImgSrc) => {
      const totalLength = arrayOfImgSrc.length;
      let loadingCount = 0;
      let prevPercent = 0;
      const arr = await Promise.all<HTMLImageElement>(
        arrayOfImgSrc.map(
          (imgSrc) =>
            new Promise((resolve) => {
              const img = new Image();
              img.src = imgSrc;
              img.onload = () => {
                loadingCount++;
                const newPercent =
                  Math.floor((loadingCount / totalLength) * 100) / 100 || 0;
                if (newPercent - prevPercent > 0.05 || newPercent === 1) {
                  loadingPercent.set(newPercent);
                  prevPercent = newPercent;
                }
                resolve(img);
              };
            })
        )
      );
      setIsDoneShowContent(true);
      setPreloadedImages(arr);
      return arr;
    },
    [loadingPercent]
  );

  useEffect(() => {
    if (isDoneShowContent) {
      setTimeout(() => setIsLoading(false), 1000);
    }
  }, [isDoneShowContent]);

  useEffect(() => {
    if (!isLoading && preloadedImages.length > 0) {
      const context = canvasRef?.current?.getContext('2d');
      context.canvas.width = window.innerWidth;
      context.canvas.height = window.innerHeight;

      const img: HTMLImageElement = preloadedImages[0];
      context.drawImage(
        img,
        0,
        0,
        canvasRef?.current?.width,
        canvasRef?.current?.height
      );
    }
  }, [isLoading, preloadedImages]);

  useEffect(() => {
    async function funk() {
      const arr = [];
      for (let i = 1; i <= 191; i++) {
        arr.push(
          `https://cdn.ansonlichtfuss.com/file/public-cdn/projects/swiftory/album-lover/bluesky/${(
            i * 2
          )
            .toString()
            .padStart(4, '0')}.jpg`
        );
      }

      await doLoadIn(arr);
    }
    if (isLoading) {
      funk();
    }
  }, [doLoadIn, isLoading]);

  useEffect(() => {
    if (preloadedImages.length > 0) {
      scrollYProgress.onChange((latest) => {
        const newIndex = Math.round(latest * 191);
        if (canvasRef?.current && newIndex > 0 && newIndex % 2 === 0) {
          const context = canvasRef?.current?.getContext('2d');
          const img = preloadedImages[newIndex];
          context.drawImage(
            img,
            0,
            0,
            canvasRef?.current?.width,
            canvasRef?.current?.height
          );
        }
      });
    }
  }, [preloadedImages, scrollYProgress]);

  return (
    <section>
      <AnimatePresence>
        {(isLoading || !isDoneShowContent) && (
          <motion.div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'hsl(318,23%,20%)',
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="relative origin-left"
              style={{
                width: '30%',
                height: '1px',
                background: 'rgba(255,255,255,0.2)',
              }}
            >
              <motion.div
                style={{
                  scaleX: loadingPercent,
                  width: '100%',
                  height: '1px',
                  background: '#fff',
                }}
              ></motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {isDoneShowContent && (
        <>
          <div className="relative" style={{ zIndex: -1 }}>
            <canvas
              ref={canvasRef}
              className="fixed top-0 left-0 w-screen h-screen z-0 object-cover"
            />
            <div
              className="fixed top-0 left-0 w-full h-full z-0"
              style={{
                opacity: 0.9,
                background:
                  'url(https://cdn.ansonlichtfuss.com/file/public-cdn/projects/swiftory/album-lover/lover-background-image.jpg) center center no-repeat',
                backgroundSize: 'cover',
              }}
            ></div>
            <div
              className="p-8"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                opacity: 0.1,
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  boxShadow: boxShadowWidth,
                }}
              ></motion.div>
            </div>
          </div>
          <motion.div
            style={{ scale: logoScale }}
            className="flex items-center justify-center fixed top-0 w-full origin-top mt-10"
          >
            <img
              src="https://cdn.ansonlichtfuss.com/file/public-cdn/projects/swiftory/album-lover/lover-logo.png"
              style={{ height: '130px' }}
            />
          </motion.div>
          <motion.div
            style={{ scale: heroScale }}
            className="flex items-center justify-center fixed bottom-0 w-full origin-bottom"
          >
            <img
              className="ml-20"
              src="https://cdn.ansonlichtfuss.com/file/public-cdn/projects/swiftory/album-lover/lover-hero.png"
              style={{ height: '450px' }}
            />
          </motion.div>
          <div className="fixed top-0 left-0 w-full h-full z-0 flex items-center justify-center">
            <div
              className="max-w-prose w-full"
              style={{ opacity: 0.9, color: 'hsl(318,23%,20%)' }}
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
          <div style={{ width: '100%', height: '200vh' }}></div>
        </>
      )}
    </section>
  );
}
