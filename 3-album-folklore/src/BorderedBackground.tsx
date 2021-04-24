import { useSpringScroll } from '@swiftory/components';
import { CDN_URL } from '@swiftory/utils';
import { motion, useTransform } from 'framer-motion';
import React from 'react';

export const IMAGE_BACKGROUND_URL = `${CDN_URL}/album-folklore/album-background.jpg`;

/**
 * Component
 */
export const BorderedBackground = (): JSX.Element => {
  const { scrollY } = useSpringScroll();
  const boxShadowWidth = useTransform(
    scrollY,
    [0, 600],
    [
      '0 0 0 1px rgba(255,255,255,0) inset',
      '0 0 0 1px rgba(255,255,255,1) inset',
    ]
  );
  const bgSize = useTransform(scrollY, [0, 600], [1.1, 1]);
  const bgOpacity = useTransform(scrollY, [0, 600], [1, 0.4]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-full h-full z-2"
        style={{
          opacity: bgOpacity,
          background: `url(${IMAGE_BACKGROUND_URL}) center bottom no-repeat`,
          backgroundSize: 'cover',
          scale: bgSize,
        }}
      ></motion.div>
      <div
        className="p-8"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 0.5,
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
