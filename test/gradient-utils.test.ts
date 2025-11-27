import { describe, expect, it } from "vitest";

import type { GradientConfig } from "@/types/gradient.types";

import {
  generateFullCSS,
  generateGradientCSS,
  generateId,
  getDefaultConfig,
  getRandomColor,
  getRandomConfig,
} from "@/lib/gradient-utils";

describe("generateGradientCSS", () => {
  it("generates linear gradient CSS", () => {
    const config: GradientConfig = {
      type: "linear",
      angle: 90,
      radialShape: "circle",
      radialPosition: { x: 50, y: 50 },
      colorStops: [
        { id: "1", color: "#ff0000", position: 0 },
        { id: "2", color: "#0000ff", position: 100 },
      ],
    };

    const css = generateGradientCSS(config);
    expect(css).toBe("linear-gradient(90deg, #ff0000 0%, #0000ff 100%)");
  });

  it("generates radial gradient CSS", () => {
    const config: GradientConfig = {
      type: "radial",
      angle: 0,
      radialShape: "circle",
      radialPosition: { x: 50, y: 50 },
      colorStops: [
        { id: "1", color: "#ff0000", position: 0 },
        { id: "2", color: "#0000ff", position: 100 },
      ],
    };

    const css = generateGradientCSS(config);
    expect(css).toBe("radial-gradient(circle at 50% 50%, #ff0000 0%, #0000ff 100%)");
  });

  it("generates radial gradient with ellipse shape", () => {
    const config: GradientConfig = {
      type: "radial",
      angle: 0,
      radialShape: "ellipse",
      radialPosition: { x: 30, y: 70 },
      colorStops: [
        { id: "1", color: "#ff0000", position: 0 },
        { id: "2", color: "#0000ff", position: 100 },
      ],
    };

    const css = generateGradientCSS(config);
    expect(css).toBe("radial-gradient(ellipse at 30% 70%, #ff0000 0%, #0000ff 100%)");
  });

  it("generates conic gradient CSS", () => {
    const config: GradientConfig = {
      type: "conic",
      angle: 45,
      radialShape: "circle",
      radialPosition: { x: 25, y: 75 },
      colorStops: [
        { id: "1", color: "#ff0000", position: 0 },
        { id: "2", color: "#00ff00", position: 50 },
        { id: "3", color: "#0000ff", position: 100 },
      ],
    };

    const css = generateGradientCSS(config);
    expect(css).toBe(
      "conic-gradient(from 45deg at 25% 75%, #ff0000 0%, #00ff00 50%, #0000ff 100%)"
    );
  });

  it("sorts color stops by position", () => {
    const config: GradientConfig = {
      type: "linear",
      angle: 90,
      radialShape: "circle",
      radialPosition: { x: 50, y: 50 },
      colorStops: [
        { id: "1", color: "#0000ff", position: 100 },
        { id: "2", color: "#ff0000", position: 0 },
        { id: "3", color: "#00ff00", position: 50 },
      ],
    };

    const css = generateGradientCSS(config);
    expect(css).toBe("linear-gradient(90deg, #ff0000 0%, #00ff00 50%, #0000ff 100%)");
  });

  it("handles multiple color stops", () => {
    const config: GradientConfig = {
      type: "linear",
      angle: 180,
      radialShape: "circle",
      radialPosition: { x: 50, y: 50 },
      colorStops: [
        { id: "1", color: "#ff0000", position: 0 },
        { id: "2", color: "#ff7f00", position: 25 },
        { id: "3", color: "#ffff00", position: 50 },
        { id: "4", color: "#00ff00", position: 75 },
        { id: "5", color: "#0000ff", position: 100 },
      ],
    };

    const css = generateGradientCSS(config);
    expect(css).toBe(
      "linear-gradient(180deg, #ff0000 0%, #ff7f00 25%, #ffff00 50%, #00ff00 75%, #0000ff 100%)"
    );
  });

  it("handles 0 degree angle", () => {
    const config: GradientConfig = {
      type: "linear",
      angle: 0,
      radialShape: "circle",
      radialPosition: { x: 50, y: 50 },
      colorStops: [
        { id: "1", color: "#ff0000", position: 0 },
        { id: "2", color: "#0000ff", position: 100 },
      ],
    };

    const css = generateGradientCSS(config);
    expect(css).toBe("linear-gradient(0deg, #ff0000 0%, #0000ff 100%)");
  });

  it("handles 360 degree angle", () => {
    const config: GradientConfig = {
      type: "linear",
      angle: 360,
      radialShape: "circle",
      radialPosition: { x: 50, y: 50 },
      colorStops: [
        { id: "1", color: "#ff0000", position: 0 },
        { id: "2", color: "#0000ff", position: 100 },
      ],
    };

    const css = generateGradientCSS(config);
    expect(css).toBe("linear-gradient(360deg, #ff0000 0%, #0000ff 100%)");
  });
});

