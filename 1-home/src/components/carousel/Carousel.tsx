import { AnimateSharedLayout, m } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';
import { CarouselCard } from './CarouselCard';

const cards = [
  {
    id: 'folklore',
  },
  {
    id: 'lover',
  },
  {
    id: 'reputation',
  },
];

const getCard = (index) => {
  let thisCard = {
    id: `blank${index}`,
  };

  if (cards[index] !== undefined) {
    thisCard = cards[index];
  }

  return thisCard;
};

export const Carousel = () => {
  const [selectedCard, setSelectedCard] = useState(-1);
  const thisSet = useMemo(
    () => [
      getCard(selectedCard - 2),
      getCard(selectedCard - 1),
      getCard(selectedCard),
      getCard(selectedCard + 1),
      getCard(selectedCard + 2),
    ],
    [selectedCard]
  );

  // The first time this carousel animation run it can
  // flicker a bit. Run it once to smooth things out.
  useEffect(() => setSelectedCard(1), []);

  return (
    <m.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div
        className="absolute top-0 left-0 w-full h-full z-10"
        style={{
          background:
            'linear-gradient(0.25turn, #000,#000, rgba(20,6,10,0),rgba(20,6,10,0),rgba(20,6,10,0), #000, #000)',
          pointerEvents: 'none',
        }}
      ></div>

      <button
        type="button"
        onClick={() =>
          selectedCard > 0 ? setSelectedCard((curr) => curr - 1) : null
        }
        className={`absolute top-0 text-9xl font-medium text-white text-center z-10 h-full flex items-center justify-end px-24 transition-opacity ${
          selectedCard > 0
            ? 'opacity-40 hover:opacity-100'
            : 'opacity-0 hover:opacity-0 cursor-default'
        }`}
        style={{ width: '200px', left: 'calc(50% - 400px)', outline: 'none' }}
      >
        &lang;
      </button>

      <button
        type="button"
        onClick={() =>
          selectedCard < cards.length - 1
            ? setSelectedCard((curr) => curr + 1)
            : null
        }
        className={`absolute top-0 text-9xl font-medium text-white text-center z-10 h-full flex items-center justify-start px-24 transition-opacity ${
          selectedCard < cards.length - 1
            ? 'opacity-40 hover:opacity-100'
            : 'opacity-0 hover:opacity-0 cursor-default'
        }`}
        style={{ width: '200px', left: 'calc(50% + 200px)', outline: 'none' }}
      >
        &rang;
      </button>

      <AnimateSharedLayout>
        <div
          style={{
            height: 400,
            perspective: '1000px',
          }}
        >
          {thisSet.map((card, index) => {
            let thisCard = {
              id: `blank${index}`,
            };
            if (card?.id !== undefined) {
              thisCard = card;
            }
            return (
              <CarouselCard
                key={thisCard.id}
                data={card}
                layoutId={thisCard.id}
                position={index}
                isSelected={index === 2}
              ></CarouselCard>
            );
          })}
        </div>
      </AnimateSharedLayout>
    </m.div>
  );
};
