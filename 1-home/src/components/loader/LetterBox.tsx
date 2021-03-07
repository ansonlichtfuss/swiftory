import React from 'react';

const animationVariants = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  hidden: {
    opacity: 0,
    x: 50,
    transition: {
      duration: 0.4,
      ease: 'easeIn',
    },
  },
};

export const LetterBox = ({ children, hideShadow = false }) => {
  return (
    <div className="letter-box relative mx-2 overflow-hidden">
      {!hideShadow && (
        <div
          className="absolute top-0 left-0 w-full h-full z-10"
          style={{
            background:
              'linear-gradient(0.25turn, rgba(0,0,0,0), rgba(0,0,0,1))',
          }}
        ></div>
      )}
      {children}
      <style>{`
        .letter-box svg {
          height: 100px;
        }
      `}</style>
    </div>
  );
};
