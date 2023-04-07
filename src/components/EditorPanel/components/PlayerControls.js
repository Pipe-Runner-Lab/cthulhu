import React from "react";
import { Button } from "./Button";
import {
  FaPlay as PlayIcon,
  FaPause as PauseIcon,
  FaStop as ResetIcon,
} from "react-icons/fa";
import useStore from "../../../store";

export function PlayerControls() {
  const animating = useStore((state) => state.animating);
  const setAnimating = useStore((state) => state.setAnimating);
  const animationProgress = useStore((state) => state.animationProgress);

  return (
    <div className="flex items-center justify-start space-x-2">
      <Button
        onClick={() => {
          setAnimating(!animating);
        }}
      >
        {animating ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
      </Button>
      <Button
        onClick={() => {
          setAnimating(false);
        }}
      >
        <ResetIcon size={24} />
      </Button>
      <div className="w-full bg-blue-300 rounded-full h-1.5 mt-1 mb-2">
        <div
          className="bg-blue-500 h-1.5 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${animationProgress}%` }}
        ></div>
      </div>
    </div>
  );
}
