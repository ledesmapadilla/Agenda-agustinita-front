import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./components/pages/inicio";
import Mes from "./components/pages/Mes";
import DiaTareas from "./components/pages/DiaTareas";
import NuevaTarea from "./components/pages/NuevaTarea";
import Error404 from "./components/pages/Error404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/mes/:mes/:anio" element={<Mes />} />
        <Route path="/mes/:mes/:anio/:dia" element={<DiaTareas />} />
        <Route path="/mes/:mes/:anio/:dia/nueva" element={<NuevaTarea />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
