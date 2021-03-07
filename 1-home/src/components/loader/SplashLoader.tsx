import { m } from 'framer-motion';
import React from 'react';
import { LetterO } from '../../svg/swiftory/LetterO';
import { LetterBox } from './LetterBox';

export const SplashLoader = () => {
  return (
    <m.div
      key="splashLoader"
      className="fixed bg-black top-0 left-0 w-full h-full flex items-center justify-center z-50"
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{ duration: 0.3 }}
    >
      <LetterBox hideShadow>
        <LetterO />
      </LetterBox>
    </m.div>
  );
};
