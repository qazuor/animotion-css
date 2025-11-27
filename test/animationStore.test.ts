import { act } from "react";
import { beforeEach, describe, expect, it } from "vitest";

import { useAnimationStore } from "@/stores/animationStore";

describe("animationStore", () => {
  beforeEach(() => {
    act(() => {
      useAnimationStore.getState().reset();
    });
  });

  describe("initial state", () => {
    it("has default config", () => {
      const { config } = useAnimationStore.getState();
      expect(config.name).toBe("myAnimation");
      expect(config.duration).toBe(1000);
      expect(config.timingFunction).toBe("ease");
      expect(config.keyframes.length).toBe(2);
    });

    it("has default preview element", () => {
      const { previewElement } = useAnimationStore.getState();
      expect(previewElement).toBe("square");
    });

    it("starts playing", () => {
      const { isPlaying } = useAnimationStore.getState();
      expect(isPlaying).toBe(true);
    });
  });

  describe("setName", () => {
    it("changes animation name", () => {
      act(() => {
        useAnimationStore.getState().setName("customAnimation");
      });

      const { config } = useAnimationStore.getState();
      expect(config.name).toBe("customAnimation");
    });
  });

  describe("setDuration", () => {
    it("changes duration", () => {
      act(() => {
        useAnimationStore.getState().setDuration(2000);
      });

      const { config } = useAnimationStore.getState();
      expect(config.duration).toBe(2000);
    });
  });

  describe("setTimingFunction", () => {
    it("changes timing function", () => {
      act(() => {
        useAnimationStore.getState().setTimingFunction("linear");
      });

      const { config } = useAnimationStore.getState();
      expect(config.timingFunction).toBe("linear");
    });
  });

  describe("setDelay", () => {
    it("changes delay", () => {
      act(() => {
        useAnimationStore.getState().setDelay(500);
      });

      const { config } = useAnimationStore.getState();
      expect(config.delay).toBe(500);
    });
  });

  describe("setIterationCount", () => {
    it("changes iteration count to number", () => {
      act(() => {
        useAnimationStore.getState().setIterationCount(5);
      });

      const { config } = useAnimationStore.getState();
      expect(config.iterationCount).toBe(5);
    });

    it("changes iteration count to infinite", () => {
      act(() => {
        useAnimationStore.getState().setIterationCount("infinite");
      });

      const { config } = useAnimationStore.getState();
      expect(config.iterationCount).toBe("infinite");
    });
  });

  describe("setDirection", () => {
    it("changes direction", () => {
      act(() => {
        useAnimationStore.getState().setDirection("reverse");
      });

      const { config } = useAnimationStore.getState();
      expect(config.direction).toBe("reverse");
    });
  });

  describe("setFillMode", () => {
    it("changes fill mode", () => {
      act(() => {
        useAnimationStore.getState().setFillMode("forwards");
      });

      const { config } = useAnimationStore.getState();
      expect(config.fillMode).toBe("forwards");
    });
  });

  describe("addKeyframe", () => {
    it("adds a new keyframe", () => {
      const initialLength = useAnimationStore.getState().config.keyframes.length;

      act(() => {
        useAnimationStore.getState().addKeyframe(50);
      });

      const { config } = useAnimationStore.getState();
      expect(config.keyframes.length).toBe(initialLength + 1);
    });

    it("new keyframe has correct position", () => {
      act(() => {
        useAnimationStore.getState().addKeyframe(75);
      });

      const { config } = useAnimationStore.getState();
      const newKeyframe = config.keyframes.find((kf) => kf.position === 75);
      expect(newKeyframe).toBeDefined();
    });

    it("new keyframe has unique ID", () => {
      act(() => {
        useAnimationStore.getState().addKeyframe(25);
        useAnimationStore.getState().addKeyframe(75);
      });

      const { config } = useAnimationStore.getState();
      const ids = config.keyframes.map((kf) => kf.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe("removeKeyframe", () => {
    it("removes a keyframe by ID", () => {
      act(() => {
        useAnimationStore.getState().addKeyframe(50);
      });

      const { config } = useAnimationStore.getState();
      const keyframeToRemove = config.keyframes.find((kf) => kf.position === 50);

      act(() => {
        useAnimationStore.getState().removeKeyframe(keyframeToRemove!.id);
      });

      const { config: newConfig } = useAnimationStore.getState();
      expect(newConfig.keyframes.find((kf) => kf.id === keyframeToRemove!.id)).toBeUndefined();
    });
  });

  describe("updateKeyframe", () => {
    it("updates keyframe position", () => {
      const { config } = useAnimationStore.getState();
      const keyframeId = config.keyframes[0].id;

      act(() => {
        useAnimationStore.getState().updateKeyframe(keyframeId, { position: 10 });
      });

      const { config: newConfig } = useAnimationStore.getState();
      const updatedKeyframe = newConfig.keyframes.find((kf) => kf.id === keyframeId);
      expect(updatedKeyframe?.position).toBe(10);
    });
  });

  describe("updateKeyframeProperties", () => {
    it("updates keyframe properties", () => {
      const { config } = useAnimationStore.getState();
      const keyframeId = config.keyframes[0].id;

      act(() => {
        useAnimationStore.getState().updateKeyframeProperties(keyframeId, {
          opacity: 0.5,
          scale: 2,
        });
      });

      const { config: newConfig } = useAnimationStore.getState();
      const updatedKeyframe = newConfig.keyframes.find((kf) => kf.id === keyframeId);
      expect(updatedKeyframe?.properties.opacity).toBe(0.5);
      expect(updatedKeyframe?.properties.scale).toBe(2);
    });
  });

  describe("setPreviewElement", () => {
    it("changes preview element", () => {
      act(() => {
        useAnimationStore.getState().setPreviewElement("circle");
      });

      const { previewElement } = useAnimationStore.getState();
      expect(previewElement).toBe("circle");
    });
  });

  describe("togglePlaying", () => {
    it("toggles playing state", () => {
      const initialState = useAnimationStore.getState().isPlaying;

      act(() => {
        useAnimationStore.getState().togglePlaying();
      });

      const { isPlaying } = useAnimationStore.getState();
      expect(isPlaying).toBe(!initialState);
    });
  });

  describe("loadPreset", () => {
    it("loads preset config", () => {
      const preset = {
        id: "test",
        name: "testPreset",
        config: {
          duration: 800,
          timingFunction: "ease-in",
          delay: 100,
          iterationCount: 2 as const,
          direction: "normal" as const,
          fillMode: "forwards" as const,
          keyframes: [
            { id: "1", position: 0, properties: { opacity: 0 } },
            { id: "2", position: 100, properties: { opacity: 1 } },
          ],
        },
      };

      act(() => {
        useAnimationStore.getState().loadPreset(preset);
      });

      const { config } = useAnimationStore.getState();
      expect(config.name).toBe("testPreset");
      expect(config.duration).toBe(800);
      expect(config.timingFunction).toBe("ease-in");
    });

    it("generates new IDs for keyframes", () => {
      const preset = {
        id: "test",
        name: "testPreset",
        config: {
          duration: 500,
          timingFunction: "ease",
          delay: 0,
          iterationCount: 1 as const,
          direction: "normal" as const,
          fillMode: "none" as const,
          keyframes: [
            { id: "original-1", position: 0, properties: {} },
            { id: "original-2", position: 100, properties: {} },
          ],
        },
      };

      act(() => {
        useAnimationStore.getState().loadPreset(preset);
      });

      const { config } = useAnimationStore.getState();
      expect(config.keyframes[0].id).not.toBe("original-1");
      expect(config.keyframes[1].id).not.toBe("original-2");
    });
  });

  describe("reset", () => {
    it("resets to default config", () => {
      act(() => {
        useAnimationStore.getState().setName("customName");
        useAnimationStore.getState().setDuration(5000);
        useAnimationStore.getState().addKeyframe(50);
      });

      act(() => {
        useAnimationStore.getState().reset();
      });

      const { config } = useAnimationStore.getState();
      expect(config.name).toBe("myAnimation");
      expect(config.duration).toBe(1000);
      expect(config.keyframes.length).toBe(2);
    });

    it("resets playing state", () => {
      act(() => {
        useAnimationStore.getState().setIsPlaying(false);
      });

      act(() => {
        useAnimationStore.getState().reset();
      });

      const { isPlaying } = useAnimationStore.getState();
      expect(isPlaying).toBe(true);
    });
  });
});
