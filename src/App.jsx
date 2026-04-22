import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AIFlow from "./pages/AIFlow";
import ManualFlow from "./pages/ManualFlow";
import TemplateSelect from "./pages/TemplateSelect";
import ModeSelection from "./pages/ModeSelection";
import Generating from "./pages/Generating";
import Result from "./pages/Result";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/template-select" element={<TemplateSelect />} />
      <Route path="/mode-select" element={<ModeSelection />} />
      <Route path="/ai" element={<AIFlow />} />
      <Route path="/manual" element={<ManualFlow />} />
      <Route path="/generating" element={<Generating />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}

export default App;
