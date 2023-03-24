import { createContext, useEffect, useState } from "react";

export const PyodideContext = createContext();

export function PyodideProvider({ children }) {
  const [pyodide, setPyodide] = useState(null);
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);

  const setupPyodide = async () => {
    const pyodide = await window.loadPyodide();
    await pyodide.loadPackage(["numpy"]);
    setPyodide(pyodide);
    setIsPyodideLoading(false);
  };

  const loadPyodide = () => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.22.1/full/pyodide.js";
    script.type = "text/javascript";
    script.async = true;
    script.onload = function () {
      setupPyodide();
    };
    script.onError = function () {
      console.error("Failed to load pyodide");
    };
    document.head.appendChild(script);
  };

  useEffect(() => {
    loadPyodide();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PyodideContext.Provider value={{ pyodide, isPyodideLoading }}>
      {children}
    </PyodideContext.Provider>
  );
}
