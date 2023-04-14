import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { computeSimulation } from "../../utils/compute-async";
import useStore from "../../store";

export const PyodideContext = createContext();

export function PyodideProvider({ children }) {
  // const [pyodide, setPyodide] = useState(null);
  // const [isPyodideLoading, setIsPyodideLoading] = useState(true);
  // const force = useStore((state) => state.force);
  // const setSimulationData = useStore((state) => state.setSimulationData);
  // const setIndexSkip = useStore((state) => state.setIndexSkip);
  const callbacks = useRef({});

  // const setupPyodide = async () => {
  //   const pyodide = await window.loadPyodide();
  //   await pyodide.loadPackage(["numpy"]);
  //   setPyodide(pyodide);

  //   // Run the simulation once to initialize the state (pre-compute)
  //   await computeSimulation(
  //     pyodide,
  //     {
  //       force,
  //     },
  //     () => {},
  //     ({ state_time, index_skip }) => {
  //       setIndexSkip(index_skip);
  //       setSimulationData(state_time);
  //     }
  //   );

  //   setIsPyodideLoading(false);
  // };

  // useEffect(() => {
  //   const callbacks = {};

  //   const pyodideWorker = new Worker("./dist/webworker.js");
  // }, []);

  const pyodideWorker = useMemo(
    () => new Worker(new URL("./test.worker.js", import.meta.url)),
    []
  );

  useEffect(() => {
    // pyodideWorker.onmessage = ({ data: { answer } }) => {
    //   console.log(answer);
    //   return () => worker.terminate();
    // }

    pyodideWorker.onmessage = (event) => {
      const { id, ...data } = event.data;
      const onSuccess = callbacks.current[id];
      delete callbacks.current[id];
      onSuccess(data);
    };
  }, [pyodideWorker]);

  const asyncRun = (() => {
    let id = 0; // identify a Promise
    return (script, context) => {
      // the id could be generated more carefully
      id = (id + 1) % Number.MAX_SAFE_INTEGER;
      return new Promise((onSuccess) => {
        callbacks.current[id] = onSuccess;
        pyodideWorker.postMessage({
          ...context,
          python: script,
          id,
        });
      });
    };
  })();

  return (
    <PyodideContext.Provider value={{ asyncRun }}>
      {children}
    </PyodideContext.Provider>
  );
}
