import { CDN_URL } from '@swiftory/utils';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import React from 'react';

export const IMAGE_BACKGROUND_URL = `${CDN_URL}/album-lover/lover-background-image.jpg`;

/**
 * Prop Types
 */
type Props = {};

/**
 * Component
 */
export const BorderedBackground = (): JSX.Element => {
  const { scrollY } = useViewportScroll();
  const boxShadowWidth = useTransform(
    scrollY,
    [0, 200],
    ['0 0 0 0px #fff inset', '0 0 0 2px #fff inset']
  );

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full z-0"
        style={{
          opacity: 0.9,
          background: `url(${IMAGE_BACKGROUND_URL}) center center no-repeat`,
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
          opacity: 0.4,
        }}
      >
        <motion.div
          style={{
            height: '100%',
            boxShadow: boxShadowWidth,
          }}
        ></motion.div>
      </div>
    </>
  );
};
