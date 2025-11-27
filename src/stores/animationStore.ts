import { create } from "zustand";

import { createDefaultKeyframe, generateId, getDefaultConfig } from "@/lib/animation-utils";
import type {
  AnimatableProperties,
  AnimationConfig,
  AnimationPreset,
  Keyframe,
  PreviewElement,
} from "@/types/animation.types";

interface AnimationStore {
  config: AnimationConfig;
  previewElement: PreviewElement;
  isPlaying: boolean;

  // Config actions
  setConfig: (config: Partial<AnimationConfig>) => void;
  setName: (name: string) => void;
  setDuration: (duration: number) => void;
  setTimingFunction: (timingFunction: string) => void;
  setDelay: (delay: number) => void;
  setIterationCount: (count: number | "infinite") => void;
  setDirection: (direction: AnimationConfig["direction"]) => void;
  setFillMode: (fillMode: AnimationConfig["fillMode"]) => void;

  // Keyframe actions
  addKeyframe: (position: number) => void;
  removeKeyframe: (id: string) => void;
  updateKeyframe: (id: string, keyframe: Partial<Keyframe>) => void;
  updateKeyframeProperties: (id: string, properties: Partial<AnimatableProperties>) => void;

  // Preview actions
  setPreviewElement: (element: PreviewElement) => void;
  setIsPlaying: (playing: boolean) => void;
  togglePlaying: () => void;

  // Preset actions
  loadPreset: (preset: AnimationPreset) => void;
  reset: () => void;
}

export const useAnimationStore = create<AnimationStore>((set) => ({
  config: getDefaultConfig(),
  previewElement: "square",
  isPlaying: true,

  setConfig: (newConfig) =>
    set((state) => ({
      config: { ...state.config, ...newConfig },
    })),

  setName: (name) =>
    set((state) => ({
      config: { ...state.config, name },
    })),

  setDuration: (duration) =>
    set((state) => ({
      config: { ...state.config, duration },
    })),

  setTimingFunction: (timingFunction) =>
    set((state) => ({
      config: { ...state.config, timingFunction },
    })),

  setDelay: (delay) =>
    set((state) => ({
      config: { ...state.config, delay },
    })),

  setIterationCount: (iterationCount) =>
    set((state) => ({
      config: { ...state.config, iterationCount },
    })),

  setDirection: (direction) =>
    set((state) => ({
      config: { ...state.config, direction },
    })),

  setFillMode: (fillMode) =>
    set((state) => ({
      config: { ...state.config, fillMode },
    })),

  addKeyframe: (position) =>
    set((state) => ({
      config: {
        ...state.config,
        keyframes: [...state.config.keyframes, createDefaultKeyframe(position)],
      },
    })),

  removeKeyframe: (id) =>
    set((state) => ({
      config: {
        ...state.config,
        keyframes: state.config.keyframes.filter((kf) => kf.id !== id),
      },
    })),

  updateKeyframe: (id, updates) =>
    set((state) => ({
      config: {
        ...state.config,
        keyframes: state.config.keyframes.map((kf) => (kf.id === id ? { ...kf, ...updates } : kf)),
      },
    })),

  updateKeyframeProperties: (id, properties) =>
    set((state) => ({
      config: {
        ...state.config,
        keyframes: state.config.keyframes.map((kf) =>
          kf.id === id ? { ...kf, properties: { ...kf.properties, ...properties } } : kf
        ),
      },
    })),

  setPreviewElement: (previewElement) => set({ previewElement }),

  setIsPlaying: (isPlaying) => set({ isPlaying }),

  togglePlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),

  loadPreset: (preset) =>
    set({
      config: {
        ...preset.config,
        name: preset.name,
        keyframes: preset.config.keyframes.map((kf) => ({
          ...kf,
          id: generateId(),
        })),
      },
    }),

  reset: () =>
    set({
      config: getDefaultConfig(),
      isPlaying: true,
    }),
}));
