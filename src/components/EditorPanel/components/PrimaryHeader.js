import React from "react";
import { VscChromeClose as CloseIcon } from "react-icons/vsc";
import useStore from "../../../store";
import {
  IoTelescopeOutline as TopDownIcon,
  IoExpandOutline as PanIcon,
  IoVideocamOutline as PerspectiveIcon,
} from "react-icons/io5";
import { GiMeshNetwork as PredictionIcon } from "react-icons/gi";
import { GoGraph as GraphIcon } from "react-icons/go";
import { GiPathDistance as PathIcon } from "react-icons/gi";
import { Button } from "./Button";

function PrimaryHeader() {
  const setIsMenuOpen = useStore((state) => state.setIsMenuOpen);
  const cameraType = useStore((state) => state.cameraType);
  const toggleCameraType = useStore((state) => state.toggleCameraType);
  const showGraph = useStore((state) => state.showGraph);
  const toggleShowGraph = useStore((state) => state.toggleShowGraph);
  const showPath = useStore((state) => state.showPath);
  const toggleShowPath = useStore((state) => state.toggleShowPath);
  const showPrediction = useStore((state) => state.showPrediction);
  const toggleShowPrediction = useStore((state) => state.toggleShowPrediction);

  return (
    <div className="flex items-center justify-between w-full pb-2">
      <button
        className="flex items-center justify-center w-10 h-10 bg-red-300 rounded-md shadow-sm"
        onClick={() => setIsMenuOpen(false)}
      >
        <CloseIcon size={26} />
      </button>

      <div className="flex space-x-1">
        <Button className="w-10 h-10" onClick={toggleCameraType}>
          {cameraType === "pan" && <PanIcon size={26} color="black" />}
          {cameraType === "top-down" && <TopDownIcon size={26} color="black" />}
          {cameraType === "perspective" && (
            <PerspectiveIcon size={26} color="black" />
          )}
        </Button>
        <Button className="w-10 h-10" onClick={toggleShowGraph}>
          <GraphIcon size={26} color={showGraph ? "black" : "grey"} />
        </Button>
        <Button className="w-10 h-10" onClick={toggleShowPath}>
          <PathIcon size={26} color={showPath ? "black" : "grey"} />
        </Button>
        <Button className="w-10 h-10" onClick={toggleShowPrediction}>
          <PredictionIcon size={26} color={showPrediction ? "black" : "grey"} />
        </Button>
      </div>
    </div>
  );
}

export default PrimaryHeader;
