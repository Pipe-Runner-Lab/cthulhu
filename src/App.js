import Home from "./screens/Home";
import { PyodideProvider } from "./providers/Pyodide";

function App() {
  return (
    <PyodideProvider>
      <div className="w-full h-screen">
        <Home />
      </div>
    </PyodideProvider>
  );
}

export default App;
