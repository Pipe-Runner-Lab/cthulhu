import { createContext, useEffect, useState } from "react";

export const PyodideContext = createContext();

export function PyodideProvider({ children }) {
  const [pyodide, setPyodide] = useState(null);
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);

  const loadPyodide = async () => {
    const pyodide = await window.loadPyodide();
    return pyodide;
  };

  useEffect(() => {
    loadPyodide().then((pyodide) => {
      setPyodide(pyodide);
      setIsPyodideLoading(false);
    });
  }, []);

  return (
    <PyodideContext.Provider value={{ pyodide, isPyodideLoading }}>
      {children}
    </PyodideContext.Provider>
  );
}
