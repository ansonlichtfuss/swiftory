import { CDN_URL } from '@swiftory/utils';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
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
  const { scrollY } = useViewportScroll();
  const logoScale = useTransform(scrollY, [0, 200], [1, 0.4]);

  return (
    <motion.div
      style={{ scale: logoScale }}
      className="flex items-center fixed top-0 w-full origin-top-left mt-24 ml-12"
    >
      <img src={IMAGE_LOGO_URL} style={{ height: '80px' }} alt="Reputation" />
    </motion.div>
  );
};
