import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface DeleteImagesState {
  imageKeys: string[];
}
export interface DeleteImagesAction {
  setImageKeys: (key: string) => void;
  resetKeys: () => void;
}

const defaultState: DeleteImagesState = {
  imageKeys: [],
};

const useDeleteImagesStore = create<DeleteImagesState & DeleteImagesAction>()(
  immer((set) => ({
    ...defaultState,
    setImageKeys: (key: string) =>
      set((state) => {
        state.imageKeys.push(key);
      }),
    resetKeys: () => set(defaultState),
  }))
);

export default useDeleteImagesStore;
