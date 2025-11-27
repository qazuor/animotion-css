import { act } from "react";
import { beforeEach, describe, expect, it } from "vitest";

import type { GradientConfig } from "@/types/gradient.types";
import { useHistoryStore } from "@/stores/historyStore";

const createMockConfig = (color: string): GradientConfig => ({
  type: "linear",
  angle: 90,
  radialShape: "circle",
  radialPosition: { x: 50, y: 50 },
  colorStops: [
    { id: "1", color, position: 0 },
    { id: "2", color: "#ffffff", position: 100 },
  ],
});

describe("historyStore", () => {
  beforeEach(() => {
    act(() => {
      useHistoryStore.getState().clearHistory();
    });
  });

  describe("initial state", () => {
    it("starts with empty history", () => {
      const { items } = useHistoryStore.getState();
      expect(items).toEqual([]);
    });
  });

  describe("addItem", () => {
    it("adds an item to history", () => {
      const config = createMockConfig("#ff0000");
      const css = "linear-gradient(90deg, #ff0000 0%, #ffffff 100%)";

      act(() => {
        useHistoryStore.getState().addItem(config, css);
      });

      const { items } = useHistoryStore.getState();
      expect(items.length).toBe(1);
      expect(items[0].config).toEqual(config);
      expect(items[0].css).toBe(css);
    });

    it("adds new items at the beginning", () => {
      const config1 = createMockConfig("#ff0000");
      const config2 = createMockConfig("#00ff00");
      const css1 = "linear-gradient(90deg, #ff0000 0%, #ffffff 100%)";
      const css2 = "linear-gradient(90deg, #00ff00 0%, #ffffff 100%)";

      act(() => {
        useHistoryStore.getState().addItem(config1, css1);
        useHistoryStore.getState().addItem(config2, css2);
      });

      const { items } = useHistoryStore.getState();
      expect(items[0].css).toBe(css2);
      expect(items[1].css).toBe(css1);
    });

    it("does not add duplicate CSS", () => {
      const config = createMockConfig("#ff0000");
      const css = "linear-gradient(90deg, #ff0000 0%, #ffffff 100%)";

      act(() => {
        useHistoryStore.getState().addItem(config, css);
        useHistoryStore.getState().addItem(config, css);
      });

      const { items } = useHistoryStore.getState();
      expect(items.length).toBe(1);
    });

    it("limits history to 20 items", () => {
      for (let i = 0; i < 25; i++) {
        const config = createMockConfig(`#${i.toString().padStart(6, "0")}`);
        const css = `linear-gradient(90deg, #${i.toString().padStart(6, "0")} 0%, #ffffff 100%)`;
        act(() => {
          useHistoryStore.getState().addItem(config, css);
        });
      }

      const { items } = useHistoryStore.getState();
      expect(items.length).toBe(20);
    });

    it("assigns unique IDs", () => {
      const config1 = createMockConfig("#ff0000");
      const config2 = createMockConfig("#00ff00");
      const css1 = "linear-gradient(90deg, #ff0000 0%, #ffffff 100%)";
      const css2 = "linear-gradient(90deg, #00ff00 0%, #ffffff 100%)";

      act(() => {
        useHistoryStore.getState().addItem(config1, css1);
        useHistoryStore.getState().addItem(config2, css2);
      });

      const { items } = useHistoryStore.getState();
      expect(items[0].id).not.toBe(items[1].id);
    });

    it("assigns createdAt timestamp", () => {
      const config = createMockConfig("#ff0000");
      const css = "linear-gradient(90deg, #ff0000 0%, #ffffff 100%)";
      const beforeTime = Date.now();

      act(() => {
        useHistoryStore.getState().addItem(config, css);
      });

      const afterTime = Date.now();
      const { items } = useHistoryStore.getState();
      expect(items[0].createdAt).toBeGreaterThanOrEqual(beforeTime);
      expect(items[0].createdAt).toBeLessThanOrEqual(afterTime);
    });
  });

  describe("removeItem", () => {
    it("removes an item by ID", () => {
      const config = createMockConfig("#ff0000");
      const css = "linear-gradient(90deg, #ff0000 0%, #ffffff 100%)";

      act(() => {
        useHistoryStore.getState().addItem(config, css);
      });

      const { items } = useHistoryStore.getState();
      const itemId = items[0].id;

      act(() => {
        useHistoryStore.getState().removeItem(itemId);
      });

      const { items: newItems } = useHistoryStore.getState();
      expect(newItems.length).toBe(0);
    });

    it("only removes the specified item", () => {
      const config1 = createMockConfig("#ff0000");
      const config2 = createMockConfig("#00ff00");
      const css1 = "linear-gradient(90deg, #ff0000 0%, #ffffff 100%)";
      const css2 = "linear-gradient(90deg, #00ff00 0%, #ffffff 100%)";

      act(() => {
        useHistoryStore.getState().addItem(config1, css1);
        useHistoryStore.getState().addItem(config2, css2);
      });

      const { items } = useHistoryStore.getState();
      const itemToRemove = items[0].id;

      act(() => {
        useHistoryStore.getState().removeItem(itemToRemove);
      });

      const { items: newItems } = useHistoryStore.getState();
      expect(newItems.length).toBe(1);
      expect(newItems[0].css).toBe(css1);
    });

    it("does nothing for non-existent ID", () => {
      const config = createMockConfig("#ff0000");
      const css = "linear-gradient(90deg, #ff0000 0%, #ffffff 100%)";

      act(() => {
        useHistoryStore.getState().addItem(config, css);
      });

      act(() => {
        useHistoryStore.getState().removeItem("non-existent-id");
      });

      const { items } = useHistoryStore.getState();
      expect(items.length).toBe(1);
    });
  });

  describe("clearHistory", () => {
    it("removes all items", () => {
      for (let i = 0; i < 5; i++) {
        const config = createMockConfig(`#${i.toString().padStart(6, "0")}`);
        const css = `linear-gradient(90deg, #${i.toString().padStart(6, "0")} 0%, #ffffff 100%)`;
        act(() => {
          useHistoryStore.getState().addItem(config, css);
        });
      }

      act(() => {
        useHistoryStore.getState().clearHistory();
      });

      const { items } = useHistoryStore.getState();
      expect(items.length).toBe(0);
    });

    it("works on empty history", () => {
      act(() => {
        useHistoryStore.getState().clearHistory();
      });

      const { items } = useHistoryStore.getState();
      expect(items.length).toBe(0);
    });
  });
});
