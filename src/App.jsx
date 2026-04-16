import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./components/pages/inicio";
import LePa from "./components/pages/LePa";
import LaMartina from "./components/pages/LaMartina";
import Casa from "./components/pages/Casa";
import Error404 from "./components/pages/Error404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/lepa" element={<LePa />} />
        <Route path="/la-martina" element={<LaMartina />} />
        <Route path="/casa" element={<Casa />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
