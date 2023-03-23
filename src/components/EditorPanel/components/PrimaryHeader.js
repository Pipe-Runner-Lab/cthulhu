import React from 'react';
import { VscChromeClose as CloseIcon } from 'react-icons/vsc';
import useStore from '../../../store';

function PrimaryHeader() {
  const setIsMenuOpen = useStore((state) => state.setIsMenuOpen);

  return (
    <div className="flex justify-between w-full">
      <button
        className="flex items-center justify-center w-10 h-10 bg-red-300 rounded-md shadow-lg"
        onClick={() => setIsMenuOpen(false)}>
        <CloseIcon size={26} />
      </button>
    </div>
  );
}

export default PrimaryHeader;