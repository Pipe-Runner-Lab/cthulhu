import { create } from "zustand";

const useStore = create((set) => ({
  isMenuOpen: false,
  setIsMenuOpen: (isOpen) =>
    isOpen
      ? set({ isMenuOpen: isOpen })
      : set((_) => ({
          isMenuOpen: isOpen,
        })),
}));

export default useStore;
