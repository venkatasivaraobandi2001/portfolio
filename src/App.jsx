import { Routes, Route } from "react-router-dom";
import Portfolio from "./Portfolio";

export default function App() {
  return (
    <Routes>
      {/* Main Portfolio Page */}
      <Route path="/" element={<Portfolio />} />
    </Routes>
  );
}
