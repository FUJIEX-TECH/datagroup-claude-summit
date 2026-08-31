import React from 'react';
import {Composition} from 'remotion';
import {Teaser, TEASER_DURATION} from './Teaser';
import {FPS} from './theme';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Teaser"
        component={Teaser}
        durationInFrames={TEASER_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
