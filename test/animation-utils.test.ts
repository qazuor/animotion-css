import { describe, expect, it } from "vitest";

import type { AnimationConfig, Keyframe } from "@/types/animation.types";

import {
  createDefaultKeyframe,
  generateAnimationProperty,
  generateCSS,
  generateId,
  generateKeyframesCSS,
  getDefaultConfig,
} from "@/lib/animation-utils";

describe("generateKeyframesCSS", () => {
  it("generates keyframes CSS with transform properties", () => {
    const keyframes: Keyframe[] = [
      { id: "1", position: 0, properties: { scale: 1, opacity: 1 } },
      { id: "2", position: 100, properties: { scale: 1.5, opacity: 0.5 } },
    ];

    const css = generateKeyframesCSS("testAnimation", keyframes);
    expect(css).toContain("@keyframes testAnimation");
    expect(css).toContain("0%");
    expect(css).toContain("100%");
    expect(css).toContain("scale(1)");
    expect(css).toContain("opacity: 1");
  });

  it("sorts keyframes by position", () => {
    const keyframes: Keyframe[] = [
      { id: "1", position: 100, properties: { opacity: 0 } },
      { id: "2", position: 0, properties: { opacity: 1 } },
      { id: "3", position: 50, properties: { opacity: 0.5 } },
    ];

    const css = generateKeyframesCSS("test", keyframes);
    const positions = css.match(/\d+%/g);
    expect(positions).toEqual(["0%", "50%", "100%"]);
  });

  it("handles translate properties", () => {
    const keyframes: Keyframe[] = [
      { id: "1", position: 0, properties: { translateX: "0px", translateY: "0px" } },
      { id: "2", position: 100, properties: { translateX: "100px", translateY: "50px" } },
    ];

    const css = generateKeyframesCSS("slide", keyframes);
    expect(css).toContain("translateX(0px)");
    expect(css).toContain("translateY(50px)");
  });

  it("handles rotate and skew properties", () => {
    const keyframes: Keyframe[] = [
      { id: "1", position: 0, properties: { rotate: "0deg", skewX: "0deg" } },
      { id: "2", position: 100, properties: { rotate: "360deg", skewX: "15deg" } },
    ];

    const css = generateKeyframesCSS("spin", keyframes);
    expect(css).toContain("rotate(360deg)");
    expect(css).toContain("skewX(15deg)");
  });

  it("handles visual properties", () => {
    const keyframes: Keyframe[] = [
      { id: "1", position: 0, properties: { backgroundColor: "#ff0000", borderRadius: "0px" } },
      { id: "2", position: 100, properties: { backgroundColor: "#0000ff", borderRadius: "50%" } },
    ];

    const css = generateKeyframesCSS("colorChange", keyframes);
    expect(css).toContain("background-color: #ff0000");
    expect(css).toContain("border-radius: 50%");
  });

  it("handles custom CSS property", () => {
    const keyframes: Keyframe[] = [
      { id: "1", position: 0, properties: { custom: "filter: blur(0px)" } },
      { id: "2", position: 100, properties: { custom: "filter: blur(10px)" } },
    ];

    const css = generateKeyframesCSS("blur", keyframes);
    expect(css).toContain("filter: blur(10px)");
  });

  it("handles empty properties", () => {
    const keyframes: Keyframe[] = [
      { id: "1", position: 0, properties: {} },
      { id: "2", position: 100, properties: {} },
    ];

    const css = generateKeyframesCSS("empty", keyframes);
    expect(css).toContain("@keyframes empty");
    expect(css).toContain("0%");
    expect(css).toContain("100%");
  });
});

describe("generateAnimationProperty", () => {
  it("generates animation property with all values", () => {
    const config: AnimationConfig = {
      name: "myAnimation",
      duration: 1000,
      timingFunction: "ease-in-out",
      delay: 200,
      iterationCount: 3,
      direction: "alternate",
      fillMode: "forwards",
      keyframes: [],
    };

    const property = generateAnimationProperty(config);
    expect(property).toBe("animation: myAnimation 1000ms ease-in-out 200ms 3 alternate forwards");
  });

  it("handles infinite iteration count", () => {
    const config: AnimationConfig = {
      name: "loop",
      duration: 500,
      timingFunction: "linear",
      delay: 0,
      iterationCount: "infinite",
      direction: "normal",
      fillMode: "none",
      keyframes: [],
    };

    const property = generateAnimationProperty(config);
    expect(property).toContain("infinite");
  });
});

describe("generateCSS", () => {
  it("generates complete CSS with keyframes and animation property", () => {
    const config: AnimationConfig = {
      name: "fadeIn",
      duration: 500,
      timingFunction: "ease",
      delay: 0,
      iterationCount: 1,
      direction: "normal",
      fillMode: "forwards",
      keyframes: [
        { id: "1", position: 0, properties: { opacity: 0 } },
        { id: "2", position: 100, properties: { opacity: 1 } },
      ],
    };

    const css = generateCSS(config);
    expect(css).toContain("@keyframes fadeIn");
    expect(css).toContain(".animated-element");
    expect(css).toContain("animation: fadeIn");
  });
});

describe("generateId", () => {
  it("generates unique IDs", () => {
    const ids = new Set<string>();
    for (let i = 0; i < 100; i++) {
      ids.add(generateId());
    }
    expect(ids.size).toBe(100);
  });

  it("generates string IDs", () => {
    const id = generateId();
    expect(typeof id).toBe("string");
    expect(id.length).toBeGreaterThan(0);
  });

  it("generates alphanumeric IDs", () => {
    const id = generateId();
    expect(id).toMatch(/^[a-z0-9]+$/);
  });
});

describe("createDefaultKeyframe", () => {
  it("creates keyframe with given position", () => {
    const keyframe = createDefaultKeyframe(50);
    expect(keyframe.position).toBe(50);
  });

  it("creates keyframe with empty properties", () => {
    const keyframe = createDefaultKeyframe(0);
    expect(keyframe.properties).toEqual({});
  });

  it("creates keyframe with unique ID", () => {
    const kf1 = createDefaultKeyframe(0);
    const kf2 = createDefaultKeyframe(100);
    expect(kf1.id).not.toBe(kf2.id);
  });
});

describe("getDefaultConfig", () => {
  it("returns valid default config", () => {
    const config = getDefaultConfig();
    expect(config.name).toBe("myAnimation");
    expect(config.duration).toBe(1000);
    expect(config.timingFunction).toBe("ease");
    expect(config.keyframes.length).toBe(2);
  });

  it("has keyframes at 0 and 100 positions", () => {
    const config = getDefaultConfig();
    const positions = config.keyframes.map((kf) => kf.position);
    expect(positions).toContain(0);
    expect(positions).toContain(100);
  });

  it("has unique keyframe IDs", () => {
    const config = getDefaultConfig();
    const ids = config.keyframes.map((kf) => kf.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has default animation properties in keyframes", () => {
    const config = getDefaultConfig();
    expect(config.keyframes[0].properties.scale).toBe(1);
    expect(config.keyframes[0].properties.opacity).toBe(1);
  });
});
