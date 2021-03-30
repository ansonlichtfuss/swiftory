import { AnimatePresence, motion, MotionValue } from 'framer-motion';
import React from 'react';

/**
 * Prop Types
 */
type Props = {
  visible: boolean;
  loadingPercent: MotionValue<number>;
  backgroundColor: string;
  loaderColor: string;
};

/**
 * Component
 */
export const LineLoader = ({
  visible,
  loadingPercent,
  backgroundColor,
  loaderColor,
}: Props): JSX.Element => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor,
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="relative origin-left"
            style={{
              width: '30%',
              height: '1px',
              background: `${loaderColor}20`,
            }}
          >
            <motion.div
              style={{
                scaleX: loadingPercent,
                width: '100%',
                height: '1px',
                background: loaderColor,
              }}
            ></motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
