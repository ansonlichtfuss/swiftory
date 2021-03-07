import { AnimateSharedLayout, m } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';
import { CarouselCard } from './CarouselCard';

const cards = [
  {
    id: 'card1',
  },
  {
    id: 'card2',
  },
  {
    id: 'card3',
  },
  {
    id: 'card4',
  },
  {
    id: 'card5',
  },
  {
    id: 'card6',
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
            'linear-gradient(0.25turn, #14060A,#14060A, rgba(20,6,10,0),rgba(20,6,10,0),rgba(20,6,10,0), #14060A, #14060A)',
          pointerEvents: 'none',
        }}
      ></div>
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
                layoutId={thisCard.id}
                position={index}
                onClick={() => {
                  if (index < 2) {
                    setSelectedCard((curr) => curr - 1);
                  }
                  if (index > 2) {
                    setSelectedCard((curr) => curr + 1);
                  }
                }}
              >
                {thisCard.id}
              </CarouselCard>
            );
          })}
          {/* <div>
        </div>
        <div>
          <CarouselCard
            key={cards[0].id}
            layoutId={cards[1].id}
            position={center}
            onClick={() => {
              setLeft('center');
              setCenter('right');
              setRight('hidden');
            }}
          >
            card 2
          </CarouselCard>
        </div>
        <div>
          <CarouselCard
            key={cards[0].id}
            layoutId={cards[2].id}
            position={right}
            onClick={() => setLeft('center')}
          >
            card 3
          </CarouselCard>
        </div> */}
        </div>
        {/* <style>{`
        .left {
          transform: rotateY(-40deg) scale(0.8);
        }
        .center {
          transform: rotateY(0deg) scale(1);
        }
        .right {
          transform: rotateY(40deg) scale(0.8);
        }
        .hidden {
          opacity: 0;
        }
      `}</style> */}
      </AnimateSharedLayout>
    </m.div>
  );
};
