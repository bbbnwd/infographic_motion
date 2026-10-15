import React from "react";
import { Composition } from "remotion";
import { Film } from "./video";
import { DATA } from "./data";
export const Root: React.FC = () => (
  <Composition
    id={DATA.composition}
    component={Film}
    durationInFrames={DATA.frames}
    fps={DATA.fps}
    width={DATA.width}
    height={DATA.height}
  />
);
