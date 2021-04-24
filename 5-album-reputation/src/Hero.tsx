import { useSpringScroll } from '@swiftory/components';
import { CDN_URL } from '@swiftory/utils';
import { motion, useTransform } from 'framer-motion';
import React from 'react';

export const IMAGE_HERO_URL = `${CDN_URL}/album-reputation/reputation-hero.jpg`;

/**
 * Component
 */
export const Hero = (): JSX.Element => {
  const { scrollY } = useSpringScroll();
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <motion.div
      style={{ scale: heroScale }}
      className="flex items-center justify-center fixed bottom-0 w-full origin-bottom"
    >
      <img
        className="-ml-20"
        src={IMAGE_HERO_URL}
        style={{ height: '95vh' }}
        alt="Taylor Swift Reputation Album Cover"
      />
    </motion.div>
  );
};
