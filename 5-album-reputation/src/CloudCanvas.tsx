import { useViewportScroll } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

/**
 * Prop Types
 */
type Props = {
  preloadedImages: HTMLImageElement[];
};

/**
 * Component
 */
export const CloudCanvas = ({ preloadedImages }: Props): JSX.Element => {
  const { scrollYProgress, scrollY } = useViewportScroll();
  const canvasRef = useRef<HTMLCanvasElement>();

  const drawCanvasImage = (imgToDraw) => {
    if (!canvasRef?.current) {
      return;
    }

    const context = canvasRef?.current?.getContext('2d');
    const img: HTMLImageElement = imgToDraw;
    context.drawImage(
      img,
      0,
      0,
      canvasRef?.current?.width,
      canvasRef?.current?.height
    );
  };

  useEffect(() => {
    if (preloadedImages.length > 0) {
      // Make sure canvas is window sized
      const context = canvasRef?.current?.getContext('2d');
      context.canvas.width = window.innerWidth;
      context.canvas.height = window.innerHeight;

      // Draw an initial image
      drawCanvasImage(preloadedImages[0]);

      // Add scroll listener for future changes
      scrollYProgress.onChange((latest) => {
        const newIndex = Math.round(latest * 191);
        if (newIndex > 0 && newIndex % 2 === 0) {
          drawCanvasImage(preloadedImages[newIndex]);
        }
      });
    }
  }, [preloadedImages, scrollYProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen z-0 object-cover"
    />
  );
};
