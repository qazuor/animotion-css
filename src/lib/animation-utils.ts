import type { AnimatableProperties, AnimationConfig, Keyframe } from "@/types/animation.types";

function propertiesToCSS(properties: AnimatableProperties): string {
  const rules: string[] = [];
  const transforms: string[] = [];

  // Transform properties
  if (properties.translateX) {
    transforms.push(`translateX(${properties.translateX})`);
  }
  if (properties.translateY) {
    transforms.push(`translateY(${properties.translateY})`);
  }
  if (properties.scale !== undefined) {
    transforms.push(`scale(${properties.scale})`);
  }
  if (properties.rotate) {
    transforms.push(`rotate(${properties.rotate})`);
  }
  if (properties.skewX) {
    transforms.push(`skewX(${properties.skewX})`);
  }
  if (properties.skewY) {
    transforms.push(`skewY(${properties.skewY})`);
  }

  if (transforms.length > 0) {
    rules.push(`transform: ${transforms.join(" ")}`);
  }

  // Visual properties
  if (properties.opacity !== undefined) {
    rules.push(`opacity: ${properties.opacity}`);
  }
  if (properties.backgroundColor) {
    rules.push(`background-color: ${properties.backgroundColor}`);
  }
  if (properties.color) {
    rules.push(`color: ${properties.color}`);
  }
  if (properties.borderColor) {
    rules.push(`border-color: ${properties.borderColor}`);
  }
  if (properties.borderRadius) {
    rules.push(`border-radius: ${properties.borderRadius}`);
  }
  if (properties.boxShadow) {
    rules.push(`box-shadow: ${properties.boxShadow}`);
  }

  // Custom CSS
  if (properties.custom) {
    rules.push(properties.custom);
  }

  return rules.join("; ");
}

export function generateKeyframesCSS(name: string, keyframes: Keyframe[]): string {
  const sortedKeyframes = [...keyframes].sort((a, b) => a.position - b.position);

  const keyframeRules = sortedKeyframes
    .map((kf) => {
      const css = propertiesToCSS(kf.properties);
      return `  ${kf.position}% { ${css}; }`;
    })
    .join("\n");

  return `@keyframes ${name} {\n${keyframeRules}\n}`;
}

export function generateAnimationProperty(config: AnimationConfig): string {
  const iterationCount =
    config.iterationCount === "infinite" ? "infinite" : String(config.iterationCount);

  return `animation: ${config.name} ${config.duration}ms ${config.timingFunction} ${config.delay}ms ${iterationCount} ${config.direction} ${config.fillMode}`;
}

export function generateCSS(config: AnimationConfig): string {
  const keyframesCSS = generateKeyframesCSS(config.name, config.keyframes);
  const animationProperty = generateAnimationProperty(config);

  return `${keyframesCSS}

.animated-element {
  ${animationProperty};
}`;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function createDefaultKeyframe(position: number): Keyframe {
  return {
    id: generateId(),
    position,
    properties: {},
  };
}

export function getDefaultConfig(): AnimationConfig {
  return {
    name: "myAnimation",
    duration: 1000,
    timingFunction: "ease",
    delay: 0,
    iterationCount: "infinite",
    direction: "alternate",
    fillMode: "none",
    keyframes: [
      {
        id: generateId(),
        position: 0,
        properties: {
          scale: 1,
          opacity: 1,
        },
      },
      {
        id: generateId(),
        position: 100,
        properties: {
          scale: 1.2,
          opacity: 0.7,
        },
      },
    ],
  };
}
