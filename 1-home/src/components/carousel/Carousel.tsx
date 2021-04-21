import { AnimateSharedLayout, m } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { FOLKLORE_COVER, LOVER_COVER, REPUTATION_COVER } from '../../images';
import { CarouselCard } from './CarouselCard';

const LAST_SELECTED_ALBUM_KEY = 'swiftory_lastSelectedAlbum';
const getLastSelectedAlbum = (): number => {
  const lastAlbumValue = sessionStorage.getItem(LAST_SELECTED_ALBUM_KEY);
  if (lastAlbumValue === null) return 1;
  return Number(lastAlbumValue);
};
const setLastSelectedAlbum = (value: number): void => {
  sessionStorage.setItem(LAST_SELECTED_ALBUM_KEY, value.toString());
};

const cards = [
  {
    id: 'folklore',
    image: FOLKLORE_COVER,
  },
  {
    id: 'lover',
    image: LOVER_COVER,
  },
  {
    id: 'reputation',
    image: REPUTATION_COVER,
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
  const isSmallScreen = useMediaQuery({
    query: '(max-height: 900px)',
  });
  const rootCardDimension = isSmallScreen ? 400 : 600;

  // Always start one album behind, so we have a consistent
  // initialization animation every time.
  const [selectedAlbum, setSelectedAlbum] = useState(
    getLastSelectedAlbum() - 1
  );
  const thisSet = useMemo(
    () => [
      getCard(selectedAlbum - 2),
      getCard(selectedAlbum - 1),
      getCard(selectedAlbum),
      getCard(selectedAlbum + 1),
      getCard(selectedAlbum + 2),
    ],
    [selectedAlbum]
  );

  // The first time this carousel animation run it can
  // flicker a bit. Run it once to smooth things out.
  // We're also loading in the user's last selected album to
  // preserve their UI state across micro frontend re-mounts.
  useEffect(() => {
    setSelectedAlbum(getLastSelectedAlbum());
  }, []);

  const updateSelectedAlbum = (shouldIncrement: boolean) => {
    setSelectedAlbum((current) => {
      const newValue = shouldIncrement ? current + 1 : current - 1;
      setLastSelectedAlbum(newValue);
      return newValue;
    });
  };

  return (
    <m.div
      className="relative w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div
        className="absolute top-0 w-full h-full z-10"
        style={{
          left: `calc(50% - ${rootCardDimension * 1.5}px)`,
          width: `${rootCardDimension * 3}px`,
          background:
            'linear-gradient(0.25turn, #000,#000, rgba(0,0,0,0),rgba(0,0,0,0),rgba(0,0,0,0), #000, #000)',
          pointerEvents: 'none',
        }}
      ></div>

      <button
        type="button"
        onClick={() => (selectedAlbum > 0 ? updateSelectedAlbum(false) : null)}
        className={`absolute top-0 text-9xl font-medium text-white text-center z-10 h-full flex items-center justify-end px-24 transition-opacity ${
          selectedAlbum > 0
            ? 'opacity-40 hover:opacity-100'
            : 'opacity-0 hover:opacity-0 cursor-default'
        }`}
        style={{
          width: `${rootCardDimension / 2}px`,
          left: `calc(50% - ${rootCardDimension}px)`,
          outline: 'none',
        }}
      >
        &lang;
      </button>

      <button
        type="button"
        onClick={() =>
          selectedAlbum < cards.length - 1 ? updateSelectedAlbum(true) : null
        }
        className={`absolute top-0 text-9xl font-medium text-white text-center z-10 h-full flex items-center justify-start px-24 transition-opacity ${
          selectedAlbum < cards.length - 1
            ? 'opacity-40 hover:opacity-100'
            : 'opacity-0 hover:opacity-0 cursor-default'
        }`}
        style={{
          width: `${rootCardDimension / 2}px`,
          left: `calc(50% + ${rootCardDimension / 2}px)`,
          outline: 'none',
        }}
      >
        &rang;
      </button>
      <AnimateSharedLayout>
        <div
          style={{
            height: rootCardDimension,
            perspective: `${rootCardDimension * 2}px`,
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
                rootCardDimension={rootCardDimension}
              ></CarouselCard>
            );
          })}
        </div>
      </AnimateSharedLayout>
    </m.div>
  );
};
