import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type MediaQuerySize = "small" | "large";

export interface ThemeState {
  theme: {
    mediaQuery: MediaQuerySize;
  };
}
export interface ThemeAction {
  updateMediaQuery: (size: MediaQuerySize) => void;
}

const defaultState: ThemeState = {
  theme: {
    mediaQuery: "large",
  },
};

const useThemeStore = create<ThemeState & ThemeAction>()(
  immer((set) => ({
    ...defaultState,
    updateMediaQuery: (size: MediaQuerySize) =>
      set((state) => {
        state.theme.mediaQuery = size;
      }),
  }))
);

export default useThemeStore;