describe("generateFullCSS", () => {
  it("wraps gradient in background property", () => {
    const config: GradientConfig = {
      type: "linear",
      angle: 90,
      radialShape: "circle",
      radialPosition: { x: 50, y: 50 },
      colorStops: [
        { id: "1", color: "#ff0000", position: 0 },
        { id: "2", color: "#0000ff", position: 100 },
      ],
    };

    const css = generateFullCSS(config);
    expect(css).toBe("background: linear-gradient(90deg, #ff0000 0%, #0000ff 100%);");
  });

  it("works with radial gradients", () => {
    const config: GradientConfig = {
      type: "radial",
      angle: 0,
      radialShape: "circle",
      radialPosition: { x: 50, y: 50 },
      colorStops: [
        { id: "1", color: "#ff0000", position: 0 },
        { id: "2", color: "#0000ff", position: 100 },
      ],
    };

    const css = generateFullCSS(config);
    expect(css).toBe("background: radial-gradient(circle at 50% 50%, #ff0000 0%, #0000ff 100%);");
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

describe("getDefaultConfig", () => {
  it("returns valid default config", () => {
    const config = getDefaultConfig();
    expect(config.type).toBe("linear");
    expect(config.angle).toBe(90);
    expect(config.colorStops.length).toBe(2);
  });

  it("has valid radial defaults", () => {
    const config = getDefaultConfig();
    expect(config.radialShape).toBe("circle");
    expect(config.radialPosition).toEqual({ x: 50, y: 50 });
  });

  it("has unique color stop IDs", () => {
    const config = getDefaultConfig();
    const ids = config.colorStops.map((stop) => stop.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has color stops at 0 and 100 positions", () => {
    const config = getDefaultConfig();
    const positions = config.colorStops.map((stop) => stop.position);
    expect(positions).toContain(0);
    expect(positions).toContain(100);
  });
});

describe("getRandomColor", () => {
  it("returns valid hex color", () => {
    const color = getRandomColor();
    expect(color).toMatch(/^#[A-F0-9]{6}$/);
  });

  it("returns different colors", () => {
    const colors = new Set<string>();
    for (let i = 0; i < 50; i++) {
      colors.add(getRandomColor());
    }
    expect(colors.size).toBeGreaterThan(1);
  });
});

describe("getRandomConfig", () => {
  it("returns valid config", () => {
    const config = getRandomConfig();
    expect(["linear", "radial", "conic"]).toContain(config.type);
    expect(config.angle).toBeGreaterThanOrEqual(0);
    expect(config.angle).toBeLessThan(360);
    expect(config.colorStops.length).toBeGreaterThanOrEqual(2);
  });

  it("has valid radial shape", () => {
    const config = getRandomConfig();
    expect(["circle", "ellipse"]).toContain(config.radialShape);
  });

  it("has valid radial position", () => {
    const config = getRandomConfig();
    expect(config.radialPosition.x).toBeGreaterThanOrEqual(0);
    expect(config.radialPosition.x).toBeLessThan(100);
    expect(config.radialPosition.y).toBeGreaterThanOrEqual(0);
    expect(config.radialPosition.y).toBeLessThan(100);
  });

  it("has unique color stop IDs", () => {
    const config = getRandomConfig();
    const ids = config.colorStops.map((stop) => stop.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("color stops have valid positions", () => {
    const config = getRandomConfig();
    for (const stop of config.colorStops) {
      expect(stop.position).toBeGreaterThanOrEqual(0);
      expect(stop.position).toBeLessThanOrEqual(100);
    }
  });
});
