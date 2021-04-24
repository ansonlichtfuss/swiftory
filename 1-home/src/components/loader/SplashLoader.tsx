import { preloadImages } from '@swiftory/utils';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { ALL_IMAGES } from '../../images';
import { LetterO } from '../../svg/LetterO';

const HIDE_LOADER_CHECK_KEY = 'swiftory_showLoader';
const getShouldHideLoader = (): boolean =>
  sessionStorage.getItem(HIDE_LOADER_CHECK_KEY) === 'true';
const setShouldHideLoader = (value: 'true' | 'false'): void => {
  sessionStorage.setItem(HIDE_LOADER_CHECK_KEY, value);
};

export const SplashLoader = () => {
  const [showLoader, setShowLoader] = useState(!getShouldHideLoader());

  useEffect(() => {
    async function initialLoad() {
      await preloadImages(ALL_IMAGES);

      // Allow for content to render beneath the loader before showing user
      setTimeout(() => {
        setShowLoader(false);

        // Disable loader for future renders to speed up UX
        setShouldHideLoader('true');
      }, 500);
    }
    if (showLoader) {
      initialLoad();
    }
  }, [showLoader]);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          key="splashLoader"
          className="splashLoader fixed bg-black top-0 left-0 w-screen h-screen flex items-center justify-center z-50"
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <LetterO />

          <style>{`
        .splashLoader svg {
          height: 100px;
        }
      `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
