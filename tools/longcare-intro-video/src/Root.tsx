import React from 'react';
import { Composition } from 'remotion';
import { MainComp } from './Composition';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="MainComp"
        component={MainComp}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
