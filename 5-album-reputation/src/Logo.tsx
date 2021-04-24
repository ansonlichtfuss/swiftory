import { useSpringScroll } from '@swiftory/components';
import { CDN_URL } from '@swiftory/utils';
import { motion, useTransform } from 'framer-motion';
import React from 'react';

export const IMAGE_LOGO_URL = `${CDN_URL}/album-reputation/reputation-logo.png`;

/**
 * Prop Types
 */
type Props = {};

/**
 * Component
 */
export const Logo = (): JSX.Element => {
  const { scrollY } = useSpringScroll();
  const logoScale = useTransform(scrollY, [0, 400], [1, 0.4]);
  const logoX = useTransform(scrollY, [0, 400], [-400, 0]);
  const logoY = useTransform(
    scrollY,
    [0, 400],
    [window.innerHeight * 0.125, 50]
  );

  return (
    <motion.div
      style={{ scale: logoScale, x: logoX, y: logoY }}
      className="flex items-center justify-center fixed top-0 left-0 w-full origin-top-center"
    >
      <img src={IMAGE_LOGO_URL} style={{ height: '80px' }} alt="Reputation" />
    </motion.div>
  );
};
