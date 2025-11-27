export interface AnimatableProperties {
  // Transform
  translateX?: string;
  translateY?: string;
  scale?: number;
  rotate?: string;
  skewX?: string;
  skewY?: string;
  // Visual
  opacity?: number;
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
  borderRadius?: string;
  boxShadow?: string;
  // Custom
  custom?: string;
}

export interface Keyframe {
  id: string;
  position: number;
  properties: AnimatableProperties;
}

export type TimingFunction =
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | string;

export type AnimationDirection =
  | "normal"
  | "reverse"
  | "alternate"
  | "alternate-reverse";

export type AnimationFillMode = "none" | "forwards" | "backwards" | "both";

export type IterationCount = number | "infinite";

export interface AnimationConfig {
  name: string;
  duration: number;
  timingFunction: TimingFunction;
  delay: number;
  iterationCount: IterationCount;
  direction: AnimationDirection;
  fillMode: AnimationFillMode;
  keyframes: Keyframe[];
}

export type PreviewElement = "square" | "circle" | "text" | "icon";

export interface HistoryItem {
  id: string;
  name: string;
  config: AnimationConfig;
  css: string;
  createdAt: number;
}

export interface AnimationPreset {
  id: string;
  name: string;
  config: Omit<AnimationConfig, "name">;
}
