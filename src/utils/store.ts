import { create } from 'zustand';

type Store = {
  isGridOverlayVisible: boolean;
  toggleGridOverlayVisibility: () => void;
  isBizCardVisible: boolean;
  toggleBizCard: () => void;
};

const useStore = create<Store>((set) => ({
  isGridOverlayVisible: false,
  toggleGridOverlayVisibility: () =>
    set((state) => ({ isGridOverlayVisible: !state.isGridOverlayVisible })),
  isBizCardVisible: false,
  toggleBizCard: () =>
    set((state) => ({ isBizCardVisible: !state.isBizCardVisible })),
}));

export default useStore;
