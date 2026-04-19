import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./components/pages/inicio";
import Mes from "./components/pages/Mes";
import Error404 from "./components/pages/Error404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/mes/:mes" element={<Mes />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
