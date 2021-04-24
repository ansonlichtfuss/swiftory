import { useSpringScroll } from '@swiftory/components';
import { CDN_URL } from '@swiftory/utils';
import { motion, useTransform } from 'framer-motion';
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
  const { scrollY } = useSpringScroll();
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.3]);

  return (
    <motion.div
      style={{ scale: heroScale }}
      className="flex items-center justify-center fixed bottom-0 w-full origin-bottom"
    >
      <img
        src={IMAGE_HERO_URL}
        style={{ height: '70vh', marginLeft: '15vh' }}
        alt="Taylor Swift Lover Album Cover"
      />
    </motion.div>
  );
};
