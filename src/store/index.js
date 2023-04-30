import { create } from "zustand";

const camType = ["perspective", "top-down", "pan"];

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
  animating: 'paused', // "playing" or "paused" or "stopped"
  setAnimating: (animating) => set({ animating }),
  animationProgress: 0,
  setAnimationProgress: (animationProgress) => set({ animationProgress }),
  cameraType: "pan", // "perspective" or "top-down" or "pan"
  toggleCameraType: () => {
    set((state) => ({
      cameraType:
        camType[(camType.indexOf(state.cameraType) + 1) % camType.length],
    }));
  },
  showGraph: false,
  toggleShowGraph: () => {
    set((state) => ({
      showGraph: !state.showGraph,
    }));
  },
  showPath: false,
  toggleShowPath: () => {
    set((state) => ({
      showPath: !state.showPath,
    }));
  },
  showPrediction: false,
  toggleShowPrediction: () => {
    set((state) => ({
      showPrediction: !state.showPrediction,
    }));
  },
}));

export default useStore;
