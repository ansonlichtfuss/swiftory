import {
  AnimatePresence,
  motion,
  useTransform,
  useViewportScroll,
} from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

export default function Root(props) {
  const canvasRef = useRef<HTMLCanvasElement>();
  const { scrollYProgress, scrollY } = useViewportScroll();
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.4]);
  const heroScale = useTransform(scrollY, [0, 100], [1, 0.3]);
  const borderWidth = useTransform(scrollY, [0, 100], [0, 5]);
  const showText1 = useTransform(scrollY, [90, 100], [0, 1]);
  const [isLoading, setIsLoading] = useState(true);
  const [preloadedImages, setPreloadedImages] = useState([]);

  const doLoadIn: (
    arrayOfImgSrc: string[]
  ) => Promise<HTMLImageElement[]> = async (arrayOfImgSrc) => {
    const arr = await Promise.all<HTMLImageElement>(
      arrayOfImgSrc.map(
        (imgSrc) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = imgSrc;
            img.onload = () => resolve(img);
          })
      )
    );
    setIsLoading(false);
    setPreloadedImages(arr);
    return arr;
  };

  // const preloadedImages = useMemo(async () => {
  //   const arr = [];
  //   for (let i = 1; i <= 191; i++) {
  //     arr.push(
  //       `https://cdn.ansonlichtfuss.com/file/public-cdn/projects/swiftory/album-lover/bluesky/${(
  //         i * 2
  //       )
  //         .toString()
  //         .padStart(4, '0')}.jpg`
  //     );
  //   }

  //   return await doLoadIn(arr);
  // }, []);

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
      ); // destination rectangle
    }

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
  }, [isLoading, preloadedImages]);

  useEffect(() => {
    if (preloadedImages.length > 0) {
      scrollYProgress.onChange((latest) => {
        const newIndex = Math.round(latest * 191);
        if (canvasRef?.current && newIndex > 0 && newIndex % 2 === 0) {
          const context = canvasRef?.current?.getContext('2d');
          const img = preloadedImages[newIndex];
          // context.drawImage(img, 0, 0, 100, (100 * img.height) / img.width);
          context.drawImage(
            img,
            0,
            0,
            canvasRef?.current?.width,
            canvasRef?.current?.height
          ); // destination rectangle
        }
      });
    }
  }, [preloadedImages, scrollYProgress]);

  return (
    <section>
      LOVER
      <AnimatePresence>
        {isLoading && false && (
          <motion.div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#3E2737',
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            LOADING MOTHAFUCKA
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative" style={{ zIndex: -1 }}>
        <div
          className="fixed top-0 left-0 w-full h-full z-0"
          style={{
            background:
              'linear-gradient(90deg,#ffccfa 0%, #fca9c3 90%,#fceab5 99%,#fceab5 100%)',
          }}
        >
          <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-screen h-screen z-0 object-cover"
            style={{ mixBlendMode: 'darken' }}
          />
        </div>
        <div
          className="fixed top-0 left-0 w-full h-full z-0"
          style={{
            opacity: 0.8,
            background:
              'url(https://cdn.ansonlichtfuss.com/file/public-cdn/projects/swiftory/album-lover/lover-background-image.jpg) center center no-repeat',
            backgroundSize: 'cover',
          }}
        ></div>
        <div
          className="fixed top-0 left-0 w-screen h-screen p-8"
          style={{
            mixBlendMode: 'soft-light',
          }}
        >
          <motion.div
            className="h-full"
            style={{
              borderStyle: 'solid',
              borderColor: 'black',
              borderWidth,
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
        <div className="max-w-prose w-full text-black">
          <motion.div style={{ opacity: showText1 }}>
            <p className="text-xl">
              Ut a consectetur arcu, sit amet viverra est. Nulla sed orci in
              lorem tincidunt pellentesque. Nam et velit dapibus, suscipit lorem
              nec, convallis dolor. In enim velit, ornare sed vehicula nec,
              congue id quam. Integer consequat scelerisque faucibus. Proin nec
              tincidunt neque, sit amet consequat diam. Praesent eu felis id
              neque pharetra bibendum sed sed velit. Aliquam consectetur
              malesuada elit, sit amet condimentum felis. Sed lacinia iaculis
              aliquam. Nunc tristique metus ipsum, ac fermentum orci laoreet et.
              Mauris non quam sollicitudin, ullamcorper ipsum a, finibus nunc.
              Etiam nec faucibus ipsum. Etiam egestas iaculis est, ut dignissim
              enim porttitor ut.
            </p>
          </motion.div>
        </div>
      </div>
      <div style={{ width: '100%', height: '500vh' }}>hi</div>
    </section>
  );
}

// filter: 'grayscale(100%)',
