import { Leva } from "leva";
import Home from "./screens/Home";
import { PyodideProvider } from "./providers/Pyodide";

function App() {
  return (
    <PyodideProvider>
      <div className="w-full h-screen">
        <Home />
        <div className="absolute overflow-auto top-2 left-2 max-h-96">
          <Leva collapsed fill />
        </div>
      </div>
    </PyodideProvider>
  );
}

export default App;
