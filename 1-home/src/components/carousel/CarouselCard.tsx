import { m } from 'framer-motion';
import React from 'react';

const style = {
  0: {
    rotateY: -55,
    scale: 0.7,
    x: -500,
  },
  1: {
    rotateY: -40,
    scale: 0.86,
    x: -330,
  },
  2: {
    rotateY: 0,
    scale: 1,
    x: 0,
  },
  3: {
    rotateY: 40,
    scale: 0.86,
    x: 330,
  },
  4: {
    rotateY: 55,
    scale: 0.7,
    x: 500,
  },
};

export const CarouselCard = ({
  key,
  layoutId,
  position,
  onClick,
  children,
}) => {
  return (
    <m.div
      layout
      key={key}
      layoutId={layoutId}
      className={`absolute top-0 left-2/4 rounded opacity-50 hover:opacity-100`}
      initial={false}
      animate={{
        rotateY: style[position].rotateY,
        scale: style[position].scale,
        x: style[position].x,
      }}
      transition={{
        duration: 0.5,
        ease: [0.65, 0, 0.35, 1],
      }}
      style={{
        width: 400,
        height: 400,
        marginLeft: -200,
        background: layoutId.includes('blank')
          ? '#333'
          : 'url(https://images-na.ssl-images-amazon.com/images/I/71RfNE3rIyL._SL1500_.jpg) center center no-repeat',
        backgroundSize: 'cover',
        transformOrigin: 'center',
        transform: 'rotateY(1deg)',
      }}
      onClick={layoutId.includes('blank') ? () => null : onClick}
    >
      {children}
    </m.div>
  );
};
