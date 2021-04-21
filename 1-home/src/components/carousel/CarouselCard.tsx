import { CDN_URL } from '@swiftory/utils';
import { m } from 'framer-motion';
import React from 'react';
import { navigateToUrl } from 'single-spa';

export const CarouselCard = ({
  data,
  layoutId,
  position,
  isSelected,
  rootCardDimension,
}) => {
  const style = {
    0: {
      rotateY: -55,
      scale: 0.7,
      x: -(rootCardDimension * 1.25),
    },
    1: {
      rotateY: -40,
      scale: 0.86,
      x: -(rootCardDimension * 0.825),
    },
    2: {
      rotateY: 0,
      scale: 1,
      x: 0,
    },
    3: {
      rotateY: 40,
      scale: 0.86,
      x: rootCardDimension * 0.825,
    },
    4: {
      rotateY: 55,
      scale: 0.7,
      x: rootCardDimension * 1.25,
    },
  };

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
        duration: 0.4,
        ease: [0.65, 0, 0.35, 1],
      }}
      style={{
        width: rootCardDimension,
        height: rootCardDimension,
        marginLeft: -(rootCardDimension / 2),
        transformOrigin: 'center',
        background: position === 2 ? '#fff' : '',
        pointerEvents: position === 2 ? 'auto' : 'none',
      }}
      href={`/album/${data.id}`}
      onClick={navigateToUrl}
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-image"
        style={{
          zIndex: -1,
          background: layoutId.includes('blank')
            ? '#333'
            : `url(${CDN_URL}/carousel/${data.id}-cover.jpg) center center no-repeat`,
          backgroundSize: 'cover',
          transform: 'scale(1.03)',
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
