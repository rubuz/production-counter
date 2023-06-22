import "./App.css";
import Counter from "./counter";
import { Route, Routes } from "react-router-dom";
import sonic from "./assets/sonic.png";
import van from "./assets/van.png";
import motorhome from "./assets/motorhome.png";
import caravan from "./assets/caravan.png";

function App() {
  return (
    <Routes>
      <Route path="/62100" element={<Counter line={62100} logo={caravan} />} />
      <Route path="/62200" element={<Counter line={62200} logo={caravan} />} />
      <Route
        path="/63000"
        element={<Counter line={63000} logo={motorhome} />}
      />
      <Route path="/63200" element={<Counter line={63200} logo={sonic} />} />
      <Route path="/65200" element={<Counter line={65200} logo={van} />} />
      <Route path="/65300" element={<Counter line={65300} logo={van} />} />
    </Routes>
  );
}

export default App;
