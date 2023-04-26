import { create } from "zustand";

const useStore = create((set) => ({
  isMenuOpen: false,
  setIsMenuOpen: (isOpen) =>
    isOpen
      ? set({ isMenuOpen: isOpen })
      : set((_) => ({
          isMenuOpen: isOpen,
        })),
  isComputing: false,
  setIsComputing: (isComputing) => set({ isComputing }),
  simulationData: null,
  setSimulationData: (simulationData) => set({ simulationData }),
  animating: false,
  setAnimating: (animating) => set({ animating }),
  animationProgress: 0,
  setAnimationProgress: (animationProgress) => set({ animationProgress }),
}));

export default useStore;
