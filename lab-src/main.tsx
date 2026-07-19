import { render } from "solid-js/web";
import { Experiment } from "./Experiment";
import { CommandPalette } from "./CommandPalette";
import { GhostText } from "./GhostText";
import { AnimatedDiff } from "./AnimatedDiff";
import { StreamRenderer } from "./StreamRenderer";
import { MotionToy } from "./MotionToy";
import { SmiskiBox } from "./SmiskiBox";
import paletteSource from "./CommandPalette.tsx?raw";
import fuzzySource from "./fuzzy.ts?raw";
import ghostSource from "./GhostText.tsx?raw";
import diffSource from "./AnimatedDiff.tsx?raw";
import streamSource from "./StreamRenderer.tsx?raw";
import toySource from "./MotionToy.tsx?raw";
import smiskiSource from "./SmiskiBox.tsx?raw";
import smiskiSceneSource from "./smiski-scene.ts?raw";

const mount = (id: string, component: () => ReturnType<typeof Experiment>) => {
  const el = document.getElementById(id);
  if (el) render(component, el);
};

mount("exp-palette", () => (
  <Experiment source={`${paletteSource}\n\n// fuzzy.ts\n${fuzzySource}`} sourceName="CommandPalette.tsx">
    <CommandPalette />
  </Experiment>
));

mount("exp-ghost", () => (
  <Experiment source={ghostSource} sourceName="GhostText.tsx">
    <GhostText />
  </Experiment>
));

mount("exp-diff", () => (
  <Experiment source={diffSource} sourceName="AnimatedDiff.tsx">
    <AnimatedDiff />
  </Experiment>
));

mount("exp-stream", () => (
  <Experiment source={streamSource} sourceName="StreamRenderer.tsx">
    <StreamRenderer />
  </Experiment>
));

mount("exp-toy", () => (
  <Experiment source={toySource} sourceName="MotionToy.tsx">
    <MotionToy />
  </Experiment>
));

mount("exp-smiski", () => (
  <Experiment
    source={`${smiskiSource}\n\n// smiski-scene.ts\n${smiskiSceneSource}`}
    sourceName="SmiskiBox.tsx"
  >
    <SmiskiBox />
  </Experiment>
));
