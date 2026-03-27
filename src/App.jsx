import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AIFlow from "./pages/AIFlow";
import ManualFlow from "./pages/ManualFlow";
import TemplateSelect from "./pages/TemplateSelect";
import Generating from "./pages/Generating";
import Result from "./pages/Result";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ai" element={<AIFlow />} />
      <Route path="/manual" element={<ManualFlow />} />
      <Route path="/template-select" element={<TemplateSelect />} />
      <Route path="/generating" element={<Generating />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}

export default App;
