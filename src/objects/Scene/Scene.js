import Sky from "../../objects/Sky";
import Ocean from "../../objects/Ocean";
import Ship from "../../objects/Ship";
import Lights from "../../objects/Lights";
import Marker from "../../objects/Marker";

export default function Scene() {
  return (
    <>
      <Lights />
      
      <Sky />
      <Ocean />
      
      <Ship />
      <Marker />
    </>
  );
}
