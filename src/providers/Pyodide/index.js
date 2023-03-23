import { createContext, useEffect, useState } from "react";

export const PyodideContext = createContext();

export function PyodideProvider({ children }) {
  const [pyodide, setPyodide] = useState(null);
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);

  const loadPyodide = async () => {
    const pyodide = await window.loadPyodide();
    await pyodide.loadPackage(["numpy"]);
    return pyodide;
  };

  useEffect(() => {
    const loadAndSetPyodide = async () => {
      const pyodide = await loadPyodide();
      setPyodide(pyodide);
      setIsPyodideLoading(false);
    };

    loadAndSetPyodide();
  }, []);

  return (
    <PyodideContext.Provider value={{ pyodide, isPyodideLoading }}>
      {children}
    </PyodideContext.Provider>
  );
}
