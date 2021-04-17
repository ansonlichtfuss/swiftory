declare module '@swiftory/components' {
  import { FunctionComponent } from 'react';

  export const AddToJukeboxButton: ({
    albumKey,
    children,
  }: {
    albumKey: string;
    children: React.ReactNode;
  }) => FunctionComponent;
}
