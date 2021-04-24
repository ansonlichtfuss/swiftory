import { useSpringScroll } from '@swiftory/components';
import { CDN_URL } from '@swiftory/utils';
import { motion, useTransform } from 'framer-motion';
import React from 'react';

export const IMAGE_LOGO_URL = `${CDN_URL}/album-lover/lover-logo.png`;

/**
 * Prop Types
 */
type Props = {};

/**
 * Component
 */
export const Logo = (): JSX.Element => {
  const { scrollY } = useSpringScroll();
  const logoScale = useTransform(scrollY, [0, 600], [1, 0.4]);
  const logoY = useTransform(scrollY, [0, 600], [50, 0]);

  return (
    <motion.div
      style={{ scale: logoScale, y: logoY }}
      className="flex items-center justify-center fixed top-0 w-full origin-top mt-10"
    >
      <img src={IMAGE_LOGO_URL} style={{ height: '130px' }} alt="Lover" />
    </motion.div>
  );
};
