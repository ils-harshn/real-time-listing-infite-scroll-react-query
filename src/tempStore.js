import { create } from "zustand";

const useTempStore = create((set) => ({
  newlyAddList: [],
  add: (data) =>
    set((state) => {
      const existingIndex = state.newlyAddList.findIndex(
        (item) => item.id === data.id
      );
      const updatedList =
        existingIndex !== -1
          ? [
              ...state.newlyAddList.slice(0, existingIndex),
              ...state.newlyAddList.slice(existingIndex + 1),
            ]
          : [...state.newlyAddList];

      return {
        newlyAddList: [data, ...updatedList],
      };
    }),
  remove: (index) =>
    set((state) => ({
      newlyAddList: state.newlyAddList.filter((_, i) => i !== index),
    })),
  clear: () => set({ newlyAddList: [] }),
}));

export const useCacheAdd = create((set) => ({
  cache: (newValue) => set({ [newValue.key]: newValue.value }),
  clear: () =>
    set(
      (state) => ({
        cache: state.cache,
        clear: state.clear,
      }),
      true
    ),
}));

export default useTempStore;
