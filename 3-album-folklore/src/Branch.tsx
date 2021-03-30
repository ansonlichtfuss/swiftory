import { motion, useTransform, useViewportScroll } from 'framer-motion';
import { InputRange } from 'framer-motion/types/value/use-transform';
import React from 'react';

/**
 * Prop Types
 */
type Props = {
  src: string;
  align: string;
  xRange: InputRange;
  scaleRange: InputRange;
  blurRange: string[];
};

/**
 * Component
 */
export const Branch = ({
  src,
  align,
  xRange,
  scaleRange,
  blurRange,
}: Props): JSX.Element => {
  const { scrollY } = useViewportScroll();
  const x = useTransform(scrollY, [0, 200], xRange);
  const scale = useTransform(scrollY, [0, 200], scaleRange);
  const filter = useTransform(
    scrollY,
    [0, 200],
    [`blur(${blurRange[0]})`, `blur(${blurRange[1]})`]
  );

  return (
    <motion.div
      style={{ x, scale }}
      className={`flex items-center fixed top-0 ${align} origin-center`}
    >
      <motion.img
        src={src}
        style={{ filter, height: '100vh' }}
        alt="Reputation"
      />
    </motion.div>
  );
};
