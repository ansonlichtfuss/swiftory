import { CDN_URL } from '@swiftory/utils';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import React from 'react';

export const IMAGE_BACKGROUND_URL = `${CDN_URL}/album-reputation/reputation-background.png`;

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
    ['0 0 0 0px #000 inset', '0 0 0 1px #000 inset']
  );
  const bgOpacity = useTransform(scrollY, [0, 200], [1, 0.1]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-full h-full"
        style={{
          opacity: bgOpacity,
          background: `url(${IMAGE_BACKGROUND_URL}) center center no-repeat`,
          backgroundSize: 'cover',
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
          opacity: 0.2,
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
