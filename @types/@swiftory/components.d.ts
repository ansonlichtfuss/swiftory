declare module '@swiftory/components' {
  import { MotionValue } from 'framer-motion';
  export const AddToJukeboxButton: ({
    albumKey,
    children,
  }: {
    albumKey: string;
    children: React.ReactNode;
  }) => JSX.Element;

  export const useSpringScroll: () => {
    scrollY: MotionValue<number>;
  };
}
