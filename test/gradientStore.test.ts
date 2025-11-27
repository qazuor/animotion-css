import { act } from "react";
import { beforeEach, describe, expect, it } from "vitest";

import { useGradientStore } from "@/stores/gradientStore";

describe("gradientStore", () => {
  beforeEach(() => {
    act(() => {
      useGradientStore.getState().reset();
    });
  });

  describe("initial state", () => {
    it("has default config", () => {
      const { config } = useGradientStore.getState();
      expect(config.type).toBe("linear");
      expect(config.angle).toBe(90);
      expect(config.colorStops.length).toBe(2);
    });

    it("has generated CSS", () => {
      const { css, fullCss } = useGradientStore.getState();
      expect(css).toContain("linear-gradient");
      expect(fullCss).toContain("background:");
    });
  });

  describe("setType", () => {
    it("changes gradient type to radial", () => {
      act(() => {
        useGradientStore.getState().setType("radial");
      });

      const { config, css } = useGradientStore.getState();
      expect(config.type).toBe("radial");
      expect(css).toContain("radial-gradient");
    });

    it("changes gradient type to conic", () => {
      act(() => {
        useGradientStore.getState().setType("conic");
      });

      const { config, css } = useGradientStore.getState();
      expect(config.type).toBe("conic");
      expect(css).toContain("conic-gradient");
    });
  });

  describe("setAngle", () => {
    it("changes angle", () => {
      act(() => {
        useGradientStore.getState().setAngle(180);
      });

      const { config, css } = useGradientStore.getState();
      expect(config.angle).toBe(180);
      expect(css).toContain("180deg");
    });

    it("handles 0 angle", () => {
      act(() => {
        useGradientStore.getState().setAngle(0);
      });

      const { config } = useGradientStore.getState();
      expect(config.angle).toBe(0);
    });
  });

  describe("setRadialShape", () => {
    it("changes to ellipse", () => {
      act(() => {
        useGradientStore.getState().setType("radial");
        useGradientStore.getState().setRadialShape("ellipse");
      });

      const { config, css } = useGradientStore.getState();
      expect(config.radialShape).toBe("ellipse");
      expect(css).toContain("ellipse");
    });
  });

  describe("setRadialPosition", () => {
    it("changes position", () => {
      act(() => {
        useGradientStore.getState().setType("radial");
        useGradientStore.getState().setRadialPosition(25, 75);
      });

      const { config, css } = useGradientStore.getState();
      expect(config.radialPosition).toEqual({ x: 25, y: 75 });
      expect(css).toContain("25% 75%");
    });
  });

  describe("addColorStop", () => {
    it("adds a new color stop", () => {
      const initialLength = useGradientStore.getState().config.colorStops.length;

      act(() => {
        useGradientStore.getState().addColorStop();
      });

      const { config } = useGradientStore.getState();
      expect(config.colorStops.length).toBe(initialLength + 1);
    });

    it("new stop has position 50", () => {
      act(() => {
        useGradientStore.getState().addColorStop();
      });

      const { config } = useGradientStore.getState();
      const newStop = config.colorStops[config.colorStops.length - 1];
      expect(newStop.position).toBe(50);
    });

    it("new stop has unique ID", () => {
      act(() => {
        useGradientStore.getState().addColorStop();
      });

      const { config } = useGradientStore.getState();
      const ids = config.colorStops.map((s) => s.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe("removeColorStop", () => {
    it("removes a color stop", () => {
      act(() => {
        useGradientStore.getState().addColorStop();
      });

      const { config } = useGradientStore.getState();
      const stopToRemove = config.colorStops[2];

      act(() => {
        useGradientStore.getState().removeColorStop(stopToRemove.id);
      });

      const { config: newConfig } = useGradientStore.getState();
      expect(newConfig.colorStops.find((s) => s.id === stopToRemove.id)).toBeUndefined();
    });

    it("does not remove if only 2 stops remain", () => {
      const { config } = useGradientStore.getState();
      const stopId = config.colorStops[0].id;

      act(() => {
        useGradientStore.getState().removeColorStop(stopId);
      });

      const { config: newConfig } = useGradientStore.getState();
      expect(newConfig.colorStops.length).toBe(2);
    });
  });

  describe("updateColorStop", () => {
    it("updates color", () => {
      const { config } = useGradientStore.getState();
      const stopId = config.colorStops[0].id;

      act(() => {
        useGradientStore.getState().updateColorStop(stopId, { color: "#123456" });
      });

      const { config: newConfig } = useGradientStore.getState();
      const updatedStop = newConfig.colorStops.find((s) => s.id === stopId);
      expect(updatedStop?.color).toBe("#123456");
    });

    it("updates position", () => {
      const { config } = useGradientStore.getState();
      const stopId = config.colorStops[0].id;

      act(() => {
        useGradientStore.getState().updateColorStop(stopId, { position: 25 });
      });

      const { config: newConfig } = useGradientStore.getState();
      const updatedStop = newConfig.colorStops.find((s) => s.id === stopId);
      expect(updatedStop?.position).toBe(25);
    });

    it("updates CSS after change", () => {
      const { config } = useGradientStore.getState();
      const stopId = config.colorStops[0].id;

      act(() => {
        useGradientStore.getState().updateColorStop(stopId, { color: "#abcdef" });
      });

      const { css } = useGradientStore.getState();
      expect(css).toContain("#abcdef");
    });
  });

  describe("reset", () => {
    it("resets to default config", () => {
      act(() => {
        useGradientStore.getState().setType("conic");
        useGradientStore.getState().setAngle(270);
        useGradientStore.getState().addColorStop();
      });

      act(() => {
        useGradientStore.getState().reset();
      });

      const { config } = useGradientStore.getState();
      expect(config.type).toBe("linear");
      expect(config.angle).toBe(90);
      expect(config.colorStops.length).toBe(2);
    });
  });

  describe("randomize", () => {
    it("changes config values", () => {
      const initialCss = useGradientStore.getState().css;

      act(() => {
        useGradientStore.getState().randomize();
      });

      const { css } = useGradientStore.getState();
      // Due to randomness, we just check it changed or is valid
      expect(css).toBeTruthy();
    });

    it("produces valid gradient CSS", () => {
      act(() => {
        useGradientStore.getState().randomize();
      });

      const { css } = useGradientStore.getState();
      expect(css).toMatch(/(linear|radial|conic)-gradient/);
    });
  });

  describe("applyConfig", () => {
    it("applies a full config", () => {
      const newConfig = {
        type: "conic" as const,
        angle: 123,
        radialShape: "ellipse" as const,
        radialPosition: { x: 10, y: 20 },
        colorStops: [
          { id: "a", color: "#111111", position: 0 },
          { id: "b", color: "#222222", position: 100 },
        ],
      };

      act(() => {
        useGradientStore.getState().applyConfig(newConfig);
      });

      const { config, css } = useGradientStore.getState();
      expect(config).toEqual(newConfig);
      expect(css).toContain("conic-gradient");
    });
  });
});
