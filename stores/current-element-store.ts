import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type MediaQuerySize = "small" | "large";

export interface CurrentIdState {
  currentId: string | undefined;
}
export interface CurrentIdAction {
  setCurrentId: (id: string) => void;
}

const defaultState: CurrentIdState = {
  currentId: undefined,
};

const useCurrentIdStore = create<CurrentIdState & CurrentIdAction>()(
  immer((set) => ({
    ...defaultState,
    setCurrentId: (id: string) =>
      set((state) => {
        state.currentId = id;
      }),
  }))
);

export default useCurrentIdStore;
