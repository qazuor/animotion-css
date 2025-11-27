import { act } from "react";
import { beforeEach, describe, expect, it } from "vitest";

import { useUIStore } from "@/stores/uiStore";

describe("uiStore", () => {
  beforeEach(() => {
    act(() => {
      useUIStore.getState().setActiveTab("creator");
    });
  });

  describe("initial state", () => {
    it("starts with creator tab active", () => {
      const { activeTab } = useUIStore.getState();
      expect(activeTab).toBe("creator");
    });
  });

  describe("setActiveTab", () => {
    it("changes to history tab", () => {
      act(() => {
        useUIStore.getState().setActiveTab("history");
      });

      const { activeTab } = useUIStore.getState();
      expect(activeTab).toBe("history");
    });

    it("changes to inspiration tab", () => {
      act(() => {
        useUIStore.getState().setActiveTab("inspiration");
      });

      const { activeTab } = useUIStore.getState();
      expect(activeTab).toBe("inspiration");
    });

    it("changes back to creator tab", () => {
      act(() => {
        useUIStore.getState().setActiveTab("history");
      });

      act(() => {
        useUIStore.getState().setActiveTab("creator");
      });

      const { activeTab } = useUIStore.getState();
      expect(activeTab).toBe("creator");
    });
  });
});
