import { m } from 'framer-motion';
import React from 'react';
import { navigateToUrl } from 'single-spa';

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

export const CarouselCard = ({ data, layoutId, position, isSelected }) => {
  return (
    <m.a
      layout
      layoutId={layoutId}
      className={`absolute top-0 left-2/4 flex items-center justify-center rounded overflow-hidden cursor-pointer ${
        position === 2 ? 'carousel-card-active-hover' : 'carousel-card-hover'
      }`}
      initial={false}
      animate={{
        rotateY: style[position].rotateY,
        scale: style[position].scale,
        x: style[position].x,
        opacity: isSelected ? 1 : 0.4,
      }}
      transition={{
        duration: 0.5,
        ease: [0.65, 0, 0.35, 1],
      }}
      style={{
        width: 400,
        height: 400,
        marginLeft: -200,
        transformOrigin: 'center',
        background: position === 2 ? '#fff' : '',
        pointerEvents: position === 2 ? 'auto' : 'none',
      }}
      href={data.href}
      onClick={navigateToUrl}
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-image"
        style={{
          zIndex: -1,
          background: layoutId.includes('blank')
            ? '#333'
            : 'url(https://images-na.ssl-images-amazon.com/images/I/71RfNE3rIyL._SL1500_.jpg) center center no-repeat',
          backgroundSize: 'cover',
          transition: 'filter 0.3s ease',
        }}
      ></div>
      {position === 2 && (
        <div
          className="action-arrow text-5xl font-thin text-black opacity-0 text-center"
          style={{
            mixBlendMode: 'soft-light',
            transition: 'opacity 0.3s ease',
          }}
        >
          <p className="text-4xl font-bold">ENTER</p>
          &rarr;
        </div>
      )}
      <style>{`
        .carousel-card-active-hover:hover .action-arrow {
          opacity: 1;
        }
        .carousel-card-active-hover:hover .bg-image {
          filter: blur(8px);
          opacity: 0.8;
        }
      `}</style>
    </m.a>
  );
};
