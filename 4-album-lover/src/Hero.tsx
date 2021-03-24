import { CDN_URL } from '@swiftory/utils';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import React from 'react';

export const IMAGE_HERO_URL = `${CDN_URL}/album-lover/lover-hero.png`;

/**
 * Prop Types
 */
type Props = {};

/**
 * Component
 */
export const Hero = (): JSX.Element => {
  const { scrollY } = useViewportScroll();
  const heroScale = useTransform(scrollY, [0, 200], [1, 0.3]);

  return (
    <motion.div
      style={{ scale: heroScale }}
      className="flex items-center justify-center fixed bottom-0 w-full origin-bottom"
    >
      <img
        className="ml-20"
        src={IMAGE_HERO_URL}
        style={{ height: '450px' }}
        alt="Taylor Swift Lover Album Cover"
      />
    </motion.div>
  );
};
