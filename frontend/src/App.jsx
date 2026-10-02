import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Prediction from "./pages/Prediction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prediction" element={<Prediction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;