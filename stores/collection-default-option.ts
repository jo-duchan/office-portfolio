import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface Options {
  aline: string;
  column: string;
  color: string;
  fill: string;
  fontSize: string;
  gapSize: string;
  margin: string;
}

export interface DefaultOptionState {
  options: Options;
}
export interface DefaultOptionAction {
  updateOption: (options: Options) => void;
}

const defaultState: DefaultOptionState = {
  options: {
    aline: "aline-left",
    column: "column-double",
    color: "000000",
    fill: "FFFFFF",
    fontSize: "font-size-m",
    gapSize: "gap-m",
    margin: "padding-m",
  },
};

const useDefaultOptionStore = create<
  DefaultOptionState & DefaultOptionAction
>()(
  immer((set) => ({
    ...defaultState,
    updateOption: (options: Options) =>
      set((state) => {
        state.options = options;
      }),
  }))
);

export default useDefaultOptionStore;
