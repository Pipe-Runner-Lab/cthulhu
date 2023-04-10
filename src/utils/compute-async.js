import { extractScriptText } from "./script-text";
import script from "../python/simulator.py";

export const computeSimulation = async (
  pyodide,
  input,
  onComputationStart,
  onComputationEnd
) => {
  onComputationStart();

  window.simulator_input = { ...input };

  const code = await extractScriptText(script);
  await pyodide.runPythonAsync(code);

  onComputationEnd({
    state_time: pyodide.globals.get("state_time").toJs(),
    index_skip: pyodide.globals.get("index_skip"),
  });
};
