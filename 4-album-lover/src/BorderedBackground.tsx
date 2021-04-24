import { useSpringScroll } from '@swiftory/components';
import { CDN_URL } from '@swiftory/utils';
import { motion, useTransform } from 'framer-motion';
import React from 'react';

export const IMAGE_BACKGROUND_URL = `${CDN_URL}/album-lover/lover-background-image.jpg`;

/**
 * Component
 */
export const BorderedBackground = (): JSX.Element => {
  const { scrollY } = useSpringScroll();

  const boxShadowWidth = useTransform(
    scrollY,
    [0, 600],
    ['0 0 0 0px #fff inset', '0 0 0 1px #fff inset']
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
