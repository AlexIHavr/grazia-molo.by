type settingsType = {
  timeRepeatFrames: number;
};

export type sliderType = {
  framesUrl: string;
  frames: string[];
  activeFrame: number;
  sliderTimer: NodeJS.Timer;
  settings: settingsType;
};
