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
  indexSkip: null,
  setIndexSkip: (indexSkip) => set({ indexSkip }),
  animating: false,
  setAnimating: (animating) => set({ animating }),
  animationProgress: 0,
  setAnimationProgress: (animationProgress) => set({ animationProgress }),
  force: {
    x: 1,
    y: -1,
  },
  setForce: (force) => set({ force }),
}));

export default useStore;
