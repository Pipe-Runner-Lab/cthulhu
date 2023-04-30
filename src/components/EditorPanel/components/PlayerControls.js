import React from "react";
import { Button } from "./Button";
import {
  FaPlay as PlayIcon,
  FaPause as PauseIcon,
  FaStop as ResetIcon,
} from "react-icons/fa";
import useStore from "../../../store";

export function PlayerControls({ isDisabled }) {
  const animating = useStore((state) => state.animating);
  const setAnimating = useStore((state) => state.setAnimating);
  const animationProgress = useStore((state) => state.animationProgress);

  return (
    <div className="flex items-center justify-start space-x-2">
      <Button
        disabled={isDisabled}
        onClick={() => {
          setAnimating(animating === "playing" ? "paused" : "playing");
        }}
      >
        {animating === 'playing' ? (
          <PauseIcon size={24} color={isDisabled ? "grey" : "black"} />
        ) : (
          <PlayIcon size={24} color={isDisabled ? "grey" : "black"} />
        )}
      </Button>
      <Button
        disabled={isDisabled}
        onClick={() => {
          setAnimating('stopped');
        }}
      >
        <ResetIcon size={24} color={isDisabled ? "grey" : "black"} />
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
