import { act } from "react";
import { beforeEach, describe, expect, it } from "vitest";

import type { AnimationConfig } from "@/types/animation.types";
import { useHistoryStore } from "@/stores/historyStore";

const createMockConfig = (name: string): AnimationConfig => ({
  name,
  duration: 1000,
  timingFunction: "ease",
  delay: 0,
  iterationCount: 1,
  direction: "normal",
  fillMode: "forwards",
  keyframes: [
    { id: "1", position: 0, properties: { opacity: 0 } },
    { id: "2", position: 100, properties: { opacity: 1 } },
  ],
});

describe("historyStore", () => {
  beforeEach(() => {
    act(() => {
      useHistoryStore.getState().clearAll();
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
      const config = createMockConfig("fadeIn");
      const css = "@keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }";

      act(() => {
        useHistoryStore.getState().addItem("fadeIn", config, css);
      });

      const { items } = useHistoryStore.getState();
      expect(items.length).toBe(1);
      expect(items[0].name).toBe("fadeIn");
      expect(items[0].config).toEqual(config);
      expect(items[0].css).toBe(css);
    });

    it("adds new items at the beginning", () => {
      const config1 = createMockConfig("anim1");
      const config2 = createMockConfig("anim2");
      const css1 = "css1";
      const css2 = "css2";

      act(() => {
        useHistoryStore.getState().addItem("anim1", config1, css1);
        useHistoryStore.getState().addItem("anim2", config2, css2);
      });

      const { items } = useHistoryStore.getState();
      expect(items[0].name).toBe("anim2");
      expect(items[1].name).toBe("anim1");
    });

    it("assigns unique IDs", () => {
      const config1 = createMockConfig("anim1");
      const config2 = createMockConfig("anim2");

      act(() => {
        useHistoryStore.getState().addItem("anim1", config1, "css1");
        useHistoryStore.getState().addItem("anim2", config2, "css2");
      });

      const { items } = useHistoryStore.getState();
      expect(items[0].id).not.toBe(items[1].id);
    });

    it("assigns createdAt timestamp", () => {
      const config = createMockConfig("test");
      const beforeTime = Date.now();

      act(() => {
        useHistoryStore.getState().addItem("test", config, "css");
      });

      const afterTime = Date.now();
      const { items } = useHistoryStore.getState();
      expect(items[0].createdAt).toBeGreaterThanOrEqual(beforeTime);
      expect(items[0].createdAt).toBeLessThanOrEqual(afterTime);
    });
  });

  describe("removeItem", () => {
    it("removes an item by ID", () => {
      const config = createMockConfig("test");

      act(() => {
        useHistoryStore.getState().addItem("test", config, "css");
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
      const config1 = createMockConfig("anim1");
      const config2 = createMockConfig("anim2");

      act(() => {
        useHistoryStore.getState().addItem("anim1", config1, "css1");
        useHistoryStore.getState().addItem("anim2", config2, "css2");
      });

      const { items } = useHistoryStore.getState();
      const itemToRemove = items[0].id;

      act(() => {
        useHistoryStore.getState().removeItem(itemToRemove);
      });

      const { items: newItems } = useHistoryStore.getState();
      expect(newItems.length).toBe(1);
      expect(newItems[0].name).toBe("anim1");
    });

    it("does nothing for non-existent ID", () => {
      const config = createMockConfig("test");

      act(() => {
        useHistoryStore.getState().addItem("test", config, "css");
      });

      act(() => {
        useHistoryStore.getState().removeItem("non-existent-id");
      });

      const { items } = useHistoryStore.getState();
      expect(items.length).toBe(1);
    });
  });

  describe("clearAll", () => {
    it("removes all items", () => {
      for (let i = 0; i < 5; i++) {
        const config = createMockConfig(`anim${i}`);
        act(() => {
          useHistoryStore.getState().addItem(`anim${i}`, config, `css${i}`);
        });
      }

      act(() => {
        useHistoryStore.getState().clearAll();
      });

      const { items } = useHistoryStore.getState();
      expect(items.length).toBe(0);
    });

    it("works on empty history", () => {
      act(() => {
        useHistoryStore.getState().clearAll();
      });

      const { items } = useHistoryStore.getState();
      expect(items.length).toBe(0);
    });
  });
});
