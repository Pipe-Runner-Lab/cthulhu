import { createContext, useEffect, useMemo, useRef } from "react";
import useStore from "../../store";

export const PyodideContext = createContext();

export function PyodideProvider({ children }) {
  const callbacks = useRef({});
  const setIsComputing = useStore((state) => state.setIsComputing);

  const pyodideWorker = useMemo(
    () => new Worker(new URL("../../workers/pyodide-bridge.worker.js", import.meta.url)),
    []
  );

  useEffect(() => {
    // pyodideWorker.onmessage = ({ data: { answer } }) => {
    //   console.log(answer);
    //   return () => worker.terminate();
    // }

    pyodideWorker.onmessage = (event) => {
      setIsComputing(false);
      const { id, ...data } = event.data;
      const onSuccess = callbacks.current[id];
      delete callbacks.current[id];
      onSuccess(data);
    };
  }, [pyodideWorker, setIsComputing]);

  const asyncRun = (() => {
    let id = 0; // identify a Promise
    return (script, context) => {
      // the id could be generated more carefully
      id = (id + 1) % Number.MAX_SAFE_INTEGER;
      return new Promise((onSuccess) => {
        setIsComputing(true);
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
