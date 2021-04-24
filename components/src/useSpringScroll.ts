import { useSpring, useViewportScroll } from 'framer-motion';

/**
 * Hook
 */
export const useSpringScroll = () => {
  const { scrollY: scrollYValue } = useViewportScroll();
  const scrollY = useSpring(scrollYValue, {
    damping: 30,
    stiffness: 200,
  });

  return { scrollY };
};

export default useSpringScroll;
