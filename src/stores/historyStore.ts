import { create } from "zustand";
import { persist } from "zustand/middleware";

import { siteConfig } from "@/config/site.config";
import { generateId } from "@/lib/animation-utils";
import type { AnimationConfig, HistoryItem } from "@/types/animation.types";

interface HistoryStore {
  items: HistoryItem[];
  addItem: (name: string, config: AnimationConfig, css: string) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (name, config, css) =>
        set((state) => ({
          items: [
            {
              id: generateId(),
              name,
              config,
              css,
              createdAt: Date.now(),
            },
            ...state.items,
          ],
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      clearAll: () => set({ items: [] }),
    }),
    {
      name: siteConfig.storage.history,
    }
  )
);
